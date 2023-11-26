import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Epi } from 'src/app/models/epi.model';

@Component({
  selector: 'app-epi-atualizar',
  templateUrl: './epi-atualizar.component.html',
  styleUrls: ['./epi-atualizar.component.css']
})
export class EpiAtualizarComponent {
  epiID!: number;
  epiForm: FormGroup; // Formulário reativo
  constructor(private client: HttpClient,private router: Router, private route: ActivatedRoute, private fb: FormBuilder) 
  {
    this.epiForm = this.fb.group({
      descricao: [''], // Defina os campos do formulário
      c_A: [''],
      quantidade: ['']
    });
  }
  
  ngOnInit(): void{
    this.epiID = this.route.snapshot.params['id'];
    this.client.get<Epi>("https://localhost:7144/EpiList/EPI/"+this.epiID)
    .subscribe({
      next: (epi) => {
        this.epiForm.patchValue({
          descricao: epi.descricao,
          c_A: epi.c_A,
          quantidade: epi.quantidade
        });
      }, 
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  salvarEdicao(){
    const dadosEditados = this.epiForm.value;
    console.log(dadosEditados);
    this.client.put<Epi>("https://localhost:7144/EpiList/EPI/Atualizar/"+this.epiID, dadosEditados).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['pages/Epi/listar']);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  cancelarEdicao(){
    this.router.navigate(['pages/Epi/listar']);
  }

}
