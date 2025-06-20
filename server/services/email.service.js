import { createEmailTransporter, emailDefaults, emailTemplates } from "../config/email.js";
const transporter = createEmailTransporter();
export const sendPasswordChangeNotification = async (userEmail, username) => {
    const template = emailTemplates.passwordChange;
    const mailOptions = {
        from: emailDefaults.from,
        to: userEmail,
        subject: template.subject,
        html: template.getHtml(username)
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password change notification sent to ${userEmail}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to send password change notification:', error);
        return { success: false, error: error.message };
    }

}
export const sendWelcomeEmail = async (userEmail, username) => {
    const template = emailTemplates.welcome;

    const mailOptions = {
        from: emailDefaults.from,
        to: userEmail,
        subject: template.subject,
        html: template.getHtml(username)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${userEmail}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return { success: false, error: error.message };
    }
};
export const sendDeleteUser = async (userEmail, username) => {
    const template = emailTemplates.delete;
    const mailOptions = {
        from: emailDefaults.from,
        to: userEmail,
        subject: template.subject,
        html: template.getHtml(username)
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`user has delete to ${userEmail}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to send deleted notification:', error);
        return { success: false, error: error.message };
    }

}
