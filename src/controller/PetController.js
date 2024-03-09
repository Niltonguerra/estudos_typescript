"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var listaDePets = [];
var PetController = /** @class */ (function () {
    function PetController() {
    }
    PetController.prototype.criarPet = function (req, res) {
        // capitura os dados enviados
        var _a = req.body, id = _a.id, adotado = _a.adotado, especie = _a.especie, idade = _a.idade, nome = _a.nome;
        var novoPet = { id: id, adotado: adotado, especie: especie, idade: idade, nome: nome };
        // coloca os novos dados em listaDePets(que é uma simulação de bando de dados) para esse projeto
        listaDePets.push(novoPet);
        // retorna o que foi recebido
        return res.status(200).json(novoPet);
    };
    PetController.prototype.listaPets = function (req, res) {
        return res.status(200).json(listaDePets);
    };
    PetController.prototype.atualizaPet = function (req, res) {
        var id = req.params.id;
        var _a = req.body, adotado = _a.adotado, especie = _a.especie, idade = _a.idade, nome = _a.nome;
        var pet = listaDePets.find(function (pet) { return pet.id === Number(id); });
        if (!pet) {
            return res.status(404).json({ erro: "Pet não encontrado" });
        }
        pet.nome = nome;
        pet.idade = idade;
        pet.especie = especie;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    };
    PetController.prototype.deletaPet = function (req, res) {
        var id = req.params.id;
        var pet = listaDePets.find(function (pet) { return pet.id === Number(id); });
        if (!pet) {
            return res.status(404).json({ erro: "Pet não encontrado" });
        }
        var index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
    };
    return PetController;
}());
exports.default = PetController;
