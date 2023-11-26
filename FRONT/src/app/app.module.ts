import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EpiListarComponent } from './pages/Epi/epi-listar/epi-listar.component';
import { EpiCadastrarComponent } from './pages/Epi/epi-cadastrar/epi-cadastrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EpiDeletarComponent } from './pages/Epi/epi-deletar/epi-deletar.component';
import { EpiAtualizarComponent } from './pages/Epi/epi-atualizar/epi-atualizar.component';
import { UsuarioListarComponent } from './pages/Usuario/usuario-listar/usuario-listar/usuario-listar.component';
import { UsuarioCadastrarComponent } from './pages/Usuario/usuario-cadastrar/usuario-cadastrar/usuario-cadastrar.component';
import { UsuarioDeletarComponent } from './pages/Usuario/usuario-deletar/usuario-deletar/usuario-deletar.component';
import { UsuarioAtualizarComponent } from './pages/Usuario/usuario-atualizar/usuario-atualizar/usuario-atualizar.component';
import { UnidadeListarComponent } from './pages/Unidade/unidade-listar/unidade-listar.component';
import { UnidadeCadastrarComponent } from './pages/Unidade/unidade-cadastrar/unidade-cadastrar.component';
import { UnidadeAtualizarComponent } from './pages/Unidade/unidade-atualizar/unidade-atualizar.component';
import { UnidadeDeletarComponent } from './pages/Unidade/unidade-deletar/unidade-deletar.component';
import { EquipeListarComponent } from './pages/Equipe/equipe-listar/equipe-listar.component';
import { EquipeCadastrarComponent } from './pages/Equipe/equipe-cadastrar/equipe-cadastrar.component';
import { EquipeDeletarComponent } from './pages/Equipe/equipe-deletar/equipe-deletar.component';
import { EquipeAtualizarComponent } from './pages/Equipe/equipe-atualizar/equipe-atualizar.component';


@NgModule({
  declarations: [
    AppComponent,
    EpiListarComponent,
    EpiCadastrarComponent,
    EpiDeletarComponent,
    EpiAtualizarComponent,
    UsuarioListarComponent,
    UsuarioCadastrarComponent,
    UsuarioDeletarComponent,
    UsuarioAtualizarComponent,
    UnidadeListarComponent,
    UnidadeCadastrarComponent,
    UnidadeAtualizarComponent,
    UnidadeDeletarComponent,
    EquipeListarComponent,
    EquipeCadastrarComponent,
    EquipeDeletarComponent,
    EquipeAtualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
