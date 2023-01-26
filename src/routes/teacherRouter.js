import express from 'express';
import { teacherSignup } from '../controllers/teacherController.js';

const router = express.Router();

router.post('/signup', teacherSignup);
router.post('/login')

router.get('/:id') // retorna um professor
router.get('/') // retorna todos os professores
router.get('/classes/:id') // retorna lista de todas as classes que um professor leciona
router.put('/:id') // altera info de professor
router.delete('/:id') // deleta professor

export { router as teacherRouter }