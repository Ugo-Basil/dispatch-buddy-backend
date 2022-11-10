import Joi from "joi";
import jwt from "jsonwebtoken";

export const customerSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    phoneNumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    avatar: Joi.string(),
    isVerified: Joi.boolean(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))

      .required()

      .label("Confirm password")

      .messages({ "any.only": "{{#label}} does not match" }),
  })
  .with("password", "confirmPassword");

export const riderSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    phoneNumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    city: Joi.string().required(),
    bikeDocument: Joi.string().required(),
    validId: Joi.string().required(),
    avatar: Joi.string(),
    isVerified: Joi.boolean(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))

      .required()

      .label("Confirm password")

      .messages({ "any.only": "{{#label}} does not match" }),
  })
  .with("password", "confirmPassword");

export const generateToken = (user: Record<string, unknown>): unknown => {
  const token = process.env.JWT_SECRET as string;
  return jwt.sign(user, token, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
