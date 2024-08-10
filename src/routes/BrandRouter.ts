import { Router } from 'express';
import { BrandComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.get('/', BrandComponent.findAll);

router.post('/', BrandComponent.create);

router.post('/:id/models', BrandComponent.createModel);

router.get('/:id/models', BrandComponent.getModels);

/**
 * @export {express.Router}
 */
export default router;
