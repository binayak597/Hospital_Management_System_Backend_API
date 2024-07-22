
import ReportModel from '../models/report.schema.js';
import PatientModel from '../models/patient.schema.js';


export default class PatientController{

    //register a new patient

    register = async (req, res) => {

        try {

            let {number, patientName} = req.body;
        
            let user = await PatientModel.findOne({number});
    
            if(user){
                return res.status(200).json({
                    message: 'Patient Already Registered',
                    data: {
                        user:user
                    }
                });
            }
    
            user = await PatientModel.create({
                number,
                name: patientName,
            });
    
            return res.status(201).json({
                message: 'Patient registered successfully',
                data: user
            });
        } 
        catch (error){
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }

    //create report of a patient

    createReport = async (req, res) => {

        try {
            
            const {id: patientId} = req.params;
            const userId = req.userId;
            const {status} = req.body;
            const patient = await PatientModel.findById(patientId);
    
            if(!patient){
                return res.status(404).json({
                    message: "Patient Does not exist"
                });
            }
    
            let report = await ReportModel.create({
                createdByDoctor: userId,
                patient: patient._id,
                status: status,
                date: new Date()
            });
    
            patient.reports.push(report);
            
            return res.status(201).json({
                message: 'Report created successfully',
                data: report
            })
            
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }

    //get all reports of a patient
    getAllReports = async (req, res) => {

        try {

            const {id: patientId} = req.params;

            const reports = await ReportModel.find({patient:patientId}).populate('createdByDoctor').populate('patient').sort('date');
    
            const reportData = reports.map(report => {
                const originalDate = report.date;
                const dateObj = new Date(originalDate);
    
                const formattedDate = dateObj.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                });
    
                return {
                  createdByDoctor: report.createdByDoctor.name,
                  status: report.status,
                  date: formattedDate
                };
              });
    
            return res.status(200).json({
                message: `List of Reports of Patient with id - ${patientId}`,
                reports:reportData    
            });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }   
    }  

    //list all reports of all patients filtered on specific status

    listOfFilteredPatients = async (req, res) => {

        try {
            const {status} = req.params;
            const reports = await ReportModel.find({status});
    
            return res.status(200).json({
                message: `List of Reports with status ${status}`,
                reports
            });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}





