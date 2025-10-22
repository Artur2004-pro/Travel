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
  static baseURL = "https://matted-lumpily-kaysen.ngrok-free.dev/";
  async send(email, verifyToken) {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: `<artgrigoryan771@gmail.com>`,
      to: email,
      subject: "Բարև Bardiner-Travel-ից 🚀",
      text: "սա Bardiner-Travel֊ի գրանցման էլեկտրոնային հաղորդագրություն է ձեր էլ․ հասցեն վավերացնելու համար",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #4a90e2;">Bardiner</h1>
        <p style="font-size: 16px; color: #333;">
          Շնորհակալություն, որ գրանցվել եք: Սեղմեք ստորև, որպեսզի վավերացնեք ձեր էլ․ հասցեն:
        </p>
        <a href="${Email.baseURL}verify-email?token=${verifyToken}" 
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
          Վավերացնել էլ․ հասցեն
        </a>
        <p style="font-size: 12px; color: #888;">
          Եթե դուք չեք ստեղծել այս հաշիվը, պարզապես անտեսեք այս նամակը:
        </p>
      </div>
    `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async forgotPassword(email, forgotToken) {
    const mailOptions = {
      from: `<artgrigoryan771@gmail.com>`,
      to: email,
      subject: "Bardiner-Travel",
      text: "սա Bardiner-Travel֊ի էլեկտրոնային հաղորդագրություն է ձեր գախտնաբառը փոխելու համար",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #4a90e2;">Bardiner</h1>
        <p style="font-size: 16px; color: #333;">
          Սեղմեք ստորև, որպեսզի ընթացք տաք գախտնաբառի փոխելու գործընթացին:
        </p>
        <a href="${Email.baseURL}forgot-password?token=${forgotToken}" 
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
          մոռացել եք գախտնաբառը
        </a>
        <p style="font-size: 12px; color: #888;">
          Եթե դուք չեք մոռացել ձեր գախտնաբառը կամ տեղյակ չեք ինչպես է նամակը հասել ձեզ, պարզապես անտեսեք այս նամակը:
        </p>
      </div>
    `,
    };
    try {
      const info = await Email.transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = new EmailApi();
