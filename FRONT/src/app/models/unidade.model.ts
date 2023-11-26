import { Equipe } from "./equipe.model";

export interface Unidade{
    unidadeID: string;
    nome?: string;
    equipes: 
        {
            EquipeID: string;
            NomeEquipe: string;
        }[];
    usuarios:
        {
          usuarioID: string;
          nomeUsuario: string;
          email: string;
          telefone: string;
          cpf: string;
          cargo: string;
        }[];
}