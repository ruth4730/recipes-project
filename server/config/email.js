import nodemailer from 'nodemailer'
const emailConfigs = {
    gmail: {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    },
    outlook: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
};
const getEmailConfig = () => {
    const provider = process.env.EMAIL_PROVIDER;
    const config = emailConfigs[provider];
    if (!config) {
        throw new Error(`Email provider '${provider}' not configured`);
    }
    return config;
}
export const createEmailTransporter=()=>{
    try{
        const config=getEmailConfig();
        const transporter=nodemailer.createTransport(config);
        transporter.verify((error, success) => {
      if (error) {
        console.error('Email configuration error:', error);
      } else {
        console.log('Email server is ready to send messages');
      }
    });
    return transporter;
    }catch(error){
        console.error('Failed to create email transporter:', error);
        throw error;
    }
};
export const emailDefaults = {
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
};

// תבניות מייל
export const emailTemplates = {
  passwordChange: {
    subject: 'Password Changed Successfully',
    getHtml: (username) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Changed Successfully</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your password has been changed successfully at ${new Date().toLocaleString()}.</p>
        <p style="color: #d32f2f;">⚠️ If you didn't make this change, please contact us immediately.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">This is an automated message, please do not reply.</p>
      </div>
    `
  },
  
  welcome: {
    subject: 'Welcome to Our Platform!',
    getHtml: (username) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4caf50;">Welcome ${username}!</h2>
        <p>Thank you for joining our platform.</p>
        <p>You can now start using all our features.</p>
      </div>
    `
  },
  delete: {
    subject: 'You have been deleted from our user database.',
    getHtml: (username) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4caf50;">Welcome ${username}!</h2>
        <p>You have been deleted from our user database.</p>
      </div>
    `
  }
};