import express from 'express'
import { studentSignup } from '../controllers/studentController.js';

const router = express.Router();

router.post('/student/signup', studentSignup);
router.post('/student/login')

router.get('/:id') // retorna um aluno
router.get('/') // retorna todos os alunos
router.put('/:id') // altera info de estudante
router.delete('/:id') // deleta estudante

export { router as studentRouter }