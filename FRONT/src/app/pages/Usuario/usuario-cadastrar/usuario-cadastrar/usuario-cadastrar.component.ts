import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Epi } from 'src/app/models/epi.model';

@Component({
  selector: 'app-usuario-cadastrar',
  templateUrl: './usuario-cadastrar.component.html',
  styleUrls: ['./usuario-cadastrar.component.css']
})

export class UsuarioCadastrarComponent {
  nome!: string;
  email!: string;
  telefone!: string;
  senha!: string;
  cpf!: string;
  cargo!: string;
  episSelecionados: { epiID: number, selecionado: boolean }[] = [];
  episDisponiveis: Epi[] = [];

  constructor(private client: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Busque a lista de EPIS disponíveis
    this.client.get<Epi[]>("https://localhost:7144/EpiList/EPI/listar").subscribe((epis: Epi[]) => {
      //this.episDisponiveis = epis;
      this.episDisponiveis = epis.filter(epi => (epi.quantidade ?? 0) > 1);
      // Inicialize a variável episSelecionados para cada EPI
      this.episSelecionados = epis.map((epi) => ({
        epiID: Number(epi.epiID), // Converte para número
        selecionado: false,
      }));
    });
  }
  

  cadastrar(): void {
    // Filtrar os EPIS selecionados
    const episSelecionadosIDs = this.episSelecionados
      .filter((epi) => epi.selecionado)
      .map((epi) => epi.epiID);

    const usuario = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha,
      cpf: this.cpf,
      cargo: this.cargo,
      episId: episSelecionadosIDs,
    };
    console.log(usuario);

    this.client.post<any>('https://localhost:7144/EpiList/Usuario/cadastrar', usuario).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Usuario/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }
  toggleEpiSelecionado(epiID: string | undefined) {
    // Certifique-se de que epiID seja um número
    const id = epiID ? parseInt(epiID, 10) : undefined;
  
    if (id !== undefined) {
      const index = this.episSelecionados.findIndex(e => e.epiID === id);
      if (index !== -1) {
        this.episSelecionados[index].selecionado = !this.episSelecionados[index].selecionado;
      }
    }
  }
  
  
  getEpiSelecionado(epiID: string | number | undefined): boolean {
    if (typeof epiID === 'number' || typeof epiID === 'string') {
      const id = typeof epiID === 'string' ? parseInt(epiID, 10) : epiID;
      const epi = this.episSelecionados.find(e => e.epiID === id);
      return epi ? epi.selecionado : false;
    } else {
      return false; // Ou outra lógica adequada caso epiID seja undefined
    }
  }
  
  
  
  
  
}

