import { Usuario } from './../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe.model';
import { Unidade } from 'src/app/models/unidade.model';

@Component({
  selector: 'app-equipe-cadastrar',
  templateUrl: './equipe-cadastrar.component.html',
  styleUrls: ['./equipe-cadastrar.component.css']
})
export class EquipeCadastrarComponent {
  nomeEquipe!: string;
  unidadeID!: number;
  liderID!: number;
  unidades : Unidade[] = [];
  UsuarioLider: Usuario[]= [];
  constructor(private client: HttpClient, private router: Router) {}
  ngOnInit(): void {
    // Busque a lista de EPIS disponíveis
    this.client.get<Unidade[]>("https://localhost:7144/EpiList/Unidade/listar").subscribe((unidades: Unidade[]) => {
      //this.episDisponiveis = epis;
      this.unidades = unidades;
      // Inicialize a variável episSelecionados para cada EPI
    });

    this.client.get<Usuario[]>("https://localhost:7144/EpiList/Usuario/listar")
      .subscribe({
        //Requisição com sucesso
        next: (usuario) => {
          this.UsuarioLider = usuario.filter(usu => usu.cargo == "supervisor" && usu.equipe == null);
          console.table(usuario);
        }, 
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      })
  }
  cadastrarEquipe() {
    let esquema ={
        nomeEquipe: this.nomeEquipe,
        unidadeID: this.unidadeID,
        liderID: this.liderID
    };
    console.log(esquema)
    this.client.post<Equipe>("https://localhost:7144/EpiList/Equipe/cadastrar", esquema).subscribe({
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
