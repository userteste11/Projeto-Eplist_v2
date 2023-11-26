import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe.model';

@Component({
  selector: 'app-equipe-listar',
  templateUrl: './equipe-listar.component.html',
  styleUrls: ['./equipe-listar.component.css']
})
export class EquipeListarComponent {
  equipes : Equipe[]=[];
  constructor(private client: HttpClient,private router: Router){ 
  }
  ngOnInit() : void{
    console.log("O componente foi carregado!");

    this.client.get<Equipe[]>("https://localhost:7144/EpiList/equipe/listar-equipes")
      .subscribe({
        //Requisição com sucesso
        next: (equipe) => {
          this.equipes = equipe;
          console.table(equipe);
        }, 
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      })
  }
  editarEquipe(equipeId?: string) {
    this.router.navigate(['Equipe/editar', equipeId]);

  }

  deletarEquipe(equipeId?: string) {

    this.router.navigate(['Equipe/deletar', equipeId]);

  }
}
