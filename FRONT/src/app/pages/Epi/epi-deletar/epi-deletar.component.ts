import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Epi } from 'src/app/models/epi.model';

@Component({
  selector: 'app-epi-deletar',
  templateUrl: './epi-deletar.component.html',
  styleUrls: ['./epi-deletar.component.css']
})
export class EpiDeletarComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute,private router: Router) { }

  deletarEpi() {
    const id = this.route.snapshot.params['id']; // Obtém o ID do EPI da rota

    this.client.delete<string>("https://localhost:7144/EpiList/EPI/Deletar/" + id)
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
