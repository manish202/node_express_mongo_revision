import express from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionRouter = express.Router();

sessionRouter.use(session({
    secret:'mysecretkey',
    resave:false, // session ko modify kar sakte hai ya nahi
    saveUninitialized:false, // jab tak session mai value nahi hai session create mat karo.
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessiondb',
        collectionName : 'mysessions',
        // ttl: 1000*60*60*24 // no need to use cookie property, its alternative
    }),
    cookie: {maxAge: 1000*60*60*24}
}));

sessionRouter.get('/set_session', (req,res) => {
    req.session.username = "Manish Pro";
    res.send('<h1>Username has been set in session.</h1>');
});
sessionRouter.get('/get_session', (req,res) => {
    res.send(`<h1>Username : ${req?.session?.username ?? 'Nothing'}</h1>`);
});
sessionRouter.get('/destroy_session', (req,res) => {
    req.session.destroy((err) => {
        if(err) res.status(500).send('Failed to destroy session');
    });
    res.send('<h1>Session destroy successfully.</h1>');
});


export default sessionRouter;