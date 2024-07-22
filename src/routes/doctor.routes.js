import { Router } from "express";
import DoctorController from "../controllers/doctor.controller.js";

const router = Router();

//create an instance of DoctorController class

const doctorController = new DoctorController();


router.post('/register', doctorController.register);
router.post('/login', doctorController.login);


export default router;