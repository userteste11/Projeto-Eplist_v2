import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidade-deletar',
  templateUrl: './unidade-deletar.component.html',
  styleUrls: ['./unidade-deletar.component.css']
})
export class UnidadeDeletarComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute,private router: Router) { }

  deletarUnidade() {
    const id = this.route.snapshot.params['id']; // Obtém o ID da unidade da rota

    this.client.delete<string>("https://localhost:7144/EpiList/Unidade/DeletarUnidade/" + id)
      .subscribe({
        // Requisição com sucesso
        next: (e) => {
          console.log(e);
          // Realize qualquer outra ação após a exclusão, se necessário
        },
        // Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      });
      this.router.navigate(['pages/Epi/listar']);
  }
  cancelar(){
    this.router.navigate(['pages/Epi/listar']);
  }
}
