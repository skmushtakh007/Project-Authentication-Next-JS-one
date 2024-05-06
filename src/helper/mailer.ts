import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';



const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // TODO : configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(),10)
    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId,{verifyToken:hashedToken, verifyTokenExpiry:Date.now() + 3600000})
    }else if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId,{forgotPassword:hashedToken, forgotPasswordTokenExpiry:Date.now() + 3600000})
    }


    const transpor = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "eaa5e43ced4f83",
        pass: "f1feeda18e9bb7"
      }
    });

    const emailOptions = {
      from: 'hitesh@hitesh.ai',
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/ verifyemail?toke=${hashedToken}">here</a> to ${emailType ==="VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    }

    const mailResponse = await transpor.sendMail(emailOptions)
  }
  catch(error:any){
    throw new Error(error.message)
  }
}
export default sendEmail;