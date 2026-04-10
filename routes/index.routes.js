import { Router } from 'express';
import { getHello, getPing, getABC } from '../controllers/index.controllers.js';
const router = Router();

router.get('/',getHello); 
router.get('/ping',getPing); 
router.get('/a/b/c',getABC); 
export default router;