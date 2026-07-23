import mongoose from "mongoose";
import Contact from "../../model/contact.js";
import {showError404} from "../error/error.js";

const viewAllContact = async (req,res,next) => {
    try{
        let {page,limit} = req.query;
        page = !page ? 1 : parseInt(page);
        limit = !limit ? 5 : parseInt(limit);
        // 1) custom pagination
        // const skip = (page - 1) * limit;
        // const contacts = await Contact.find().limit(limit).skip(skip).select({address:0});
        // const totalRecords = await Contact.countDocuments();
        // const totalPages = Math.ceil(totalRecords / limit);
        // return res.status(200).render('home_custom_pagination',{
        //     title: "Home page",
        //     contacts,
        //     page,
        //     limit,
        //     totalPages,
        //     showPagination: totalRecords > limit,
        //     showNextBtn: totalPages > page,
        //     showPrevBtn: page > 1
        // });
        // 2) pagination by using mongoose-paginate-v2 plugin
        const contacts = await Contact.paginate({},{page,limit});
        return res.status(200).render('home_with_pagination_plugin',{
            title: "Home page",
            contacts,
        });
    }catch(error){
        next(error);
    }
}

const viewContact = async (req,res,next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return showError404(res);
        }
        const contact = await Contact.findById(req.params.id);
        if(!contact) return showError404(res);
        return res.status(200).render('view_contact',{
            title: "View contact",
            contact,
        });
    }catch(error){
        next(error);
    }
}

export {viewAllContact,viewContact};