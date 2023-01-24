import express from 'express'
import { signup } from '../controllers/adminController.js'

const router = express.Router();

router.post('/admin/signup', signup);

export { router }