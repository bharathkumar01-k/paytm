const {z}  = require('zod')

const transferValidator = (req, res, next) =>{
    const body = req.body;
    const transferDetails = z.object({
        to: z.string(),
        amount: z.number().min(1).max(50000)
    })
    const result = transferDetails.safeParse(body);
    if(!result.success){
        return res.status(400).json({
            success:false,
            message:"bad request",
            error: result.error
        })
    }
    next()
}

exports.transferValidator = transferValidator;