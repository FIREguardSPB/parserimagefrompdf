const nodemailer = require("nodemailer");
module.exports = async function mailSender(title, msg) {
  try {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.LOGIN,
        pass: process.env.PASS,
      },
    });

// send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Parser action INFO" <tonysokoloff@yandex.ru>', // sender address
      to: "sokolov.a.a83@gmail.com", // list of receivers
      subject: `${title}`, // Subject line
      text: `${msg}`, // plain text body
      html: `<b>${msg}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  catch (e) {
    console.log(e.message)
  }
}