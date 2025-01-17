import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  createdByDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  status: {
    type:String,
    require:true,
    enums:[
      'Negative', 
      'Travelled-Quarantine', 
      'Symptoms-Quarantine',
      'Positive-Admit'
    ]
  },
  date:{
    type: Date,
    required: true,
  }
}, {
  timestamps: true
}
)

const ReportModel = mongoose.model('Reports', reportSchema);

export default ReportModel;