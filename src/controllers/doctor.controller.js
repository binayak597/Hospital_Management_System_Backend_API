
import DoctorModel from "../models/doctor.schema.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';


export default class DoctorController{

    //register a new doctor
    register = async (req, res) => {

        try {

            const {username, password, name} = req.body;
    
            let user = await DoctorModel.findOne({username});
    
            if(user){
                return res.status(400).json({
                    message: 'Doctor Already Exists',
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            user = await DoctorModel.create({
                username,
                password: hashedPassword,
                name,
            });
    
            return res.status(201).json({
                message: 'Registered successfully',
            });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }

    //login a existing doctor
    login = async (req, res) => {

        try {

            const {username, password} = req.body;
            let user = await DoctorModel.findOne({ username });
            
            const isPassword = await bcrypt.compare(password, user?.password || "");

            if (!user || !isPassword) {
                return res.status(422).json({
                    message: "Invalid UserName or Password"
                });
            }

            generateTokenAndSetCookie(user._id, user.username, res);
    
            return res.status(200).json({message: "Login successful"});
        } 
        catch (error) {
    
            console.log('Error', error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}





