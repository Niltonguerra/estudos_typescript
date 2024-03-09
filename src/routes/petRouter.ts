import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petcontroller = new PetController();

router.post("/",petcontroller.criarPet);

// Rota para listar todos os pets
router.get('/', petcontroller.listaPets);

// Rota para atualizar informações de um pet existente
router.put('/:id', petcontroller.atualizaPet);

// Rota para deletar um pet existente
router.delete('/:id', petcontroller.deletaPet);

export default router;