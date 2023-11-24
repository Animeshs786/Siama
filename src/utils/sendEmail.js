const nodemailer = require('nodemailer');

const pass = `kqkcbzcsjpxlryhj`;
const sender = 'rajatkumar.dev.acc@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: pass,
  },
});
// data (to_email,)
async function sendEmail(type, to_email, data) {
  const mail = getMail(type);
  var mailOptions = {
    from: sender,
    to: to_email,
    subject: mail.subject,
    text: mail.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function getMail(type) {
  switch (type) {
    case 'thank_you':
      return {
        subject: `Thank You`,
        text: 'Thank you for booking service.',
        html: 'Thank you for booking service.',
      };

    default:
      return;
  }
}

module.exports = sendEmail;
