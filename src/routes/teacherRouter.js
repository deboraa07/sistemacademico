import express from 'express';
import { createTeacher, getAllTeachers, getTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';

const router = express.Router();

router.get('/:registration', getTeacher) // retorna um professor
router.get('/', getAllTeachers) // retorna todos os professores


router.post('/', createTeacher) // cria um professor
router.put('/:registration', updateTeacher) // altera info de professor
router.delete('/:registration', deleteTeacher) // deleta professor

export { router as teacherRouter }