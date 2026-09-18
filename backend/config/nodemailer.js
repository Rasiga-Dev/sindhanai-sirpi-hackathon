import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  
});

console.log('HOST:', process.env.BREVO_SMTP_HOST);
console.log('PORT:', process.env.BREVO_SMTP_PORT);
console.log('USER:', process.env.BREVO_SMTP_USER);
console.log('PASS exists:', !!process.env.BREVO_SMTP_PASS);

transporter.verify((error, success) => {
  if (error) {
    console.error('Brevo SMTP connection failed:', error);
  } else {
    console.log('Brevo SMTP connection successful ✅');
  }
});

export default transporter;