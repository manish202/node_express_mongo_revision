import express from "express";

const tableRouter = express.Router();

tableRouter.get('/',(req,res) => {
    res.status(200).render('table');
});

export default tableRouter;