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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = void 0;
const user_service_1 = require("../services/user.service");
const getUserHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const user = yield (0, user_service_1.getUserById)(id);
    if (!user) {
        return reply.code(404).send({ message: "Usuario no encontrado" });
    }
    return reply.send(user);
});
exports.getUserHandler = getUserHandler;
