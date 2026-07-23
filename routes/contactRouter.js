import express from "express";
import {body} from 'express-validator';
import {addContactForm,addContact} from '../controller/contact/addContact.js';
import {viewAllContact,viewContact} from '../controller/contact/viewContact.js';
import {editContactForm,editContact} from '../controller/contact/editContact.js';
import {deleteContact} from '../controller/contact/deleteContact.js';
import {uploadFileError} from "../controller/error/error.js";
import uploadFile from "../middleware/uploadFile.js";

const validateForm = [
    body('fname').notEmpty().withMessage("fname is required")
    .trim().isLength({ min:3}).withMessage("fname must be greater then 3 characters required")
    .isAlpha().withMessage("fname must be alpha value"),
    body('lname').notEmpty().withMessage("lname is required")
    .trim().isLength({ min:3}).withMessage("lname must be greater then 3 characters required")
    .isAlpha().withMessage("lname must be alpha value"),
    body('email').isEmail().withMessage("invalid email address").normalizeEmail(),
    body('phone').notEmpty().withMessage("phone is required")
    .trim().isLength({ min:3}).withMessage("phone must be greater then 3 characters required")
    .isAlpha().withMessage("phone must be alpha value"),
    body('address').notEmpty().withMessage("address is required")
    .trim().isLength({ min:3}).withMessage("address must be greater then 3 characters required")
    .isAlpha().withMessage("address must be alpha value"),
];

const contactRouter = express.Router();

contactRouter.get('/',viewAllContact);
contactRouter.get('/view-contact/:id',viewContact);
contactRouter.get('/add-contact',addContactForm);
// contactRouter.post('/add-contact',validateForm,addContact);
contactRouter.post('/add-contact',uploadFile.single('photo'),addContact,uploadFileError);
contactRouter.route('/edit-contact/:id').get(editContactForm).post(editContact);
contactRouter.get('/delete-contact/:id',deleteContact);

export default contactRouter;