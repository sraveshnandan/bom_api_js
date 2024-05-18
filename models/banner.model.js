"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const mongoose_1 = require("mongoose");
const BanerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Banner name is required."],
    },
    image: {
        public_id: String,
        url: String,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.Banner = (0, mongoose_1.model)("Banner", BanerSchema);
