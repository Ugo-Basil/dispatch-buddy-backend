import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export = {
  verifyUserEmail: async (email: string, token: string) => {
    const link = `${process.env.ROOT_URL}/user/customer/verify/${token}`;
    let temp = `
       <div style="max-width: 700px;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome Dispatch Buddy</h2>
        <p>Dear Customer, Follow the link by clicking on the button to verify your email
        </p>
         <a href=${link}
         style="background: crimson; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
        `;

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email address",
      html: temp,
    };

    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },

  //Rider Verification Email
  verifyRiderEmail: async (email: string, token: string) => {
    const link = `${process.env.ROOT_URL}/user/rider/verify/${token}`;
    let temp = `
       <div style="max-width: 700px;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome Dispatch Buddy</h2>
        <p>Dear Rider, Follow the link by clicking on the button to verify your email
        </p>
         <a href=${link}
         style="background: crimson; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
        `;

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email address",
      html: temp,
    };

    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
