import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../types/tiposPet";




export default class PetController {

  constructor(private repository:PetRepository){}


  criarPet(
  req:Request<TipoRequestParamsPet,{},TipoRequestBodyPet>,
  res:Response<TipoResponseBodyPet>
  ){
    // capitura os dados enviados
    const {adotado, especie, dataDeNascimento, nome,porte } = <PetEntity>req.body;

// aqui ele verifica se existe o valor dentro de uma propriedade do enumEspecie
    if(!Object.values(EnumEspecie).includes(especie)){
      return res.status(400).json({error:"Especie inválida"});
    }

// aqui ele faz a verificação se existe uma propriedade com o nome do dado enviado 
    if(porte && !(porte in EnumPorte)){
      return res.status(400).json({error:"Porte inválido"});
    }

    // exemplo:
      // animalFavorito: cachorro

      // nesse exemplo o in olharia para  valor animalFavorito
      // e o Object.values iria olhar para o valor cachorro. Ele indemendente do valor da chave
    const novoPet = new PetEntity(nome,especie,dataDeNascimento,adotado,porte);
    

    // aqui ele está mandando para a interface para de lá salvar no banco de dados
    this.repository.criarPet(novoPet);

    // retorna o que foi recebido
    return res.status(200).json({data:{id:novoPet.id,nome,especie,porte}});
  }





  async listaPets (
    req:Request<TipoRequestParamsPet,{},TipoRequestBodyPet>,
    res:Response<TipoResponseBodyPet>
  ){

    const listaDePets = await this.repository.listaPet();

    const data = listaDePets.map((pet) =>{
      return{
        id:pet.id,
        nome:pet.nome,
        porte:pet.porte,
        especie: pet.especie,
      }
    })


    return res.status (200).json ({data});
    }
    


  async atualizaPet (
    req:Request<TipoRequestParamsPet,{},TipoRequestBodyPet>,
    res:Response<TipoResponseBodyPet>
  ){
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );
  
    if (!success) {
      return res.status(404).json({ error: {message} });
    }
    return res.sendStatus(204);

    }




  async deletaPet (
  req:Request<TipoRequestParamsPet,{},TipoRequestBodyPet>,
    res:Response<TipoResponseBodyPet>
  ){
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({error: {message}} );
    }
    return res.sendStatus(204).json({error: {message}});
    }


  async adotaPet(
    req:Request<TipoRequestParamsPet,{},TipoRequestBodyPet>,
    res:Response<TipoResponseBodyPet>
  ){
      const { pet_id, adotante_id } = req.params;
      
      const { success, message } = await this.repository.adotaPet(
        Number(pet_id),
        Number(adotante_id)
      );

      if (!success) {
        return res.status(404).json({ error: {message} });
      }
      
      return res.sendStatus(204);
    }

    async buscaPetPeloPorte(req:Request, res: Response){
      const {porte} = req.query;
      const listaDePets = await this.repository.buscaPetPeloPorte(
        porte as EnumPorte);
        
      return res.status(200).json(listaDePets);
    }


    async buscaPetPortCampoGenerico(req:Request, res:Response){
      const {campo,valor} = req.query;
      const listaDePets = await this.repository.buscaPetPortCampoGenerico(
        campo as keyof PetEntity,
        valor as string
      );

      return res.status(200).json(listaDePets);
    }

}
