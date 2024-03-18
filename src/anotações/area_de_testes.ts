// npx tsc ./area_de_testes.ts
interface Pessoa {
    nome: string;
    idade: number;
    email: string;
  }
  
  type InfoPessoal = Pick<Pessoa, "nome" | "idade">;
  
  const info: InfoPessoal = { nome: "Bob", idade: 30 };
  