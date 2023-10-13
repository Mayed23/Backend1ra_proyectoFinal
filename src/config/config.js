import { connect } from "mongoose"


const connectDb = async () => {
    try {
        console.log(`Base de Datos conectada`)
        return await connect("mongodb+srv://AdminMaite:maite1503@cluster0.twm9xie.mongodb.net/project?retryWrites=true&w=majority")

    } catch (error) {
        console.log(error)
    }

}

export default connectDb