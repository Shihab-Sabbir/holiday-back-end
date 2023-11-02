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
const users_model_1 = require("../users/users.model");
const jwtHelpers_1 = require("../../../shared/helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const userProfile_model_1 = require("../user-profile/userProfile.model");
const signUpUserToDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (userData.role && userData.role !== 'user') {
        throw new errors_apiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'role is not valid');
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const createdUser = yield users_model_1.User.create([userData], { session, select: '-password' });
        const userProfile = {
            user: createdUser[0]._id,
        };
        yield userProfile_model_1.UserProfile.create([userProfile], { session });
        const user = users_model_1.User.findById(createdUser[0]._id);
        yield session.commitTransaction();
        session.endSession();
        return user;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield users_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.role !== 'user') {
        throw new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, 'Plese use admin portal for login');
    }
    const user = yield users_model_1.User.findById(isUserExist._id).lean();
    if (isUserExist.password && !(yield users_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new errors_apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const adminSignIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield users_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.role === 'user') {
        throw new errors_apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Plese use user portal for login');
    }
    const user = yield users_model_1.User.findById(isUserExist._id).lean();
    if (isUserExist.password && !(yield users_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new errors_apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield users_model_1.User.findById(userId, { id: 1, role: 1 });
    ;
    if (!isUserExist) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.default = { signUpUserToDB, loginUser, refreshToken, adminSignIn };
