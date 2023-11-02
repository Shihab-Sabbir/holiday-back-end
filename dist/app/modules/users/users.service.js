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
const users_model_1 = require("./users.model");
const mongoose_1 = __importDefault(require("mongoose"));
const userProfile_model_1 = require("../user-profile/userProfile.model");
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find({});
    return users;
});
const createUserToDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
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
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(id);
    return user;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const removedUser = yield users_model_1.User.findByIdAndRemove([id]);
        yield userProfile_model_1.UserProfile.findOneAndRemove([{ user: id }]);
        yield session.commitTransaction();
        session.endSession();
        return removedUser;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateUserToDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return result;
});
exports.default = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserToDB,
    createUserToDb,
};
