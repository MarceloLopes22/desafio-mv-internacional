import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './componentes/home/home.component';

export const ROUTES: Routes = [
    
    {path: 'home', component: HomeComponent},
    /*{path: 'pessoa-lista', component: PessoaListarComponent},
    {path: 'pessoa-novo', component: PessoaNovoComponent},
    {path: 'pessoa-novo/:id', component: PessoaNovoComponent},
    {path: 'detalhar-pessoa/:id', component: PessoaDetalharComponent},*/
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);