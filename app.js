"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing all modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const app = (0, express_1.default)();
// Using middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:8081", "http://127.0.0.1:8081", "0.0.0.0/0"],
    credentials: true,
}));
// using endpoints
app.use("/api/v1", user_routes_1.default, payment_routes_1.default, admin_routes_1.default, product_routes_1.default);
const startServer = () => {
    app.listen(config_1.Port, () => {
        console.log(`🌍 Server is running at port : ${config_1.Port} in ${config_1.Mode} mode.`);
    });
};
// connecting to database and starting the server
(0, config_1.ConnectDb)(() => {
    startServer();
});
