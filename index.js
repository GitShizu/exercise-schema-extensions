import morgan from "morgan";
import express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv'; dotenv.config();
import musicianRoutes from './routes/musiciansRoutes.js';
import albumRoutes from './routes/albumsRoutes.js';
const {MONGO_URI} = process.env;


const app = express();

app.use(morgan('dev'));
app.use(cors({origin:'*'}));
app.use(express.json());

app.use('/musicians', musicianRoutes );
app.use('/albums', albumRoutes);

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('Mongo connected succesfully');
    app.listen(3000, ()=>{
        console.log('Server running - listening on port 3000');
    })
}).catch(err=>console.error(err))

