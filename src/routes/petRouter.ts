import express from "express";
import PetController from "../controller/PetController";
import PetRepository from '../repositories/PetRepository';
import { AppDataSource } from "../config/dataSource";


const router = express.Router();


// pega o repositório do banco de dados
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
  );



//  passa para o controller o repositório do banco de dados
const petcontroller = new PetController(petRepository);

// o req e o res são passados nas rotas aqui para dar um contexto para os dados para evitar erros
// ps: mas o que é esse contexto não faço a minima ideia, sendo sincero

// cria um registro de pet
router.post("/",(req,res)=>petcontroller.criarPet(req,res));

// Rota para listar todos os pets
router.get('/', (req,res)=>petcontroller.listaPets(req,res));

// Rota para atualizar informações de um pet existente
router.put('/:id', (req,res)=>petcontroller.atualizaPet(req,res));

// Rota para deletar um pet existente
router.delete('/:id', (req,res)=>petcontroller.deletaPet(req,res));

// rota para adotar um pet
router.put("/:pet_id/:adotante_id", (req, res) =>petcontroller.adotaPet(req, res));

// filtro por porte
router.get("/filtroPorte", (req,res) =>
  petcontroller.buscaPetPeloPorte(req,res));

 // filtro para pesquisar por qualquer campo 
router.get("/filtro", (req,res) =>
  petcontroller.buscaPetPortCampoGenerico(req,res));

export default router;