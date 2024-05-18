"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAZORPAY_PAYMENY_VERIFY_SIGNATURE = exports.RAZORPAY_KEY_SECRET = exports.RAZORPAY_KEY_ID = exports.SMS_GAITWAY_API_KEY = exports.SMS_GAITWAY_URL = exports.JWT_SECRET = exports.db_url_local = exports.Mode = exports.Port = void 0;
// Importing dotenv to load all env variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Port = process.env.PORT;
exports.Port = Port;
const Mode = process.env.NODE_ENV;
exports.Mode = Mode;
const db_url_local = process.env.MONGO_URI;
exports.db_url_local = db_url_local;
const JWT_SECRET = process.env.JWT_PRIVATE_KEY;
exports.JWT_SECRET = JWT_SECRET;
const SMS_GAITWAY_URL = process.env.SMS_GAITWAY_URL;
exports.SMS_GAITWAY_URL = SMS_GAITWAY_URL;
const SMS_GAITWAY_API_KEY = process.env.SMS_GAITWAY_API_KEY;
exports.SMS_GAITWAY_API_KEY = SMS_GAITWAY_API_KEY;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
exports.RAZORPAY_KEY_ID = RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
exports.RAZORPAY_KEY_SECRET = RAZORPAY_KEY_SECRET;
const RAZORPAY_PAYMENY_VERIFY_SIGNATURE = process.env.RAZORPAY_PAYMENY_VERIFY_SIGNATURE;
exports.RAZORPAY_PAYMENY_VERIFY_SIGNATURE = RAZORPAY_PAYMENY_VERIFY_SIGNATURE;
