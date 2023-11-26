import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Epi } from 'src/app/models/epi.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario-atualizar',
  templateUrl: './usuario-atualizar.component.html',
  styleUrls: ['./usuario-atualizar.component.css']
})
export class UsuarioAtualizarComponent {
  usuarioId= this.route.snapshot.params['id'];
  episUsuario: Epi[] = []
  usuarioForm: FormGroup; // Formulário reativo
  episDisponivel: Epi[] = []



  constructor(private client: HttpClient,private router: Router, private route: ActivatedRoute, private fb: FormBuilder) 
  {
    this.usuarioForm = this.fb.group({
      nome: [''],
      email: [''],
      telefone: [''],
      cpf: [''],
      senha: [''],
      cargo: [''],
      equipeID: [0]
    });
  }
  ngOnInit(): void{

    this.client.get<Usuario>("https://localhost:7144/EpiList/Usuario/"+this.usuarioId)
    .subscribe({
      next: (usu) => {
        console.table(usu);
        
        this.usuarioForm.patchValue({
          nome: usu.nome,
          email: usu.email,
          telefone: usu.telefone,
          cpf: usu.cpf,
          senha: usu.senha,
          cargo: usu.cargo,
          equipeID: [usu.equipe]
        });
      }, 
      error: (erro) => {
        console.log(erro);
      }
    })
    this.client.get<Epi[]>("https://localhost:7144/EpiList/EPI/listar")
    .subscribe({
      //Requisição com sucesso
      next: (epi) => {
        this.episDisponivel=epi;
        console.table(epi);
      }, 
      //Requisição com erro
      error: (erro) => {
        console.log(erro);
      }
    })
 
  }

  salvarEdicao(){
    const dadosEditados = this.usuarioForm.value;
    console.log(dadosEditados);
    this.client.put<Usuario>("https://localhost:7144/EpiList/Usuario/"+this.usuarioId+"/Atualizar", dadosEditados).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Usuario/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }



  
  adicionarEpi(epiId: string | undefined): void {
    console.log(epiId+"aaa")

      const epiIds = [epiId];
      this.client.put<string>("https://localhost:7144/EpiList/Usuario/" + this.usuarioId + "/AdicionarEPIs", epiIds)
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

  
    



