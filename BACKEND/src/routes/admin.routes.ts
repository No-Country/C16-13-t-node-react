import { Router } from 'express';
import { banUnban, changeRole, editOtherInformation, modifieCategoryOfNew } from '../controllers/admin.controllers';

const adminRouter = Router();

adminRouter.put('/admin/roles', changeRole)
adminRouter.put('/admin/availability', banUnban)
adminRouter.put('/admin/modifieUser/:name', editOtherInformation)
adminRouter.put('/admin/modifieCategoryOfNew/:id', modifieCategoryOfNew)

export default adminRouter;