import express from 'express';
import { getClassroom, getAllClassrooms, createClassroom, updateClassroom, deleteClassroom, addStudents } from "../controllers/classroomController.js";

const router = express.Router();

// router.get('/student/:id') // retorna lista de todas as classes que um estudante pertence
// router.get('/teacher/:id') // retorna lista de todas as classes que um professor leciona
router.get('/', getAllClassrooms) // retorna todas as salas
router.get('/:id', getClassroom) // retorna uma sala



router.post('/', createClassroom) // cria uma sala (deve receber ao menos um prof)
router.post('/:id/students/', addStudents) // adiciona um ou mais estudantes
router.put('/:id', updateClassroom) // altera info de uma sala
router.delete('/:id', deleteClassroom) // deleta uma sala
router.delete('/:id') // deleta um aluno de uma sala

export { router as classroomRouter }