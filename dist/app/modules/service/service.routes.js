"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const usersEnum_1 = require("../../../shared/enums/usersEnum");
const createService_1 = __importDefault(require("./controllers/createService"));
const deleteService_1 = __importDefault(require("./controllers/deleteService"));
const getAllService_1 = __importDefault(require("./controllers/getAllService"));
const getServiceById_1 = __importDefault(require("./controllers/getServiceById"));
const updateService_1 = __importDefault(require("./controllers/updateService"));
const router = express_1.default.Router();
router.post('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN, usersEnum_1.ENUM_USER_ROLE.SUPER_ADMIN), createService_1.default);
router.get('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN, usersEnum_1.ENUM_USER_ROLE.SUPER_ADMIN), getAllService_1.default);
router.get('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN, usersEnum_1.ENUM_USER_ROLE.SUPER_ADMIN), getServiceById_1.default);
router.patch('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN, usersEnum_1.ENUM_USER_ROLE.SUPER_ADMIN), updateService_1.default);
router.delete('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN, usersEnum_1.ENUM_USER_ROLE.SUPER_ADMIN), deleteService_1.default);
exports.default = router;
