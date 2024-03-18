import AdotanteEntity from "../entities/AdotanteEntity";





// omite campos, nesse caso irá esconder o id
type TipoRequestBodyAdotante = Omit<AdotanteEntity,"id" | "pets">;

type TipoRequestParamsAdotante = {
    id?:string
};

// seleciona apenas alguns campos, nesse caso irá pegar apenas os campos id, nome e celular
type TipoResponseBodyAdotante = {

    data?:  | Pick<AdotanteEntity,"id" | "nome" | "celular" | "endereco">
            | Pick<AdotanteEntity,"id" | "nome" | "celular" | "endereco">[];

    error?: unknown;
};  

export {
    TipoRequestBodyAdotante,
    TipoResponseBodyAdotante,
    TipoRequestParamsAdotante
};