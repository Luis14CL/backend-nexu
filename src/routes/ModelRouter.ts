import { Router } from 'express';
import { ModelComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.get('/', ModelComponent.findAll);

router.put('/:id', ModelComponent.update);


/**
 * @export {express.Router}
 */
export default router;
