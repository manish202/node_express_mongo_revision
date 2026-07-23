import mongoose from "mongoose";
import Contact from "../../model/contact.js";
import {showError404} from "../error/error.js";

const editContactForm = async (req,res,next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return showError404(res);
        }
        const contact = await Contact.findById(req.params.id);
        if(!contact) return showError404(res);
        return res.status(200).render('edit_contact',{
            title: "Edit contact",
            contact,
        });
    }catch(error){
        next(error);
    }
}

const editContact = async (req,res,next) => {
    try{
        const {fname,lname,email,phone,address} = req.body;
        if(!fname || !lname || !email || !phone || !address){
            return res.redirect('/');
        }
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return showError404(res);
        }
        await Contact.findByIdAndUpdate(req.params.id,{fname,lname,email,phone,address});
        return res.redirect('/');
    }catch(error){
        next(error);
    }
}

export {editContactForm,editContact};