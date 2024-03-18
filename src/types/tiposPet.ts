import PetEntity from "../entities/PetEntity";





// omite campos, nesse caso irá esconder o id
type TipoRequestBodyPet = Omit<PetEntity,"id">;

type TipoRequestParamsPet = {
    id?:string,
    pet_id?:string,
    adotante_id?:string,
};

// seleciona apenas alguns campos, nesse caso irá pegar apenas os campos id, nome e celular
type TipoResponseBodyPet = {

    data?:  | Pick<PetEntity,"id" | "nome" | "porte" | "especie">
            | Pick<PetEntity,"id" | "nome" | "porte" | "especie">[];

    error?: unknown;
};  

export {
    TipoRequestBodyPet,
    TipoResponseBodyPet,
    TipoRequestParamsPet
};