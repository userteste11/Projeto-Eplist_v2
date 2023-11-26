import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpiListarComponent } from './pages/Epi/epi-listar/epi-listar.component';
import { EpiCadastrarComponent } from './pages/Epi/epi-cadastrar/epi-cadastrar.component';
import { EpiDeletarComponent } from './pages/Epi/epi-deletar/epi-deletar.component';
import { EpiAtualizarComponent } from './pages/Epi/epi-atualizar/epi-atualizar.component';
import { UsuarioListarComponent } from './pages/Usuario/usuario-listar/usuario-listar/usuario-listar.component';
import { UsuarioCadastrarComponent } from './pages/Usuario/usuario-cadastrar/usuario-cadastrar/usuario-cadastrar.component';
import { UsuarioDeletarComponent } from './pages/Usuario/usuario-deletar/usuario-deletar/usuario-deletar.component';
import { UsuarioAtualizarComponent } from './pages/Usuario/usuario-atualizar/usuario-atualizar/usuario-atualizar.component';
import { UnidadeListarComponent } from './pages/Unidade/unidade-listar/unidade-listar.component';
import { UnidadeCadastrarComponent } from './pages/Unidade/unidade-cadastrar/unidade-cadastrar.component';
import { UnidadeDeletarComponent } from './pages/Unidade/unidade-deletar/unidade-deletar.component';
import { UnidadeAtualizarComponent } from './pages/Unidade/unidade-atualizar/unidade-atualizar.component';
import { EquipeListarComponent } from './pages/Equipe/equipe-listar/equipe-listar.component';
import { EquipeCadastrarComponent } from './pages/Equipe/equipe-cadastrar/equipe-cadastrar.component';
import { EquipeDeletarComponent } from './pages/Equipe/equipe-deletar/equipe-deletar.component';
import { EquipeAtualizarComponent } from './pages/Equipe/equipe-atualizar/equipe-atualizar.component';

const routes: Routes = [
  {
    path : "",
    component : EpiListarComponent
  },
  {
    path : "pages/Epi/listar",
    component : EpiListarComponent
  },
  {
    path : "pages/Epi/cadastrar",
    component : EpiCadastrarComponent
  },
  { 
    path: 'epi/deletar/:id',
    component: EpiDeletarComponent
   },
  { 
    path: 'epi/editar/:id',
    component: EpiAtualizarComponent
   },
  {
    path : "pages/Usuario/listar",
    component : UsuarioListarComponent
  },
  {
    path : "pages/Usuario/cadastrar",
    component : UsuarioCadastrarComponent
  },
  { 
    path: 'Usuario/deletar/:id',
    component: UsuarioDeletarComponent
   },
  { 
    path: 'Usuario/editar/:id',
    component: UsuarioAtualizarComponent
   },
  { 
    path: 'pages/Unidade/listar',
    component: UnidadeListarComponent
   },
  { 
    path: 'pages/Unidade/cadastrar',
    component: UnidadeCadastrarComponent
   },
  { 
    path: 'Unidade/deletar/:id',
    component: UnidadeDeletarComponent
   },
  { 
    path: 'Unidade/editar/:id',
    component: UnidadeAtualizarComponent
   },
  { 
    path: 'pages/Equipe/listar',
    component: EquipeListarComponent
   },
  { 
    path: 'pages/Equipe/cadastrar',
    component: EquipeCadastrarComponent
   },
  { 
    path: 'Equipe/deletar/:id',
    component: EquipeDeletarComponent
   },
  { 
    path: 'Equipe/editar/:id',
    component: EquipeAtualizarComponent
   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
