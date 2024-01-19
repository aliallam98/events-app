import mongoose from "mongoose";


const dataBaseUrl = process.env.MONGO_DB_URL as string
let cached = (global as any).mongoose || { conn: null, promise: null };


const DBConnection = async () => {
  console.log(dataBaseUrl);
  
  if (!dataBaseUrl) return;

  if (cached.conn) return cached.conn;
  
  cached.promise = cached.promise ||
     await mongoose
      .connect(dataBaseUrl, {
        dbName: "Events-App",
        bufferCommands: false,
      })
      .then(()=>console.log("DB Is Connected")).catch(()=>console.log("Failed To Connect")
      )

      cached.conn = await cached.promise;
      return cached.conn
};


export default DBConnection
