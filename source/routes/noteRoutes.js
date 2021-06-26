import express from 'express';
import {noteController} from '../controller/noteController.js';

const router = express.Router();

router.get('/', noteController.showNotes);
router.post('/', noteController.createNote);
router.get('/:id/', noteController.showNote);
router.post('/:id/', noteController.editNote);
router.delete('/:id/', noteController.deleteNote);

export const noteRoutes = router;