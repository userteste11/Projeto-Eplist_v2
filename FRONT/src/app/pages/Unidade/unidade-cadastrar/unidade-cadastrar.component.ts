import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-unidade-cadastrar',
  templateUrl: './unidade-cadastrar.component.html',
  styleUrls: ['./unidade-cadastrar.component.css']
})
export class UnidadeCadastrarComponent {

  unidadeNome?: string;
  gestorSelecionado?: number;
  tecnicoSelecionado?: number;
  //usuarios: Usuario[]=[]; // Suponha que você tenha uma lista de usuários aqui
  usuariosgestor: Usuario[]=[]; // Suponha que você tenha uma lista de usuários aqui
  usuariostecnico: Usuario[]=[]; // Suponha que você tenha uma lista de usuários aqui



  constructor(private client: HttpClient,private router: Router) {}

  ngOnInit() {
    this.client.get<Usuario[]>("https://localhost:7144/EpiList/Usuario/listar").subscribe({
      next: (data) => {
        //this.usuarios = data;
        this.usuariosgestor = data.filter(dado => dado.cargo == "gestor")
        this.usuariostecnico = data.filter(dado => dado.cargo == "tecnico")
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  cadastrarUnidade() {
    let esquema ={
       nome : this.unidadeNome,
       usuariosId: [this.gestorSelecionado, this.tecnicoSelecionado]
    };
    console.log(esquema)
    this.client.post<Unidade>("https://localhost:7144/EpiList/Unidade/cadastrar", esquema).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Epi/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });

  }


}

