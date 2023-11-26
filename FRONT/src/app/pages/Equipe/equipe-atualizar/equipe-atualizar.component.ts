import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-equipe-atualizar',
  templateUrl: './equipe-atualizar.component.html',
  styleUrls: ['./equipe-atualizar.component.css']
})
export class EquipeAtualizarComponent {
  equipeId= this.route.snapshot.params['id'];
  equipeForm: FormGroup;
  usuarioDisponivel: Usuario[] = [];
  usuarioSelecionado?: number[]=[];
  constructor(private client: HttpClient,private router: Router, private route: ActivatedRoute, private fb: FormBuilder) 
  {
    this.equipeForm = this.fb.group({
      nomeEquipe: [''],
    });
  }
  ngOnInit(): void{

    this.client.get<Equipe>("https://localhost:7144/EpiList/equipe/"+this.equipeId)
    .subscribe({
      next: (usu) => {
        console.table(usu);
        
        this.equipeForm.patchValue({
          nomeEquipe: usu.nomeEquipe
        });
      }, 
      error: (erro) => {
        console.log(erro);
      }
    })
    this.client.get<Usuario[]>("https://localhost:7144/EpiList/Usuario/listar")
    .subscribe({
      //Requisição com sucesso
      next: (req) => {
        this.usuarioDisponivel = req.filter(usu => usu.equipe == null && usu.cargo == "colaborador");
        console.table(this.usuarioDisponivel);
      }, 
      //Requisição com erro
      error: (erro) => {
        console.log(erro);
      }
    })
 
  }
  salvarEdicao(){
    const dadosEditados = this.equipeForm.value;
    console.log(dadosEditados);
    this.client.put<Equipe>("https://localhost:7144/EpiList/equipe/"+this.equipeId+"/atualizar", dadosEditados).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Usuario/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
    this.router.navigate(['pages/Usuario/listar']);
  }




  adicionarUsuario(){
    let esquema=[
      this.usuarioSelecionado
    ]
    this.client.put<string>("https://localhost:7144/EpiList/equipe/adicionar-usuario/"+this.equipeId, esquema).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Epi/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
    this.router.navigate(['pages/Epi/listar']);
  }

}
