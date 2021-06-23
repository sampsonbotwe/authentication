import { json, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
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
      { email },
      process.env.ACTIVATION_TOKEN_SECRET || "",
      {
        expiresIn: "1h",
      }
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
  try {
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

    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.ACCESS_TOKEN_SECRET as string
    );

    res.status(202).json({ accessToken });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "A login error occured. Please try again." });
  }
};

export const activate = async (req: Request, res: Response) => {
  try {
    const { activationToken } = req.body;

    jwt.verify(
      activationToken,
      process.env.ACTIVATION_TOKEN_SECRET as string,
      async (err: any, result: any) => {
        if (err) return res.status(403).json(err);
        const { email } = result as IUser;

        const user = await User.findOne({ email });

        if (user === null)
          return res
            .status(401)
            .json({ message: "The activation key is not valid." });

        if (user.isActive)
          return res.status(401).json({
            message:
              "This account has already been activated. Proceed to login.",
          });

        user.isActive = true;
        await user.save();

        res
          .status(200)
          .json({ message: "Activation is complete. Proceed to login." });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An activation error occured. Please try again." });
  }
};
