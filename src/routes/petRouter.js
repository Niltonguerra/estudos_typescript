"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PetController_1 = require("../controller/PetController");
var router = express_1.default.Router();
var petcontroller = new PetController_1.default();
router.post("/", petcontroller.criarPet);
// Rota para listar todos os pets
router.get('/pets', petcontroller.listaPets);
// Rota para atualizar informações de um pet existente
router.put('/pets/:id', petcontroller.atualizaPet);
// Rota para deletar um pet existente
router.delete('/pets/:id', petcontroller.deletaPet);
exports.default = router;
