"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckShopOwner = exports.CheckAdmin = exports.Authorise = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const models_1 = require("../models");
//middleware to check if user is logged in or not
const Authorise = async (req, res, next) => {
    try {
        const token = req.headers?.token;
        // if request does not contain auth token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Protected route, auth token is required.",
            });
        }
        // decoding jwt token
        const decode = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const isTokenExpired = decode?.exp < currentTimestamp;
        // if no decoded data found
        if (!decode || isTokenExpired) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired auth token, please login again.",
            });
        }
        const user = await models_1.User.findById(decode.id).populate("referCount");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is compramised, or invalid token provided.",
            });
        }
        res.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server error.",
        });
    }
};
exports.Authorise = Authorise;
// middleware to check if user  is admin
const CheckAdmin = async (req, res, next) => {
    try {
        const isUserIsAdmin = res.user.isAdmin;
        if (!isUserIsAdmin) {
            return res.status(401).json({
                status: false,
                message: "You are not allowed to perform this action.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server error.",
        });
    }
};
exports.CheckAdmin = CheckAdmin;
// middleware to check if user  is admin
const CheckShopOwner = async (req, res, next) => {
    try {
        const isUserIsShopOwner = res.user.isShopOwner;
        if (!isUserIsShopOwner) {
            return res.status(401).json({
                status: false,
                message: "You are not allowed to perform this action.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server error.",
        });
    }
};
exports.CheckShopOwner = CheckShopOwner;
