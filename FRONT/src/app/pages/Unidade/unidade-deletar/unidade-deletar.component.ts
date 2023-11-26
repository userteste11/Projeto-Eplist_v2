import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidade } from 'src/app/models/unidade.model';

@Component({
  selector: 'app-unidade-deletar',
  templateUrl: './unidade-deletar.component.html',
  styleUrls: ['./unidade-deletar.component.css']
})
export class UnidadeDeletarComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute,private router: Router) { }

  id = this.route.snapshot.params['id'];
  unidade: any;

  ngOnInit(): void{
    this.client.get<Unidade>("https://localhost:7144/EpiList/Unidade/"+this.id)
    .subscribe({
      next: (usu) => {
        console.log(usu);
        this.unidade=usu;
      }, 
      error: (erro) => {
        console.log(erro);
      }
    })
  }
  deletarUnidade() {

    this.client.delete<string>("https://localhost:7144/EpiList/Unidade/DeletarUnidade/" + this.id)
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
  removerUsuario(usuarioId: number) {
    //const usuarioIds = [usuarioId];
  
    this.client.delete<string>("https://localhost:7144/EpiList/Unidade/DeletarUsuario/" + this.id + "/"+ usuarioId)
      .subscribe({
        // Requisição com sucesso
        next: (e) => {
          console.log(e);
        },
        // Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      });
      this.router.navigate(['pages/Epi/listar']);
  }
}
