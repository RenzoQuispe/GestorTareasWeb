import mongoose from "mongoose";
export const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb://localhost/merndb')
        console.log("DB esta conectado")
    } catch(error){
        console.log(error);
    }
}

/*
// Codigo usado para usar CosmosDB Azure
export const connectDB = async () => {
    try {
        await mongoose.connect('      ', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Conectado a CosmosDB");
    } catch (error) {
        console.error("❌ Error al conectar a CosmosDB:", error);
    }
};
*/