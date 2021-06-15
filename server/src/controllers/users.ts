import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendMail } from "../helpers";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser !== null)
      return res
        .status(400)
        .json({ message: "Email address has already been taken." });

    const activationToken = jwt.sign(
      { name, email },
      process.env.ACTIVATION_KEY || "",
      { expiresIn: "1h" }
    );

    const body =
      `<a href='${process.env.ACTIVATION_EMAIL_URL}/${activationToken}' target='_blank'>` +
      `${process.env.ACTIVATION_EMAIL_URL}/${activationToken}</a>`;

    const response = await sendMail({
      sender: process.env.ACTIVATION_EMAIL_SENDER as string,
      subject: process.env.ACTIVATION_EMAIL_SUBJECT as string,
      recipients: new Array(email),
      body: body,
    });

    if (response === false)
      return res
        .status(400)
        .json({ message: "A signup error occured. Please try again." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(200).send({ activationUrl: response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "A signup error occured. Pleas try again." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null)
    return res.status(401).json({ message: "Invalid credentials." });

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(401).json({ message: "Invalid credentials." });

  if (!user.isActive)
    return res.status(401).json({
      message:
        "User is not yet active. A confirmation email has been sent to you.",
    });

  const accessToken = jwt.sign(user, process.env.PRIVATE_KEY as string, {
    expiresIn: "1h",
  });

  res.status(202).json({ accessToken });
};

export const activate = (req: Request, res: Response) => {
  res.status(200).json("Activate");
};
