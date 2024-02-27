"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notices_controllers_1 = require("../controllers/notices.controllers");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const noticesRouter = (0, express_1.Router)();
noticesRouter.get('/news', notices_controllers_1.listarNoticias);
noticesRouter.get('/news/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.noticesExistById)
], notices_controllers_1.getNoticiaById);
noticesRouter.post('/news', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.check)('subtitle', 'Subtitle is required').not().isEmpty(),
    (0, express_validator_1.check)('category', 'Category is required').isIn(['Deportes', 'Tecnología', 'Policiales', 'Espectaculo', 'Politicas', 'Interes General']),
    (0, express_validator_1.check)('imgUrl', 'Image URL is required').not().isEmpty(),
    (0, express_validator_1.check)('synopsis', 'Synopsis is required').not().isEmpty(),
    validate_fields_1.validateFields
], notices_controllers_1.agregarNoticia);
noticesRouter.put('/news/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id', 'Is not valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.noticesExistById),
    validate_fields_1.validateFields
], notices_controllers_1.editarNoticia);
noticesRouter.delete('/news/:id', [
    validate_jwt_1.validateJWT,
    // isAdminRole,
    (0, express_validator_1.check)('id', 'Is not valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.noticesExistById),
    validate_fields_1.validateFields
], notices_controllers_1.eliminarNoticia);
exports.default = noticesRouter;
