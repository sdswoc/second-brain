function isLoggedIn(req,res,next){
    if (!req.session.userId) return res.status(401).send('Not logged In!')
    next();
}

module.exports=isLoggedIn;