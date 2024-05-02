const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
name:{
    type:String,
    
},
email:{
    type:String,
    required:true,
    validate:[validator.isEmail,"Enter correct email type"]

},
password:{
    type:String,
    required:true,

},
confirmpassword:{
    type:String,
    required:true
},
avatar:{
    public_id:{
        type:String,
       },
       url:{
        type:String
       }

},
checkbox:{
    type:Boolean,
    default:false
},
resetpasstoken:{
    type:String
  },
  resetpasstoken:{
    type:String
  },
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
       
    }
    return next()
})
userSchema.pre("save",async function(next){
    if(this.isModified("confirmpassword")){
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,10)
       
    }
    return next()
})
userSchema.methods.comparepassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

// const options ={
//     expiresin: new Date(
//         process.env.COOKIE_EXPIRE * 24 *60 *60* 1000
//     ),

// }
userSchema.methods.generatetoken = async function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
userSchema.methods.getgeneratetoken = async function(){
    const resettoken = crypto.randomBytes(20).toString("hex")
   this.resetpasstoken = crypto.createHash('sha256').update(resettoken)
   this.resetpassexpire = Date.now() +15 *60 *1000
    return resettoken
}


module.exports = mongoose.model('User',userSchema)