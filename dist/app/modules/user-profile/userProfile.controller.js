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
const http_status_1 = __importDefault(require("http-status"));
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const catchAsync_1 = __importDefault(require("../../../shared/HOF/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/utilities/sendResponse"));
const userProfile_service_1 = __importDefault(require("./userProfile.service"));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access');
    }
    const data = yield userProfile_service_1.default.getMyProfileFromDB((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrieved successfully",
        data,
    });
}));
const getAllProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userProfile_service_1.default.getAllProfileFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrieved successfully",
        data,
    });
}));
const getProfileById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userProfile_service_1.default.getProfileByIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrieved successfully",
        data,
    });
}));
const updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access');
    }
    const result = yield userProfile_service_1.default.updateMyProfileToDB(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? "User's information updated successfully" : "No User's information found"}`,
        data: result,
    });
}));
const updateProfileById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield userProfile_service_1.default.updateProfileByIdToDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? "User's information updated successfully" : "No User's information found"}`,
        data: result,
    });
}));
exports.default = { getMyProfile, updateMyProfile, updateProfileById, getProfileById, getAllProfile };
