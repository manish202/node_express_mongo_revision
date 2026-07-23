import express from 'express';
import connectDB from './config/connectDB.js';
import contactRouter from './routes/contactRouter.js';
import sessionRouter from './routes/sessionRouter.js';
import tableRouter from './routes/tableRouter.js';
import {error404,error500} from "./controller/error/error.js";
const app = express();
const PORT = process.env.PORT;

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(contactRouter);
app.use('/sessions',sessionRouter);
app.use('/table',tableRouter);
app.use(error404);
app.use(error500);

(async () => {
    try{
        await connectDB();
        app.listen(PORT,() => console.log(`Server is running on port no ${PORT}`));
    }catch(error){
        console.log(error);
        process.exit(1);
    }
})();