import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Epi } from 'src/app/models/epi.model';

@Component({
  selector: 'app-epi-listar',
  templateUrl: './epi-listar.component.html',
  styleUrls: ['./epi-listar.component.css']
})
export class EpiListarComponent {

  epi : Epi[] = [];

  constructor(private client: HttpClient,private router: Router){ 
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  }

  ngOnInit() : void{
    console.log("O componente foi carregado!");

    this.client.get<Epi[]>("https://localhost:7144/EpiList/EPI/listar")
      .subscribe({
        //Requisição com sucesso
        next: (epi) => {
          this.epi = epi;
          console.table(epi);
        }, 
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      })
  }
  editarEpi(epiID?: string) {
    this.router.navigate(['epi/editar', epiID]);

  }

  deletarEpi(epiID?: string) {

    this.router.navigate(['epi/deletar', epiID]);

  }
}
