import express from 'express'
import { adminSignup } from '../controllers/adminController.js'
import { studentSignup } from '../controllers/studentController.js';
import { teacherSignup } from '../controllers/teacherController.js';

const router = express.Router();

router.post('/admin/signup', adminSignup);

router.post('/student/signup', studentSignup);
router.post('/student/login')
router.get('/student/classes/:id') // retorna lista de todas as classes que um estudante pertence
router.put('/student/:id') // altera info de estudante
router.delete('/student/:id') // deleta estudante

router.post('/teacher/signup', teacherSignup);
router.post('/teacher/login')
router.get('/teacher/classes/:id') // retorna lista de todas as classes que um professor leciona
router.put('/teacher/:id') // altera info de professor
router.delete('/teacher/:id') // deleta professor

router.post('/classroom') // cria uma sala (deve receber ao menos um prof)
router.post('/classroom/student') // adiciona um ou mais estudantes
router.get('/classroom') // retorna todas as salas
router.get('/classroom/:id') // retorna uma sala
router.put('/classroom/:id') // altera info de uma sala
router.delete('/classroom/:id') // deleta uma sala


export { router }