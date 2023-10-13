import messageModel from "../Mongo/models/message.model.js"

export default class messageManagerMongo {
    constructor(){
        this.model=messageModel
    }

    async getMessages(){
        try{
            return await this.model.find().lean().exec()
        } catch (error){
            return (error)
            
        }
    }

    async createMessage() {
        try{
            return await this.model. createMessage(message)
        } catch (error){
            return (error)
        }
    }

}

