import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";


    // o decorator eager lista todos os relacionamentos de adotante com endereco sem precisar 
    // fazer uma pesquisa direta
    
    // o decorator cascade, faz com que alterações em adotanteEntity alterem em enderecoEntity assim como
    // vise e versa.

    // o joinColumn indica que o campo referido é de outra tabela
    
@Entity()
export default class AdotanteEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    senha: string;
    @Column()
    celular: string;

    @OneToMany(() => PetEntity, (pet) => pet.adotante)
    pets!: PetEntity[];

    @Column({nullable:true})
    foto?: string;

    @OneToOne(()=>EnderecoEntity,{nullable:true,cascade:true,eager:true})
    @JoinColumn()
    endereco?: EnderecoEntity;





    constructor (nome:string,senha:string,celular:string,foto?:string,endereco?:EnderecoEntity) {
        this.nome = nome;
        this.senha = senha;
        this.celular = celular;
        this.foto = foto;
        this.endereco = endereco;
    }
}