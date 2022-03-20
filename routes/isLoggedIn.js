function isLoggedIn(req,res,next){
    if (!req.session.userId) return res.send('You are not logged in');
    next();
}

module.exports=isLoggedIn;