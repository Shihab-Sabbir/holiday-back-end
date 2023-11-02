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
const userProfile_model_1 = require("./userProfile.model");
const getMyProfileFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield userProfile_model_1.UserProfile.findOne({ user: userId });
    if (!userProfile) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User Profile Not Found');
    }
    return userProfile;
});
const getAllProfileFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const userProfiles = yield userProfile_model_1.UserProfile.find({}).populate('user');
    if (!userProfiles) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'No Users Profile Not Found');
    }
    return userProfiles;
});
const getProfileByIdFromDB = (profileId) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield userProfile_model_1.UserProfile.findById(profileId);
    if (!userProfile) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User Profile Not Found');
    }
    return userProfile;
});
const updateMyProfileToDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userProfile_model_1.UserProfile.findOneAndUpdate({ user: userId }, data, {
        new: true,
        runValidators: true,
    }).lean();
    console.log({ result });
    return result;
});
const updateProfileByIdToDB = (profileId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userProfile_model_1.UserProfile.findByIdAndUpdate(profileId, data, {
        new: true,
        runValidators: true,
    }).lean();
    console.log({ result });
    return result;
});
exports.default = {
    getMyProfileFromDB,
    updateMyProfileToDB,
    updateProfileByIdToDB,
    getProfileByIdFromDB,
    getAllProfileFromDB,
};
