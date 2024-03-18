import PetEntity from '../../entities/PetEntity';
import EnumPorte from '../../enum/EnumPorte';

export default interface InterfacePetRepository{
    
    criarPet(pet:PetEntity):void;
    
    listaPet():Array<PetEntity> | Promise<PetEntity[]>;
    
    atualizaPet(id:number, pet: PetEntity): Promise <{success:boolean; message?: string}> | void;
    
    deletaPet(id: number):Promise<{success:boolean; message?:string}> | void;
    
    adotaPet(pet_id:number, id_adotante:number): Promise<{success:boolean; message?:string}> | void;
    
    buscaPetPeloPorte(porte:EnumPorte): Promise<PetEntity[] | PetEntity[]>
    
    // essa rota permitirá fazer pesquisas de qualquer campo. ela irá receber dois parâmetros, sendo
    // eles o campo e o valor. sendo esse campo o qualquer valor de petEntity e o valor o parâmetro que 
    // será pesquisado no banco de dados 
    buscaPetPortCampoGenerico<Tipo extends keyof PetEntity>(
        campo:Tipo,
        valor:PetEntity[Tipo]
    ):Promise<PetEntity[]> | PetEntity[];
}