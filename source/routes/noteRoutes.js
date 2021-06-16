import express from 'express';

const router = express.Router();

import * as noteController from '../controller/noteController';

router.post('/notes', noteController.createNote);
router.get('/notes/:id/', noteController.showNote);


//router.delete("/orders/:id/", ordersController.deleteOrder);

export const noteRoutes = router;