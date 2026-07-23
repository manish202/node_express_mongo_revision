import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const contactSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
});

contactSchema.plugin(mongoosePaginate);

export default mongoose.model('Contact',contactSchema);