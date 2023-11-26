import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Epi } from 'src/app/models/epi.model';

@Component({
  selector: 'app-epi-cadastrar',
  templateUrl: './epi-cadastrar.component.html',
  styleUrls: ['./epi-cadastrar.component.css']
})
export class EpiCadastrarComponent {
  constructor(private client: HttpClient,private router: Router) {}
  quantidade!: number;
  descricao!:string;
  c_a!:string;

  cancelar() {
    this.router.navigate(['/pages/Epi/listar']); 
  }
  
  cadastrar(): void {
    let epi : Epi={
      descricao : this.descricao,
      c_A: this.c_a,
      quantidade : this.quantidade
    };
    console.log(epi);
    this.client.post<Epi>("https://localhost:7144/EpiList/EPI/cadastrar", epi).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Epi/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }
}
