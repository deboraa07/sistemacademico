import express from 'express';

const router = express.Router();

router.get('/student/:id') // retorna lista de todas as classes que um estudante pertence
router.post('/') // cria uma sala (deve receber ao menos um prof)
router.post('/student') // adiciona um ou mais estudantes
router.get('/') // retorna todas as salas
router.get('/:id') // retorna uma sala
router.put('/:id') // altera info de uma sala
router.delete('/:id') // deleta uma sala

export { router as classroomRouter }