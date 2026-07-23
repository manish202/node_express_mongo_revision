import {validationResult} from 'express-validator';
import Contact from "../../model/contact.js";

const addContactForm = (req,res) => {
    return res.status(200).render('add_contact',{
        title: "Add new contact"
    });
}

const addContact = async (req,res,next) => {
    try{
        // if(!req.file) return res.status(400).send("please upload one file");
        // if(!req.files || req.files.length === 0) return res.status(400).send("please upload 3 files");
        // res.send(req.file);

        const error = validationResult(req);
        if(error.isEmpty()) return res.send(req.body);
        res.send({errors: error.array()});

        const {fname,lname,email,phone,address} = req.body;
        if(!fname || !lname || !email || !phone || !address){
            return res.redirect('/');
        }
        const contact = new Contact({fname,lname,email,phone,address});
        await contact.save();
        return res.redirect('/');
    }catch(error){
        next(error);
    }
}

export {addContactForm,addContact};