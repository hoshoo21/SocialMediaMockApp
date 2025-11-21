import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';


/* configuration */
const __filename = fileURLToPath(import.meta.url); 
const __dirName = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourucePolicy({policy:'cross-origin'}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.use({limit :"30mb", extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirName,'public/assets')));

/* File storage */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/assets')
    },
    filename :function(req,file){
        cb(null, file.originalname);
    }
})

const upload =multer({storage});
