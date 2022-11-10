import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RiderInstance } from "../models/riderUser";
import {
  riderSchema,
  options,
  loginSchema,
  generateToken,
} from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMails from "../email/sendEmails";

const ridertoken = process.env.JWT_SECRET || "secret";

export async function createRider(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    let iD = uuidv4();
    const validateResult = riderSchema.validate(req.body, options);

    if (validateResult.error) {
      return res.status(400).json({
        error: validateResult.error.details[0].message,
      });
    }

    const duplicateEmail = await RiderInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicateEmail) {
      return res.status(409).json({
        error: "Email already exists, use another email",
      });
    }

    const duplicatePhoneNumber = await RiderInstance.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });

    if (duplicatePhoneNumber) {
      return res.status(409).json({
        error: "Phone number already exists, use another phone number",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);

    const rider = await RiderInstance.create({
      id: iD,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phoneNumber: req.body.phoneNumber,
      city: req.body.city,
      bikeDocument: req.body.bikeDocument,
      validId: req.body.validId,
      avatar: "",
      isVerified: false,
    });

    const token = jwt.sign({ id: iD }, ridertoken, { expiresIn: "30mins" });

    sendMails.verifyRiderEmail(rider.email, token);

    return res.status(201).json({
      message: "Successfully created a user",
      record: {
        id: rider.id,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error, try again later",
    });
  }
}

export async function verifyRider(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { token } = req.params;

    const verified = jwt.verify(token, ridertoken);

    const { id } = verified as { [key: string]: string };

    const record = await RiderInstance.findOne({
      where: {
        id: id,
      },
    });

    console.log("updated");
    await record?.update({
      isVerified: true,
    });

    console.log("updated true");

    return res.status(302).redirect(`${process.env.APP_URL}/user/login`);
  } catch (error) {
    return res.status(500).json({
      error: "Server error try again later",
    });
  }
}

export async function login(req: Request | any, res: Response) {
  try {
    const { email, password } = req.body;
    const validInput = await loginSchema.validate(req.body, options);

    if (validInput.error) {
      return res
        .status(401)
        .json({ error: validInput.error.details[0].message });
    }
    const validEmail: any = await RiderInstance.findOne({ where: { email } });

    if (!validEmail) {
      return res.status(400).json({ message: "User not found!" });
    }
    const validPassword = await bcrypt.compare(password, validEmail.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Wrong uer input!" });
    }
    const { id } = validEmail;
    const token = jwt.sign({ id }, ridertoken, { expiresIn: "30mins" });

    if (validEmail.isVerified) {
      return res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "you have successfully login", validEmail, token });
    }
  } catch (error) {}
}
