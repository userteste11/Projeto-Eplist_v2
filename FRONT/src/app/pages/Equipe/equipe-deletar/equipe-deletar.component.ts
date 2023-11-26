import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipe-deletar',
  templateUrl: './equipe-deletar.component.html',
  styleUrls: ['./equipe-deletar.component.css']
})
export class EquipeDeletarComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute,private router: Router) { }
  //id!: string;
  id = this.route.snapshot.params['id']; // Obtém o ID do Usuario da rota
  deletarEquipe() {

    this.client.delete<string>("https://localhost:7144/EpiList/equipe/"+this.id+"/deletar")
      .subscribe({
        // Requisição com sucesso
        next: (e) => {
          console.log(e);
          // Realize qualquer outra ação após a exclusão, se necessário
          this.router.navigate(['pages/Epi/listar']);
        },
        // Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      });
  }
  cancelar(){
    this.router.navigate(['pages/Epi/listar']);
  }


}
