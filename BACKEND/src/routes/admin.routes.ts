import { Router } from 'express';
import { banUnban, changeRole, editOtherInformation, modifieCategoryOfNew } from '../controllers/admin.controllers';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const adminRouter = Router();

adminRouter.put('/admin/roles', [
    validateJWT
], changeRole)
adminRouter.put('/admin/availability', [
    validateJWT
], banUnban)
adminRouter.put('/admin/modifieUser/:name', [
    validateJWT,
    validateFields
], editOtherInformation)
adminRouter.put('/admin/modifieCategoryOfNew/:id', [
    validateJWT,
    validateFields
], modifieCategoryOfNew)

export default adminRouter;