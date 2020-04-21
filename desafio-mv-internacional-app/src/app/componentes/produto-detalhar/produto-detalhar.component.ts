import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/modelo/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from 'src/app/modelo/responseApi.model';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-produto-detalhar',
  templateUrl: './produto-detalhar.component.html'
})
export class ProdutoDetalharComponent implements OnInit {

  produto = new Produto(null,"","",null);
  menssage: {type: string, text: string};
  classCss: {};

  constructor(private produtoService: ProdutoService,
              private route: ActivatedRoute,
              private router: Router
    ) {
   }

  ngOnInit(): void {
    let id:number = this.route.snapshot.params['id'];
    if(id != undefined) {
      this.produtoService.pesquisar(id).subscribe((responseApi:ResponseApi) =>{
        this.produto = responseApi.data;
      }, err =>{
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    }
  }

  private showMessage(message: {type: string, text: string}) : void {
    this.menssage = message;
    this.buildClasses(message.type);
    setTimeout(()=>{
      this.menssage = undefined;
    }, 3000);
  }

  private buildClasses(type: string) : void {
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

  voltar(){
    this.router.navigate(['/produto-lista']);
  }

}
