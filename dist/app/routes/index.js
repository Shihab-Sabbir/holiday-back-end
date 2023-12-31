"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("../modules/users/users.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const admin_routes_1 = __importDefault(require("../modules/admin/admin.routes"));
const service_routes_1 = __importDefault(require("../modules/service/service.routes"));
const router = express_1.default.Router();
const appRoutes = [
    {
        path: '/users',
        route: users_routes_1.default,
    },
    {
        path: '/auth',
        route: auth_routes_1.default,
    },
    {
        path: '/admins',
        route: admin_routes_1.default,
    },
    {
        path: '/services',
        route: service_routes_1.default,
    },
];
appRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
