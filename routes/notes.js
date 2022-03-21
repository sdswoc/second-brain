const router=require('express').Router();

router.get('/', (req,res)=>{
    res.render('notes/notes')
})

module.exports=router;