"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.generateReferCode = void 0;
// for generating unique refer code
const generateReferCode = () => {
    const prefix = "BOM";
    const randomNumber = Math.floor(Math.random() * 90000) + 10000 + "";
    return prefix + randomNumber;
};
exports.generateReferCode = generateReferCode;
// for generating unique otp
const generateOTP = () => {
    const otpLength = 6;
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};
exports.generateOTP = generateOTP;
