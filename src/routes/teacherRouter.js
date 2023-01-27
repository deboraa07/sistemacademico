import express from 'express';
import { createTeacher, getAllTeachers, getTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';

const router = express.Router();

router.get('/:id', getTeacher) // retorna um professor
router.get('/', getTeacher) // retorna todos os professores


router.post('/', createTeacher) // cria um professor
router.put('/:id', updateTeacher) // altera info de professor
router.delete('/:id', deleteTeacher) // deleta professor

export { router as teacherRouter }