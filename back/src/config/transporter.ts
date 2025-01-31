import nodemailer from "nodemailer";
import { SERVICE_MAIL, PASS_MAIL, USER_MAIL } from "./envs";

const transporter = nodemailer.createTransport({
    service: SERVICE_MAIL,
    auth: {
      user: USER_MAIL,
      pass: PASS_MAIL,
    },
  });

  export default transporter;