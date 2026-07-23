import mongoose from "mongoose";
import Contact from "../../model/contact.js";
import {showError404} from "../error/error.js";

const deleteContact = async (req,res,next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return showError404(res);
        }
        await Contact.findByIdAndDelete(req.params.id);
        return res.redirect('/');
    }catch(error){
        next(error);
    }
}

export {deleteContact}