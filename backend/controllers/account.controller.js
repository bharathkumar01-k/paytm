const { ObjectId } = require("mongodb");
const { getMongoClient, getConnection } = require("../db");

const client = getMongoClient();
const db = getConnection()

const getBalanceController = async (req,res) =>{
    const userId = req.userId.userId;
    const accountDetail = await db.collection('accounts').findOne({user_id:new ObjectId(userId)})
    console.log('user details',accountDetail);
    return res.status(200).send({
        success:true,
        balance: accountDetail.balance
    })
}

const transferController = async (req,res) => {
    const session = client.startSession();
    try{
        const userId = req.userId.userId;
        const body = req.body;
        session.startTransaction()
        const accountDetail =await db.collection('accounts').findOne({user_id:new ObjectId(userId)})
        if(body.amount > accountDetail.balance){
            await session.abortTransaction()
            return res.status(400).send({
                success:false,
                message:"Insufficient balance"
            })
        }
        
        const result = await db.collection('accounts').updateOne({user_id:new ObjectId(body.to)},{$inc:{balance:body.amount}})
        const findres = await db.collection('accounts').findOne({user_id:new ObjectId(body.to)})
        console.log(findres,body.to,{user_id:new ObjectId(body.to)})
        if(!result.matchedCount || !result.modifiedCount){
            await session.abortTransaction()
            return res.status(400).json({
                success:false,
                message:"Invalid Account"
            })
        }
        else{
            await db.collection('accounts').updateOne({user_id:new ObjectId(userId)},{$inc:{balance:-body.amount}})
        }
        await session.commitTransaction();
        console.log("transaction commmited successfully")
        return res.status(201).send({
            success:true,
            message:"Transfer successful"
        })
    }
    catch(err){
        console.log('error happened during transaction');
        await session.abortTransaction();
    }
    finally{
        await session.endSession()
    }
}

exports.getBalanceController = getBalanceController;
exports.transferController = transferController