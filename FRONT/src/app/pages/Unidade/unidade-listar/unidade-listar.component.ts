import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Unidade } from 'src/app/models/unidade.model';

@Component({
  selector: 'app-unidade-listar',
  templateUrl: './unidade-listar.component.html',
  styleUrls: ['./unidade-listar.component.css']
})
export class UnidadeListarComponent {
  unidades: Unidade[] = [];
  
  constructor(private client: HttpClient,private router: Router){ 

  }
  ngOnInit() : void{
    console.log("O componente foi carregado!");

    this.client.get<Unidade[]>("https://localhost:7144/EpiList/Unidade/listar")
      .subscribe({
        //Requisição com sucesso
        next: (unidade) => {
          this.unidades = unidade;
          console.table(unidade);
        }, 
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      })
  }
  editarUnidade(unidadeID: string) {
    this.router.navigate(['Unidade/editar', unidadeID]);

  }

  deletarUnidade(unidadeID: string) {

    this.router.navigate(['Unidade/deletar', unidadeID]);

  }

}
