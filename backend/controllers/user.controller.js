const { getConnection } = require("../db");
const bcrypt = require('bcrypt');
const db = getConnection();
const jwt = require('jsonwebtoken');
const config = require("../config");
const { ObjectId } = require("mongodb");

const signupController = async (req,res,next) => {
    const body = req.body;
    const findResult = await db.collection('user').findOne({username:body.username})
    if(findResult){
        return res.status(411).json({
            success:false,
            message: "Email already taken / Incorrect inputs"
        })
    }
    const hashedPassword = bcrypt.hashSync(body.password,10)
    body.password = hashedPassword

    const user = await db.collection('user').insertOne(body)

    await db.collection('accounts').insertOne({
        user_id:user.insertedId,
        balance: Math.floor(Math.random() * 10000) + 1 
    })
    
    return res.status(201).json({
        success:true,
        message: "User created successfully",
        
    })
}

const signinController = async (req,res,next) =>{
    const body  = req.body;
    const userDetails = await db.collection('user').findOne({username:body.username})
    console.log('user details',userDetails)
    if(!userDetails){
        console.log('inside ifff 1')
        return res.status(411).json({
            success:false,
            message: "Error while logging in"
        })
    }
    const comparePassword = bcrypt.compareSync(body.password,userDetails.password);
    console.log('password',comparePassword)
    if(!comparePassword){
        console.log('inside ifff 2')
        return res.status(411).json({
            success:false,
            message: "Incorrect password"
        })
    }
    const token = jwt.sign({
        userId: userDetails['_id']
    },config.JWT_SECRET)

    res.set('Token',token)
    return res.status(201).json({
        success:true,
        message:"user authenticated successfully"
    })
}

const userDetailsController = async(req,res,next) =>{
    const body = req.body;
    console.log('body',body)
    if(body.hasOwnProperty('password')){
        const hashedPassword = bcrypt.hashSync(body.password,10)
        body.password = hashedPassword
    }
    const result = await db.collection('user').updateOne({_id:new ObjectId(req.userId.userId)},{$set:{...body}})
    console.log('result',result)
    return res.status(201).json({
        status:true,
        message:"Updated successfully"
    })
}

const getBulkUsersController = async (req,res) =>{
    const {filter} = req.query;
    const userId = req.userId.userId
    const usersCursor = db.collection('user').find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    },{projection:{
        _id:1,
        username:1,
        firstName:1,
        lastName:1
    }})
    const users = await usersCursor.toArray();
    const filteredUser = users.filter((user) => user['_id'].toString()!==userId)
    return res.status(200).json({
        success:true,
        users: filteredUser
    })
    
}

const getCurrentUserDetails = async (req,res) => {
    const userId = req.userId.userId;
    console.log('user id',userId)
    const pipeline = []
    pipeline.push({
        $match:{
            _id:new ObjectId(userId)
        }
    })
    pipeline.push({
        $lookup:{
            from:"accounts",
            localField:"_id",
            foreignField:"user_id",
            as:"user_mapping"
        }
    })
    pipeline.push(
        {
            $set:{
                user_mapping:{$first: "$user_mapping"}
            }
        },  
        {
        $set:{
            balance:"$user_mapping.balance",
            user_id:"$user_mapping.user_id"
        }
    })
    pipeline.push({
        $unset:['password','user_mapping','_id']
    })
    const cursor = db.collection('user').aggregate(pipeline)
    const result =await cursor.toArray()
    console.log('result',JSON.stringify(result,0,5))
    return res.status(200).json({
        success:true,
        user_details:result[0]
    })
}

exports.signupController = signupController;
exports.signinController = signinController;
exports.userDetailsController = userDetailsController;
exports.getBulkUsersController = getBulkUsersController;
exports.getCurrentUserDetails = getCurrentUserDetails;