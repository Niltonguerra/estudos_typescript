import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../types/tiposAdotante";

import { NextFunction,Response,Request } from "express";



// aqui não foi feito a verificação do endereço, 
// pois o yup não trabalha muito bem com objeto dentro de outros objetos


// required quer dizer que o campo não poder ser undefined e nem nulo
  
// defined obriga apenas que o campo esteja presente independente de ele ser null ou não


const shemaBodyAdotante:yup.ObjectSchema<
    Omit <TipoRequestBodyAdotante, "endereco">
    > = yup.object ({

    nome: yup.string().defined().required(),
    celular: yup.string().defined().required().min(9),
    senha: yup.string().defined().required().min(6),
    foto: yup.string().optional(),
})


const middlewareValidadorBodyAdotante = async (req:Request,res:Response,next:NextFunction) => {

// aqui ele verifica se os dados estão sendo validados da forma correta,
// ou seja se os dados enviados então em um formato bom para serem guadados no sistema

// o abortEarly é usado para quando você quer que assim que o yup encontre um erro ele retorne 
// o erro encontrado. colocamos em false pois iremos mostrar todos os erros de uma vez e não um
// de cada vez

    try{
    
        await shemaBodyAdotante.validate(req.body, {
        abortEarly:false
    });
    return next();
    

    }catch(error){

        const yupErrors = error as yup.ValidationError;

        const validationErrors:Record<string,string> = {}

        yupErrors.inner.forEach((error)=>{
          if(!error.path)return;
          validationErrors[error.path] = error.message;
        });

        return res.status(400).json({error: validationErrors});

      }
}

export {middlewareValidadorBodyAdotante}