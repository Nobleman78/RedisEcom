import transporter from "./transporter";

export async function sendEmail(options) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
