import multer from "multer";

const showError404 = (res) => {
    return res.status(404).render('error',{
        title: 'Oops! Error 404 Page Not Found.',
        errorCode: 404,
        errorMessage: 'Oops! Error 404 Page Not Found.',
    });
}

const error404 = (req,res,next) => {
    return showError404(res);
}

const error500 = (error,req,res,next) => {
    return res.status(error.statusCode || 500).render('error',{
        title: 'Oops! 500 Internal Server Error.',
        errorCode: error.statusCode || 500,
        errorMessage: error?.message ?? 'Oops! 500 Internal Server Error.',
    });
}

const uploadFileError = (err,req,res,next) => {
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.status(400).send(`Error : Too many files uploaded!`);
        }
        return res.status(400).send(`Multer error: ${err.message} : ${err.code}`);
    }
    next(err);
}

export {showError404,error404,error500,uploadFileError};