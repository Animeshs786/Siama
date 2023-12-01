const nodemailer = require('nodemailer');

const pass = `gilmfxydyhqydpyz`;
const sender = 'ibuzoo.eservices@gmail.com';
// const pass = `kqkcbzcsjpxlryhj`;
// const sender = 'rajatkumar.dev.acc@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: pass,
  },
});
async function sendEmail(data) {
  const mail = getMailConfig(data);
  transporter.sendMail(mail, function (error, info) {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
}

function getMailConfig(data) {
  switch (data.type) {
    case 'thank_you':
      return {
        from: sender,
        to: data.to_email,
        subject: `Thank You`,
        text: 'Thank you for booking service.',
      };

    case 'vendor_get_payslip':
      return {
        from: sender,
        to: data.to_email,
        subject: `Payment slip from ibuzoo`,
        html: `<img src='${data.slip_link}' alt='payment slip' /> <br/><br/> <b><a href='${data.slip_link}' download>Download</a><b/>`,
      };

    default:
      return;
  }
}

module.exports = sendEmail;
