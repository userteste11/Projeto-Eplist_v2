export interface Equipe{
    equipeID: string;
    nomeEquipe: string;
    unidade : {
        unidadeID: string,
        nome : string
    }
    usuarios ?: {
      usuarioID: string,
      nome: string,
      cargo: string,
      epis : {
        epiId: string;
        descricao: string;
      }[];
    }[];
}