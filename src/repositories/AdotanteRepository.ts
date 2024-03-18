import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from '../entities/EnderecoEntity';
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import { Repository } from "typeorm";

export default class AdoranteRepository implements InterfaceAdotanteRepository{

    constructor(private repository:Repository<AdotanteEntity>){};



    criaAdotante(adotante: AdotanteEntity): void | Promise<void> {
        this.repository.save(adotante);
    }

    

    async listaAdotante(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
     }
 
 
 
 
    async atualizaAdotante(
        id: number,
        newData: AdotanteEntity
    ): Promise<{ success: boolean; message?: string }> {
        try {
        const AdotanteToUpdate = await this.repository.findOne({ where: { id } });
    
        if (!AdotanteToUpdate) {
            return { success: false, message: "adotante não encontrado no banco de dados" };
        }
    
        Object.assign(AdotanteToUpdate, newData);
    
        await this.repository.save(AdotanteToUpdate);
    
        return { success: true };
        
        } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Ocorreu um erro ao tentar atualizar o adotante.",
        };
        }
    }
    
    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string }> {
        try {
        const AdotanteToRemove = await this.repository.findOne({ where: { id } });
    
        if (!AdotanteToRemove) {
            return { success: false, message: "adotante não encontrado" };
        }
    
        await this.repository.remove(AdotanteToRemove);
    
        return { success: true};

        } catch (error) {
        return {
            success: false,
            message: "Ocorreu um erro ao tentar excluir o adotante.",
        };
        }
    }


    async atualizaEnderecoAdotante(
        idAdorante: number,
        endereco: EnderecoEntity
    ): Promise<{ success: boolean; message?: string}> {
        const adotante = await this.repository.findOne({where: {id:idAdorante}});
        
        if(!adotante){
            return {success:false, message:"Adotante não encontrado"}
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade,endereco.estado);
        
        adotante.endereco = novoEndereco;

        await this.repository.save(adotante);

        return {success: true};

    }
    








}