import mongoose from "mongoose";

const dataBaseUrl = process.env.MONGO_DB_URL as string

const DBConnection = async () => {
  const cashed = (global as any).mongoose || { conn: null, promise: null };
  if (dataBaseUrl) return;

  if (cashed.conn) return cashed.conn;

  cashed.promise =
    cashed.promise ||
    mongoose
      .connect(dataBaseUrl, {
        dbName: "Events-App",
        bufferCommands: false,
      })
      .then(()=>console.log("DB Is Connected")).catch(()=>console.log("Failed To Connect")
      )
};


export default DBConnection