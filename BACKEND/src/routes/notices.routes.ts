import { Router } from 'express';
import { 
  listarNoticias, 
  agregarNoticia, 
  editarNoticia, 
  eliminarNoticia, 
  getNoticiaById
} from '../controllers/notices.controllers';
import { check } from 'express-validator';
import { noticesExistById } from '../helpers/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const noticesRouter = Router();

noticesRouter.get('/news', listarNoticias);

noticesRouter.get('/news/:id', [
    check('id').custom( noticesExistById )
], getNoticiaById);

noticesRouter.post('/news', [
    validateJWT,
    check('title', 'Title is required').not().isEmpty(),
    check('subtitle', 'Subtitle is required').not().isEmpty(),
    check('category', 'Category is required').isIn(['Deportes', 'Tecnología', 'Policiales', 'Espectaculo', 'Politicas', 'Interes General']),
    // check('imgUrl', 'Image URL is required').not().isEmpty(),
    check('synopsis', 'Synopsis is required').not().isEmpty(),
    validateFields
], agregarNoticia);

noticesRouter.put('/news/:id', [
    validateJWT,
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom( noticesExistById ),
    validateFields
], editarNoticia);

noticesRouter.delete('/news/:id', [
    validateJWT,
    // isAdminRole,
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom( noticesExistById ),
    validateFields
], eliminarNoticia);

export default noticesRouter;