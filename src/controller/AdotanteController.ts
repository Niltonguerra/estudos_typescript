import { Request, Response } from "express";
import AdoranteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../types/tiposAdotante";


export default class adotanteController {

  constructor(private repository:AdoranteRepository){}




  async criaAdotante(
    req: Request<TipoRequestParamsAdotante ,{},TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
    ) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;
  
      

      const novoAdotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco,
      );
  
      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).json({data:{id:novoAdotante.id,nome,celular,endereco}});
      
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  




  async listaAdotante ( req: Request<TipoRequestParamsAdotante ,{},TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
    ) {

    const listaDeAdotantes = await this.repository.listaAdotante();

    const data = listaDeAdotantes.map((adotante) =>{
      return{
        id:adotante.id,
        nome:adotante.nome,
        celular: adotante.celular,
        endereco:adotante.endereco!==null?adotante.endereco:undefined,
      }
    })
    return res.status(200).json ({data});
    }
    


    async atualizaAdotante ( req: Request<TipoRequestParamsAdotante ,{},TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
    ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );
  
    if (!success) {
      return res.status(404).json({error:{ message }});
    }
    return res.sendStatus(204);

    }




  async deletaAdotante ( req: Request<TipoRequestParamsAdotante ,{},TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
    ) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaAdotante(Number(id));

    if (!success) {
      return res.status(404).json({error:{message}} );
    }
    return res.sendStatus(204);
    }


    async atualizaEnderecoAdotante ( req: Request<TipoRequestParamsAdotante ,{},EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>
    ) {
      const { id } = req.params;
      
      const { success, message } = await this.repository.atualizaEnderecoAdotante(
        Number(id), 
        req.body as EnderecoEntity
      );
  
      if (!success) {
        return res.status(404).json({error:{message}} );
      }
      return res.sendStatus(204);
      }

}

