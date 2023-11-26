import { Epi } from "./epi.model";
import { Equipe } from "./equipe.model";

export interface Usuario{
    usuarioID: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
    cargo: string;
    equipe?: Equipe;
    epis ?: {
        epiId: string;
        descricao: string;
    }[];
}


//equipe?: Equipe;