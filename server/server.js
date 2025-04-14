import 'dotenv/config' 
import express, { json } from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

//App config 

const PORT = process.env.PORT || 4000;
const App = express();
(async () => {
    await connectDB();
})();


//middleware
App.use(express.json());
App.use(cors());


//Routes 
App.get('/', (req,res)=>{ res.send("Api working ")});
App.use('/api/user',userRouter)

App.listen(PORT,()=>{

    console.log(`App running at PORT no. ${PORT}`);

})
