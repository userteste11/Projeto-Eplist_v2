import { HttpClient } from '@angular/common/http';
import { Usuario } from './../../../../models/usuario.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent {

  usuario : Usuario[]=[];
  constructor(private client: HttpClient,private router: Router){ 

  }

  ngOnInit() : void{
    console.log("O componente foi carregado!");

    this.client.get<Usuario[]>("https://localhost:7144/EpiList/Usuario/listar")
      .subscribe({
        //Requisição com sucesso
        next: (usuario) => {
          this.usuario = usuario;
          console.table(usuario);
        }, 
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        }
      })
  }
  editarUsuario(usuarioId?: string) {
    this.router.navigate(['Usuario/editar', usuarioId]);

  }

  deletarUsuario(usuarioId?: string) {

    this.router.navigate(['Usuario/deletar', usuarioId]);

  }


}
