import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  // auth: {
  //   user: process.env.EMAIL_USER || 'rathnamajay3@gmail.com',
  //   pass: process.env.EMAIL_PASS || 'eyvh mhrr ktgo yknh'
  // }
  auth: {
    user: process.env.EMAIL_USER || 'karthikraj825@gmail.com',
    pass: process.env.EMAIL_PASS || 'acmp gbmg zimj kknk'
  }
});



