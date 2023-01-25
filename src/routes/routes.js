import express from 'express'
import { adminSignup, adminLogin } from '../controllers/adminController.js'
import { studentSignup } from '../controllers/studentController.js';
import { teacherSignup } from '../controllers/teacherController.js';

const router = express.Router();

router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin)

router.post('/student/signup', studentSignup);

router.post('/teacher/signup', teacherSignup);

export { router }