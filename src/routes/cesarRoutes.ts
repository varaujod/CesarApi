import { Router } from 'express';
import { CesarController } from '../controller/CesarController';

const router = Router();
const cesarController = new CesarController();

router.post('/cifrar', cesarController.cifrar);
router.post('/decifrar', cesarController.decifrar);
router.post('/decifrarForcaBruta', cesarController.decifrarForcaBruta);

export default router;