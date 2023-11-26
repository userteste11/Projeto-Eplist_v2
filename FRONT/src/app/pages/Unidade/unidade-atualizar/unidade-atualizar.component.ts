import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Unidade } from "src/app/models/unidade.model";
import { Usuario } from "src/app/models/usuario.model";

@Component({
  selector: "app-unidade-atualizar",
  templateUrl: "./unidade-atualizar.component.html",
  styleUrls: ["./unidade-atualizar.component.css"],
})
export class UnidadeAtualizarComponent {
  unidadeId = this.route.snapshot.params["id"];
  unidadeForm: FormGroup;

  usuarioSelecionado?: number;
  usuariosdisponiveis: Usuario[] = []; // Suponha que você tenha uma lista de usuários aqui


  constructor(
    private client: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.unidadeForm = this.fb.group({
      nome: [""],
    });
  }
  ngOnInit(): void {
    this.client
      .get<Unidade>("https://localhost:7144/EpiList/Unidade/" + this.unidadeId)
      .subscribe({
        next: (usu) => {
          console.table(usu);
          this.unidadeForm.patchValue({
            nome: usu.nome,
          });
          const tiposUsuariosNaUnidade = usu.usuarios.map(
            (usuario) => usuario.cargo
          );
          console.log(tiposUsuariosNaUnidade);
          if (
            tiposUsuariosNaUnidade.includes("gestor") &&
            tiposUsuariosNaUnidade.includes("tecnico")
          ) {
          } else {
            this.client
              .get<Usuario[]>("https://localhost:7144/EpiList/Usuario/listar")
              .subscribe({
                next: (data) => {
                  if (tiposUsuariosNaUnidade.includes("gestor")) {
                    // Usuário gestor já está na unidade, não é necessário adicioná-lo à lista de disponíveis
                    this.usuariosdisponiveis = data.filter(
                      (dado) => dado.cargo == "tecnico"
                    );
                  } else if (tiposUsuariosNaUnidade.includes("tecnico")) {
                    // Adicionar gestores disponíveis
                    this.usuariosdisponiveis = data.filter(
                      (dado) => dado.cargo == "gestor"
                    );
                  } else {
                    this.usuariosdisponiveis = data.filter(
                      (dado) =>
                        dado.cargo == "tecnico" || dado.cargo == "gestor"
                    );
                  }
                },
                error: (erro) => {
                  console.log(erro);
                },
              });
          }
        },
        error: (erro) => {
          console.log(erro);
        },
      });
      
  }
  salvarEdicao() {
    const dadosEditados = this.unidadeForm.value;
    console.log(dadosEditados);
    this.client
      .put<Unidade>(
        "https://localhost:7144/EpiList/Unidade/" +
          this.unidadeId +
          "/Atualizar",
        dadosEditados
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(["pages/Unidade/listar"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
    this.router.navigate(["pages/Unidade/listar"]);
  }
  adicionarUsuario(){
    if(this.usuarioSelecionado != null){
      //EpiList/Unidade/AdicionarUsuario/1/3
      this.client
      .put<Unidade>(
        "https://localhost:7144/EpiList/Unidade/AdicionarUsuario/" +
          this.unidadeId +
          "/"+this.usuarioSelecionado, this.usuarioSelecionado 
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(["pages/Usuario/listar"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
    this.router.navigate(["pages/Usuario/listar"]);

    }
  }
  cancelarEdicao(){
    this.router.navigate(['pages/Unidade/listar']);
  }
}
