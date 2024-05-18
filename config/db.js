"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const secret_1 = require("./secret");
const ConnectDb = (next) => {
    mongoose_1.default
        .connect(secret_1.db_url_local, { dbName: "bmarket" })
        .then((con) => {
        console.log(`🪣  Database connected to : ${con.connection.host}`);
        return next();
    })
        .catch((e) => console.log(e));
};
exports.ConnectDb = ConnectDb;
