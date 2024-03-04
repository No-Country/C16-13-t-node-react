import { Router } from 'express';
import { banUnban, changeRole, editOtherInformation } from '../controllers/admin.controllers';

const adminRouter = Router();

adminRouter.put('/admin/roles', changeRole)
adminRouter.put('/admin/availability', banUnban)
adminRouter.put('/admin/modifieUser/:name', editOtherInformation)

export default adminRouter;