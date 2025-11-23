import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/*Register users */

export const register =async(req,res)=>{
    try{
        const {
            firstName,
            lastName ,
            email,
            password ,
            picturePath ,
            friends ,
            location,
            occupation,
            
          
        } = req.body;
        console.log(req.body);
        console.log(password);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newsUser = new User({
            firstName,
            lastName ,
            email,
            password:passwordHash ,
            picturePath ,
            friends ,
            location,
            occupation,
            viewedProfiles:Math.floor(Math.random()*1000),

            impressions:Math.floor(Math.random()*1000),
        })
        const savedUser=await newsUser.save(); 
        res.status(201).json(savedUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
     }
}


/* Login */

export const login = async (req,res)=>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        console.log(user);
        if (!user){
            return res.status(404).json({message:"user doesn't exists"});

        }
        const isMatch=await  bcrypt.compare(password,user.password);
        if (!isMatch){
           return  res.status(404).json({message:"invalid username or password"});

        }
        const token = jwt.sign ({id : user.id }, process.env.JWT_SECRET);
        delete user.password;
        return res.status(200).json({token,user});

    }
    catch(err){
        res.status(500).json({error:err})
    }
}