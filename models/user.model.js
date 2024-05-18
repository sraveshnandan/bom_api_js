"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        requried: [true, "Full name is required."],
    },
    email: {
        type: String,
        requried: [true, "Email address is required."],
        unique: [true, "Email address should be unique."],
    },
    phone_no: {
        type: String,
        required: [true, "Phone number must be provided."],
        unique: [true, "Phone number already exists."],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isShopOwner: {
        type: Boolean,
        default: false,
    },
    referCode: {
        type: String,
    },
    referCount: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Orders",
        },
    ],
    cart: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    wishlist: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    subscription: {
        paymentId: String,
        expiryDate: Date,
    },
    wallet: {
        currentBallence: {
            type: Number,
            default: 0,
        },
        transations: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
    },
    otp: {
        expiry: {
            type: Date,
            default: Date.now,
        },
        value: {
            type: String,
        },
    },
    address: [
        {
            appartment_building_no: {
                type: String,
            },
            village_locality: {
                type: String,
            },
            landmark: {
                type: String,
            },
            city: {
                type: String,
            },
            district: {
                type: String,
            },
            state: {
                type: String,
            },
            pin_code: {
                type: Number,
            },
            contact_no: {
                type: Number,
            },
        },
    ],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
