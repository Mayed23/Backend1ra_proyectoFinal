import messageModel from "./models/message.model.js"

class messageMongoManager {
    constructor(){
        this.model = messageModel
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

export default messageMongoManager