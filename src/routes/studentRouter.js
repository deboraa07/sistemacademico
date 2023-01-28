import express from 'express'
import { getAllStudents, getStudent, createStudent, deleteStudent, updateStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/:registration', getStudent) // retorna um aluno
router.get('/', getAllStudents) // retorna todos os alunos



router.post('/', createStudent) // cria aluno
router.put('/:registration', updateStudent) // altera info de estudante
router.delete('/:registration', deleteStudent) // deleta estudante

export { router as studentRouter }