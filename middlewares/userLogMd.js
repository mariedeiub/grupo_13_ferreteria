function userLogMd(req,res,next){
res.locals.isLogged=false;

if(req.session.use){
    res.locals.isLogged=true;
    res.locals.userLogged=req.session.userLogged;
}


next();
}
module.exports = userLogMd;