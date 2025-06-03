import { createEmailTransporter, emailDefaults, emailTemplates } from "../server/config/email";
const transporter = createEmailTransporter();
export const sendPasswordChangeNotification = async (userEmail, userName) => {
    const template = emailTemplates.passwordChange;
    const mailOptions = {
        from: emailDefaults.from,
        to: userEmail,
        subject: template.subject,
        html: template.getHtml(userName)
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
