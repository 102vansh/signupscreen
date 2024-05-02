const User = require('../models/user.model')
const{ErrorHandler} = require('../middleware/Error')
const {Resend} = require('resend')
const resend = new Resend(process.env.RESEND_SECRET)
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2
const { url } = require('inspector')
exports.register = async (req,res,next) => {
    try{
const {name,email,password,confirmpassword} = req.body
const {avatar} = req.files
if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }

if(!name || !email || !password || !confirmpassword){
    return next(new ErrorHandler("please enter all fields",400))
}
let user = await User.findOne({email})
if(user){
    return next(new ErrorHandler("user already exist",400))
}

if(password !== confirmpassword){
    return next(new ErrorHandler("password not match",400))
}
const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }
  


user =  await User.create({name,email,password,confirmpassword,
   public_id:cloudinaryResponse.public_id,
   url:cloudinaryResponse.url
})
res.status(201).json({
    success:true,
    message:"user created successfully",
    user
})

}
    catch(error){
        return next(error)
    }
}

exports.login = async (req,res,next) => {
try{
const {email,password}  = req.body
if(!email || !password){
    return next(new ErrorHandler("please enter all fields",400))
}
const user = await User.findOne({email})
if(!user){
    return next(new ErrorHandler("user not found",400))
}
const ismatch = await user.comparepassword(password)
if(!ismatch){
    return next(new ErrorHandler("password not match",400))
}
const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: '0201it211102@gmail.com',
    subject: " You are login succesfully",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    return res.status(400).json({ error });
  }


const token = await user.generatetoken()
res.status(200).cookie("token",token,{expires:new Date(Date.now()+ 900000)}).json({
    success:true,
    message:"login successfully",
    user,
    token
})
}catch(error){
return next(error)
}


}
exports.forgotpassword = async(req,res,next)=>{
    try{
    const{email} = req.body
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandler('user not found',500))
    }
    const resettoken = await user.getgeneratetoken()
    
    
    const emailParams = {
        from: "onboarding@resend.dev",
        to: '0201it211102@gmail.com',
        subject: "Password Change Request",
        html: `<p>Please click <a href="http://yourwebsite.com/resetpassword/${resettoken}">here</a> to reset your password.</p>`
    };
    
    const { data, error } = await resend.emails.send(emailParams);
    
    if (error) {
        return(next(new ErrorHandler('Failed to send email', 500)))
    }
    
    res.status(200).json({
        success:true,
        message:"password forgot",
        data
    })
    }catch(error){
    return next(error)
    }
    }
    //change the password by link from email
    
    exports.changepassword = async(req,res,next)=>{
        const{newpassword,confirmpassword} = req.body
        try{
    const {token} = req.params
     const resetpasstoken =   crypto.createHash('sha256').update(token).digest('hex')
    
     const user = await User.findOne({
        resetpasstoken,
        resetpassexpire:{
            $gt: Date.now()
        }
     })
     if(!user){
        return next(new ErrorHandler('token is not valid',500))
    }
    user.password = newpassword
    user.confirmpassword = confirmpassword
    user.resetpasstoken = undefined
    user.resetpassexpire = undefined
    await user.save()
    res.status(200).json({
        success:true,
        message:"password changed"
    })
        }catch(error){
    return next(error)
        }
    }
