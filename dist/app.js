"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const handleNotFoundRoutes_1 = __importDefault(require("./app/middlewares/handleNotFoundRoutes"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// using cors
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
// app.use('/api/v1/users/', userRouter);
app.use('/api/v1', routes_1.default);
//Testing routes is running well
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Digital Cow Hat Backend Server is Running');
}));
//global error handler
app.use(globalErrorHandler_1.default);
// Hanlde Not Found with custom messaages
app.use(handleNotFoundRoutes_1.default);
exports.default = app;
