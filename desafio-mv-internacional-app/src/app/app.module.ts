import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { routes } from './app.routes';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ProdutoListarComponent } from './componentes/produto-listar/produto-listar.component';
import { ProdutoService } from './servicos/produto.service';
import { DialogService } from './servicos/dialog.service';
import { ProdutoDetalharComponent } from './componentes/produto-detalhar/produto-detalhar.component';
import { ProdutoNovoComponent } from './componentes/produto-novo/produto-novo.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    ProdutoListarComponent,
    ProdutoDetalharComponent,
    ProdutoNovoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routes,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ProdutoService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
