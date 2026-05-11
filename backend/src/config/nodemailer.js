const nodemailer = require('nodemailer');

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (options) => {
  try {
    // Only attempt to send if email credentials are provided
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
      console.log('Skipping email send. Configure EMAIL_USER and EMAIL_PASS in .env');
      return true;
    }
    
    const info = await transporter.sendMail({
      from: `Annapurna Kitchen <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    });
    
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Email error: ${error.message}`);
    return false;
  }
};

module.exports = sendEmail;
