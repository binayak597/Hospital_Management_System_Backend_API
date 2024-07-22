import { Router } from "express";
import PatientController from "../controllers/patient.controller.js";

const router = Router();

//create an instance of PatientController class

const patientController = new PatientController();

router.post('/register',patientController.register);
router.post('/create-report/:id',patientController.createReport);
router.get('/all-reports/:id',patientController.getAllReports);
router.get('/reports/:status',patientController.listOfFilteredPatients);


export default router;