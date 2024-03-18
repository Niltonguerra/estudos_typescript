// adotanteRouter.ts
import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAdotante } from "../middleware/validators/adotanteRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validators/enderecoRequestBody";


const router = express.Router();

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
// instancia o adotante controller enquando passa a conexão com o banco de dados para o controller como parametro
const adotanteController = new AdotanteController(adotanteRepository);

// faz armazena dentro de ma variavel no middleware que faz a validação do corpo da requisição 
const validateBodyAdotante:RequestHandler=(req, res, next) => middlewareValidadorBodyAdotante(req, res, next);

const validateBodyEndereco: RequestHandler = (req, res, next) => 
middlewareValidadorBodyEndereco(req, res, next);



router.post("/",validateBodyAdotante,(req, res) => adotanteController.criaAdotante(req, res)
); // Rota para criar um adotante


router.get('/', (req,res)=>adotanteController.listaAdotante(req,res));


router.put('/:id', (req,res)=>adotanteController.atualizaAdotante(req,res));


router.delete('/:id', (req,res)=>adotanteController.deletaAdotante(req,res));


router.patch('/:id',validateBodyEndereco, (req,res)=>adotanteController.atualizaEnderecoAdotante(req,res));

export default router;
