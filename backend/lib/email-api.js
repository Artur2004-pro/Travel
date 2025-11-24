const nodemailer = require("nodemailer");

class EmailApi {
  static transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  static baseURL = "https://matted-lumpily-kaysen.ngrok-free.dev/email/";
  async verifyEmail(email, code) {
    const mailOptions = {
      from: `<artgrigoryan771@gmail.com>`,
      to: email,
      subject: "Բարև Bardiner-Travel-ից 🚀",
      text: "սա Bardiner-Travel֊ի գրանցման էլեկտրոնային հաղորդագրություն է ձեր էլ․ հասցեն վավերացնելու համար",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #4a90e2;">Bardiner</h1>
        <p style="font-size: 16px; color: #333;">
          Շնորհակալություն, որ գրանցվել եք: Մուտքագրեք այս թվերը կայքում:
        </p>
        <button " 
          style="
            display: inline-block;
            padding: 12px 25px;
            margin: 20px 0;
            font-size: 16px;
            color: white;
            background-color: #4a90e2;
            text-decoration: none;
            border-radius: 5px;
          ">
          Վավերացրեք էլ․ հասցեն այս կոդով՝ ${code}
        </button>
        <p style="font-size: 12px; color: #888;">
          Եթե դուք չեք ստեղծել այս հաշիվը, պարզապես անտեսեք այս նամակը:
        </p>
      </div>
    `,
    };
    return await this.send(mailOptions);
  }
  async forgotPassword(email, code) {
    const mailOptions = {
      from: `<${process.env.APP_EMAIL}>`,
      to: email,
      subject: "Bardiner-Travel — Reset Password",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #4a90e2;">Bardiner</h1>
        <p style="font-size: 16px; color: #333;">
          Ձեր գաղտնաբառը վերականգնելու համար մուտքագրեք այս կոդը կայքում:
        </p>

        <div style="
          font-size: 30px;
          font-weight: bold;
          padding: 10px 20px;
          background-color: #4a90e2;
          color: #fff;
          border-radius: 8px;
          display: inline-block;
          margin: 20px 0;">
          ${code}
        </div>

        <p style="font-size: 12px; color: #888;">
          Կոդը վավեր է 15 րոպե:
        </p>
      </div>
    `,
    };
    return await this.send(mailOptions);
  }
  async send(mailOptions) {
    try {
      const info = await EmailApi.transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new EmailApi();
