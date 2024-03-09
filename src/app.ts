import router from "./routes";
import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

// comando para converter '.ts' para '.js': 'npx tsc ./server.ts'


const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(()=>{
  console.log("banco de dados conectado")
})
.catch((erro)=>{
  console.log(erro)
});



export default app;
