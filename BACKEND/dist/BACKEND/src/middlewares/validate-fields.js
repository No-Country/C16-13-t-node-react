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
exports.validateFields = void 0;
const validate_jwt_1 = require("./validate-jwt");
const validateFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPass = yield userModel_1.User.findOne({ email: req.body.email });
    const matchPass = yield (0, validate_jwt_1.comparePassword)(req.body.pass, hashedPass.pass);
    next();
});
exports.validateFields = validateFields;
