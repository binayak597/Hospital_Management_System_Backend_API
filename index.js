import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {connectToDB} from './src/config/connectToDB.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import doctorRoutes from './src/routes/doctor.routes.js'
import patientRoutes from './src/routes/patient.routes.js'



const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//api gateways

//requests related to doctors

app.use("/doctors", doctorRoutes);

//requests related to patients

app.use("/patients", jwtAuth, patientRoutes);


app.get("/", (req, res) => req.send("welcome"));

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {

    connectToDB();
    console.log(`server is running on port ${PORT}`);
})