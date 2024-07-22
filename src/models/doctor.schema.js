import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },

  //reports assigned by individual doctor to patients
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

const DoctorModel = mongoose.model('Doctor', doctorSchema);

export default DoctorModel;