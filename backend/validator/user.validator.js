const {z, string}  =require('zod')

const signupValidator = (req,res,next) =>{
    const body = req.body;
    const signupDetails = z.object({
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string().min(8).max(10),
    })
    const result = signupDetails.safeParse(body);
    if(!result.success){
        return res.status(411).json({
            success: false,
            message: "Email already taken / Incorrect inputs"
        })
    }
    next();
}
const signinValidator = (req,res,next) =>{
    const body = req.body;
    const signinDetails = z.object({
        username: z.string(),
        password: z.string().min(8).max(10),
    })
    const result = signinDetails.safeParse(body);
    if(!result.success){
        return res.status(411).json({
            success: false,
            message: "Error while logging in",
            error:result.error
        })
    }
    next();
}

const userValidator = (req,res,next) =>{
    const body = req.body;
    const userDetails = z.object({
        password:z.string().min(8).max(10).optional(),
        firstName:z.string().optional(),
        lastName:z.string().optional()
    })
    const result = userDetails.safeParse(body);
    if(!result.success){
        return res.status(411).json({
            success:false,
            message:"Error while updating information",
            error:result.error
        })
    }
    next()
}

const getUserValidator = (req,res,next) =>{
    const param = req.query;
    const getUserDetails = z.object({
        filter:z.string()
    })
    const result = getUserDetails.safeParse(param);
    if(!result.success){
        return res.status(411).json({
            success:false,
            message:"Error while updating information",
            error:result.error
        })
    }
    next()
}


exports.signupValidator = signupValidator;
exports.signinValidator = signinValidator;
exports.userValidator = userValidator;
exports.getUserValidator = getUserValidator;
