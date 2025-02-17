import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './componentes/home/home.component';
import { ProdutoListarComponent } from './componentes/produto-listar/produto-listar.component';
import { ProdutoDetalharComponent } from './componentes/produto-detalhar/produto-detalhar.component';
import { ProdutoNovoComponent } from './componentes/produto-novo/produto-novo.component';
import { AtualizarValorProdutoComponent } from './componentes/atualizar-valor-produto/atualizar-valor-produto.component';

export const ROUTES: Routes = [
    
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'produto-lista', component: ProdutoListarComponent},
    {path: 'produto-novo', component: ProdutoNovoComponent},
    {path: 'produto-novo/:id', component: ProdutoNovoComponent},
    {path: 'detalhar-produto/:id', component: ProdutoDetalharComponent},
    {path: 'atualizar-valor-produto/:id', component: AtualizarValorProdutoComponent},
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);