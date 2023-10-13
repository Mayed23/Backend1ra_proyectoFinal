import { Router } from "express";
import userModel from "../Dao/Mongo/models/user.model.js"


const UsersRouter = Router()

UsersRouter.get('/', async(req, res)=>{
    try{
        let users = await userModel.find({gender: `female`}).explain(`executionStars`)
        res.send({status: 'success', payload: users})
    } catch (error){
        console.log(error)
    }
    
})
UsersRouter.get('/_id', async(req, res)=>{
    try{
        let users = await userModel.findById(_id)
        res.send({status: 'success', payload: users})
    } catch (error){
        console.log(error)
    }
    
})

UsersRouter.post('/', async(req, res)=>{
    try{
        let newUser = await userModel.create(newUser)
        res.send({status: 'success', payload: users})
    } catch (error){
        console.log(error)
    }
    
})



export default UsersRouter