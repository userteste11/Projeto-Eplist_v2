import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario-deletar',
  templateUrl: './usuario-deletar.component.html',
  styleUrls: ['./usuario-deletar.component.css']
})
export class UsuarioDeletarComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute,private router: Router) { }
  //id!: string;
  id = this.route.snapshot.params['id']; // Obtém o ID do Usuario da rota
  usuario: any;
  ngOnInit(): void{
    this.client.get<Usuario>("https://localhost:7144/EpiList/Usuario/"+this.id)
    .subscribe({
      next: (usu) => {
        console.log(usu);
        this.usuario=usu;
      }, 
      error: (erro) => {
        console.log(erro);
      }
    })
  }
  
  deletarUsuario() {

    this.client.delete<string>("https://localhost:7144/EpiList/Usuario/Deletar/" + this.id)
      .subscribe({
        // Requisição com sucesso
        next: (e) => {
          console.log(e);
          // Realize qualquer outra ação após a exclusão, se necessário
          this.router.navigate(['pages/Usuario/listar']);
        },
        // Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      });
  }
  cancelar(){
    this.router.navigate(['pages/Usuario/listar']);
  }



  removerEpi(epiId: number) {
    const epiIds = [epiId];
  
    this.client.put<string>("https://localhost:7144/EpiList/Usuario/" + this.id + "/RemoverEPIs", epiIds)
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
      this.router.navigate(['pages/Usuario/listar']);
  }
  
}
