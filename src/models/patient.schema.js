import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true,
  },
  
  //no of reports made by doctors to individual patient
  reports:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reports',
    }
  ]
}, {
  timestamps: true
}
)

const PatientModel = mongoose.model('Patient', patientSchema);

export default PatientModel;