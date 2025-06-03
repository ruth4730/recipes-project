import User, { generateToken, JoiUserSchema } from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import {sendWelcomeEmail, sendPasswordChangeNotification} from '../services/email.service.js'
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next({ message: error.message });
    }
};
export const signIn = async (req, res, next) => {
    try {
        if (JoiUserSchema.login.validate(req.body).error) {
            return next({ status: 400, message: 'invalid data' });
        }
        const { userName, password, email, address } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next({ message: 'user not found', status: 401 });
        }
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) {
            return next({ message: 'user not found', status: 401 });
        }
        const token = generateToken(user);
        res.status(200).json({ userName: user.userName, token })
    } catch (error) {
        next({ message: error.message })
    }
}
export const signUp = async (req, res, next) => {
    try {
        const valid = JoiUserSchema.register.validate(req.body);
        if (valid.error) {
            return next({ status: 400, message: valid.error });
        }
        const { userName, password, email, address } = valid.value;
        const user = new User({ userName, password, email, address });
        await user.save();
        const token = generateToken(user);
        try {
            sendWelcomeEmail(user.email, user.username);
        } catch (err) {
            console.error('Email notification failed:', err);
        }
        res.status(201).json({ userName: user.userName, token })
    } catch (error) {
        next({ message: error.message });
    }
}
export const newPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if (req.user._id !== id) {
            return next({ status: 403, message: 'no permission' });
        }
        if (JoiUserSchema.login.extract('password').validate(password).error) {
            return next({ status: 400, message: 'invalid data' });
        }
        const user = await User.findById(id);
        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }
        user.password = password;
        await user.save();
        try {
            sendPasswordChangeNotification(user.email, user.username);
        } catch (err) {
            console.error('Email notification failed:', err);
        }
        res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
}