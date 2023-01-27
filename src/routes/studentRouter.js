import express from 'express'
import { getAllStudents, getStudent, createStudent, deleteStudent, updateStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/:id', getStudent) // retorna um aluno
router.get('/', getAllStudents) // retorna todos os alunos



router.post('/', createStudent) // cria aluno
router.put('/:id', updateStudent) // altera info de estudante
router.delete('/:id', deleteStudent) // deleta estudante

export { router as studentRouter }