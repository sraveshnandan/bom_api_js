"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileFunction = exports.fetchUserProfileFunction = exports.LoginUserFunction = exports.SendOtp = exports.RegisterUserFunction = void 0;
const config_1 = require("../config");
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const lib_1 = require("../lib");
const axios_1 = __importDefault(require("axios"));
// function to send otp
const SendOtp = async (req, res) => {
    try {
        const { mobile_no } = req.body;
        console.log("otp requested from :", req.headers);
        const user = await models_1.User.findOne({ phone_no: mobile_no });
        const otp = (0, utils_1.generateOTP)();
        if (!mobile_no) {
            return res.status(500).json({
                success: false,
                message: "Mobile number must be provided.",
            });
        }
        const smsBody = {
            route: "otp",
            variables_values: otp,
            numbers: mobile_no,
            flash: "1",
        };
        const body = JSON.stringify(smsBody);
        const data = await axios_1.default.post(config_1.SMS_GAITWAY_URL, body, {
            headers: {
                authorization: config_1.SMS_GAITWAY_API_KEY,
                "Content-Type": "application/json",
            },
        });
        console.log("otp sending responce", data);
        if (data.data.return) {
            if (user) {
                const newOtp = {
                    expiry: new Date(Date.now() + 10 * 60 * 1000),
                    value: otp,
                };
                user.otp = newOtp;
                await user.save();
                return res.status(200).json({
                    success: true,
                    message: `OTP sent successfully to ${mobile_no} .`,
                    otp,
                    account_status: "registred",
                });
            }
            res.status(200).json({
                success: true,
                message: `OTP sent successfully to ${mobile_no} .`,
                otp,
                account_status: "not registred",
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Unable to send otp at this time , please try again later.",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.SendOtp = SendOtp;
// function to register an user
const RegisterUserFunction = async (req, res) => {
    try {
        const { full_name, email, phone, referCode } = req.body;
        let alreadyExists = await models_1.User.findOne({ email, phone_no: phone });
        if (alreadyExists) {
            return res.status(401).json({
                success: false,
                message: "Account already exists, please login.",
            });
        }
        const data = {
            full_name,
            email,
            phone_no: phone,
            avatar: {
                public_id: "",
                url: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
            },
            referCode: (0, utils_1.generateReferCode)(),
        };
        const refrer = await models_1.User.findOne({ referCode });
        const user = await models_1.User.create(data);
        if (refrer) {
            refrer.wallet.currentBallence += 10;
            const userId = user._id;
            refrer.referCount.push(userId);
            await refrer.save();
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET, { expiresIn: "30d" });
        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.RegisterUserFunction = RegisterUserFunction;
// function to login user
const LoginUserFunction = async (req, res) => {
    try {
        const { phone_no, otp } = req.body;
        let user = await models_1.User.findOne({ phone_no }).populate("referCount");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No account found,Invalid phone number.",
            });
        }
        const isOtpExpired = user.otp?.expiry < new Date();
        if (isOtpExpired) {
            return res.status(401).json({
                success: false,
                message: "OTP is expired, please try again.",
            });
        }
        const otpMatched = user.otp?.value.toString() === otp.toString();
        if (otpMatched) {
            user.otp = {
                expiry: new Date(Date.now()),
                value: "",
            };
            await user.save();
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET, {
                expiresIn: "30d",
            });
            return res.status(200).json({
                success: true,
                message: `Welcome back ${user.full_name}`,
                user,
                token,
            });
        }
        res.status(401).json({
            success: false,
            message: "Otp not matched, invalid otp.",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.LoginUserFunction = LoginUserFunction;
//function to fetch user profile
const fetchUserProfileFunction = async (req, res) => {
    try {
        const profile = res.user;
        res.status(200).json({
            success: true,
            profile,
            message: "Profile fetched successfully.",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.fetchUserProfileFunction = fetchUserProfileFunction;
// function to update user profile
const UpdateUserProfileFunction = async (req, res) => {
    try {
        const user = await models_1.User.findById(res.user._id);
        const dataToUpdate = {
            ...req.body,
            avatar: user?.avatar,
        };
        // Uploading file to ImageKit
        if (req.file) {
            console.log("file found first of all removing previous one if it is available.");
            // if user has already avatar then deleting the old one
            if (user?.avatar.public_id !== "") {
                const fileId = user?.avatar.public_id;
                const result = await new Promise((resolve, reject) => {
                    lib_1.imagekit.deleteFile(fileId, (err, result) => {
                        if (err) {
                            reject(err);
                            console.log("Previous file deletion error.", err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
            }
            console.log("Uploading img....");
            const result = await new Promise((resolve, reject) => {
                lib_1.imagekit.upload({
                    file: req.file?.buffer,
                    fileName: `${user?._id}${req.file?.originalname}`,
                    tags: [
                        "single-upload-user-avatar",
                        `${user?.full_name}`,
                        `${user?._id}`,
                    ], // Optionally, add tags
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            console.log("Uploading done..");
            // inserting newly uploaded avatar data to the update payload
            dataToUpdate.avatar = {
                public_id: result.fileId,
                url: result.url,
            };
            const updatedUser = await models_1.User.findByIdAndUpdate({ _id: res.user._id }, { ...dataToUpdate }, { new: true });
            return res.status(200).json({
                success: true,
                updatedProfile: updatedUser,
                message: "Profile update route fetched.",
            });
        }
        else {
            const updatedUser = await models_1.User.findByIdAndUpdate({ _id: res.user._id }, { ...dataToUpdate }, { new: true });
            return res.status(200).json({
                success: true,
                updatedProfile: updatedUser,
                message: "Profile update route fetched.",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.UpdateUserProfileFunction = UpdateUserProfileFunction;
