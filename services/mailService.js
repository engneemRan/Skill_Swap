require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// إرسال إيميل ترحيبي بعد التسجيل
function sendRegistrationEmail(toEmail, username) {
  const htmlContent = `
    <h2>Welcome to Skill Swap, ${username}!</h2>
    <p>We're glad to have you join our community.</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: '🎉 Welcome to Skill Swap',
    html: htmlContent
  };

  return transporter.sendMail(mailOptions);
}

// إرسال من نموذج التواصل
function sendContactMessage(sender, type, message) {
  const html = `
    <h3>📨 New Contact Message - ${type}</h3>
    <p><strong>From:</strong> ${sender}</p>
    <p>${message}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Contact Form: ${type}`,
    html
  };

  return transporter.sendMail(mailOptions);
}

// إرسال من نموذج التستيموني
function sendTestimonial(name, email, message) {
  const html = `
    <h3>🌟 New Testimonial Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `New Testimonial from ${name}`,
    html
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendRegistrationEmail,
  sendContactMessage,
  sendTestimonial
};
