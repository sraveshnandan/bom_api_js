"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tansaction = void 0;
const mongoose_1 = require("mongoose");
const TranstactionSchema = new mongoose_1.Schema({}, { timestamps: true });
const Tansaction = (0, mongoose_1.model)("Transaction", TranstactionSchema);
exports.Tansaction = Tansaction;
