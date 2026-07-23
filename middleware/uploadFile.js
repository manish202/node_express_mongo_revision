import path from 'node:path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req,file,cb){ cb(null,"./public/uploads") },
    filename: function (req,file,cb){
        const newName = Date.now() + path.extname(file.originalname);
        cb(null,newName);
    }
});

const uploadFile = multer({
    storage: storage, limits: { fileSize: 1024*1024*5 },
    fileFilter: (req,file,cb) => {
        if(file.fieldname === 'photo'){
            if(file.mimetype.startsWith('image/')){
                cb(null, true);
            }else{
                cb(new Error('Only images are allowed!'), false);
            }
        }else if(file.fieldname === 'userdocuments'){
            if(file.mimetype === 'application/pdf'){
                cb(null, true);
            }else{
                cb(new Error('Only PDF are allowed for documents'), false);
            }
        }else{
            cb(new Error('Unknown Field.'), false);
        }
    }
});

export default uploadFile;