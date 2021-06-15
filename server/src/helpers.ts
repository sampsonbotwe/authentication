import nodemailer from "nodemailer";
import { ISendMailParams } from "./interfaces";

export const sendMail = async (
  params: ISendMailParams
): Promise<string | false> => {
  const { user, pass } = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: params.sender,
    to: params.recipients.join(","),
    subject: params.subject,
    html: params.body,
  });

  return nodemailer.getTestMessageUrl(info);
};
