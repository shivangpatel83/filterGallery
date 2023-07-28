const user = require(`../models/auth`)
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const secretKey = process.env.SECRET_KEY

module.exports.signupAuth = async (req,res)=>{
    const {name ,email, password,isSocial, picture} = req.body
        try{
            let getUser = await user.findOne({email:email});
            let userObj;
                if(!isSocial){
                    if(getUser){
                     return res.status(401).json({success: false, error : 'User already exists!'})
                     }
                     const hashPwd = await bcrypt.hash(password,12)
                            userObj= {
                                 name,
                                 email,
                                 password : hashPwd,
                                 isSocial : false
                            }
                        const saveUser = new user(userObj);
                        await saveUser.save();
                        return res.status(201).json({success: true, message : 'User successfully stored in the database'})

                }
                else{
                    if(!getUser){
                        userObj = {
                                name,
                                email,
                                picture,
                                isSocial
                                }
                        const saveUser = new user(userObj);
                        getUser =   await saveUser.save(); 
                    }
                    const token =  await jwt.sign({_id : getUser._id}, secretKey)
                    return res.status(201).json({success: true, message : 'Login Successful', token : token, name : getUser.name})
                }
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
}



module.exports.loginAuth = async (req,res)=>{
    const {email, password} = req.body
    try{
        const getUser = await user.findOne({email : email})
        if(!getUser){
            return res.status(401).json({success: false, error : 'Invalid Email!'})
        }
        else{
            const {isSocial} = getUser
            if(!isSocial){
            const loginPwd = getUser.password
            const verifyPwd = await bcrypt.compare(password,loginPwd)
                if(!verifyPwd){
                    return res.status(401).json({success: false, error : 'Invalid Password!'})
                }
                else{
                    const token =  await jwt.sign({_id : getUser._id}, secretKey)
                    return res.status(201).json({success: true, message : 'Login Successful', token : token, name : getUser.name})
                }
            }
            else{
                res.status(500).json({error: `Try with Google Login!!!`})
            }
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({error: e.message})
    }  
}


