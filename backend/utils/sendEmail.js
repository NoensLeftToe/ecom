const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

//   console.log('SMTP_SERVICE:', process.env.SMTP_SERVICE);
//   console.log('SMTP_MAIL:', process.env.SMTP_MAIL);
//   console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD);
//   console.log('SMTP_HOST:', process.env.SMTP_HOST);
// console.log('SMTP_PORT:', process.env.SMTP_PORT);


  try {
    // Create a transporter with the SMTP configuration
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    // Handle errors, log them, and rethrow if necessary
    console.error("Error sending email:", error.message);

    // Return a custom error or throw a new one
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
