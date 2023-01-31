import express from 'express'
import { getAllStudents, getStudent, createStudent, deleteStudent, updateStudent } from '../controllers/studentController.js';
import { checkAuth } from "../middleware/requireAuth.js"

const router = express.Router();

router.get('/:registration', getStudent) // retorna um aluno
router.get('/', getAllStudents) // retorna todos os alunos


router.use(checkAuth)
router.post('/', createStudent) // cria aluno
router.put('/:registration', updateStudent) // altera info de estudante
router.delete('/:registration', deleteStudent) // deleta estudante

export { router as studentRouter }