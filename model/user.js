const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({ 
    first_name: {type: 'string',default: null}, 
    last_name: {type: 'string', default: null},
    email: {type: 'string', unique: true}, 
    password:{type: 'string'},
    token:{type: 'string'},
})

module.exports=mongoose.model('user', userSchema);