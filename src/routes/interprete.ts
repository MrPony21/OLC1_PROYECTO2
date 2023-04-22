import express from 'express';
import { InterController } from '../controller/interpretecontroller';

const router = express.Router();

router.get('/ping', InterController.pong);

export default router;