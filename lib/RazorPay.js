"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpay = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const config_1 = require("../config");
const razorpay = new razorpay_1.default({
    key_id: config_1.RAZORPAY_KEY_ID,
    key_secret: config_1.RAZORPAY_KEY_SECRET,
});
exports.razorpay = razorpay;
