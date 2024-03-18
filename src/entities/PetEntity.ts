import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import EnumEspecie from '../enum/EnumEspecie';
import AdotanteEntity from "./AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

@Entity()
export default class PetEntity{
    // esse decorator faz do id a chave primaria que é gerada automaticamente
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    nome:string;
    @Column()
    especie:EnumEspecie;
    @Column()
    dataDeNascimento:Date;
    @Column()
    adotado:boolean;

    
    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!: AdotanteEntity;
      
    @Column({nullable:true})
    porte?: EnumPorte;

// construtor
    constructor(nome:string,especie:EnumEspecie,dataDeNascimento:Date,adotado:boolean,porte?:EnumPorte){
        this.nome = nome;
        this.especie = especie;
        this.dataDeNascimento = dataDeNascimento;
        this.adotado = adotado;
        this.porte = porte;
    }
}