import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../models/pickupUser";
import {
  customerSchema,
  generateToken,
  loginSchema,
  options,
} from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmails from "../email/sendEmails";

const usertoken = process.env.JWT_SECRET || 'secret';

export async function createCustomer(req: Request, res: Response): Promise<unknown> {
  try {
    let iD = uuidv4();
    const validateResult = customerSchema.validate(req.body, options);

    if (validateResult.error) {
      return res.status(400).json({
        error: validateResult.error.details[0].message
      });
    }

    const duplicateEmail = await UserInstance.findOne({
      where: { email: req.body.email }
    });
    if (duplicateEmail) {
      return res.status(409).json({
        error: 'Email already exists, use another email'
      });
    }

    const duplicatePhoneNumber = await UserInstance.findOne({
      where: {
        phone: req.body.phone
      }
    });

    if (duplicatePhoneNumber) {
      return res.status(409).json({
        error: 'Phone number already exists, use another phone number'
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);

    const sender = await UserInstance.create({
      id: iD,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phoneNumber,
      avatar: '',
      isVerified: false
    });

    const token = jwt.sign({ id: iD }, usertoken, { expiresIn: '30mins' });

    sendEmails.verifyUserEmail(sender.email, token);

    return res.status(201).json({
      message: 'Successfully created a user',
      record: {
        id: sender.id,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later'
    });
  }
}

export async function verifyCustomer(req: Request, res: Response): Promise<unknown> {
  try {
    const { token } = req.params;

    const verified = jwt.verify(token, usertoken);

    const { id } = verified as { [key: string]: string };

    const record = await UserInstance.findOne({
      where: {
        id: id
      }
    });

    console.log('updated');
    await record?.update({
      isVerified: true
    });
    console.log('updated true');
    return res.status(302).redirect(`${process.env.APP_URL}/user/login`);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later'
    });
  }
}

//Login

export async function loginUser(req: Request | any, res: Response) {
  try {
    const { email, password } = req.body;
    const validInput = await loginSchema.validate(req.body, options);

    if (validInput.error) {
      return res.status(401).json({ error: validInput.error.details[0].message });
    }
    const validEmail: any = await UserInstance.findOne({ where: { email } });

    if (!validEmail) {
      return res.status(400).json({ message: 'User not found!' });
    }
    const validPassword = await bcrypt.compare(password, validEmail.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Wrong uer input!' });
    }
    const { id } = validEmail;

    const token = jwt.sign({ id }, usertoken, { expiresIn: '30mins' });

    if (validEmail.isVerified) {
      return res
        .cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
        .status(200)
        .json({ message: 'you have successfully login', validEmail, token });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error try again later' });
  }
}