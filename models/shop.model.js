"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const mongoose_1 = require("mongoose");
const ShopSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    banners: [
        {
            public_id: String,
            url: String,
        },
    ],
    geolocation: {
        lat: String,
        long: String,
    },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
    products: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    subscription: {
        currentPlan: String,
        expiryDate: {
            type: Date,
            default: Date.now(),
        },
        transactions: { type: mongoose_1.Schema.Types.ObjectId, ref: "Transaction" },
    },
    stats: {
        view: {
            type: Number,
            default: 0,
        },
    },
}, { timestamps: true });
const Shop = mongoose_1.models.Shop || (0, mongoose_1.model)("Shop", ShopSchema);
exports.Shop = Shop;
