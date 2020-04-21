import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/modelo/responseApi.model';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { DialogService } from 'src/app/servicos/dialog.service';

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html'
})
export class ProdutoListarComponent implements OnInit {

  page:number = 0;
  count:number = 15;
  pages:Array<number>;
  menssage: {type: string, text: string};
  classCss: {};
  listaProdutos = [];

  constructor(
    private dialogService: DialogService,
    private produtoService: ProdutoService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.listar(this.page, this.count);
  }

  listar(page: number, count:number) {
    this.produtoService.listar(page, count).subscribe((responseApi: ResponseApi) => {
      this.listaProdutos = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['erros'][0]
      });
    });
  }

  editar(id:number) {
    this.router.navigate(['/produto-novo', id]);
  }

  apagar(id: number) {
    this.dialogService.confirm("Você quer deletar esse produto?")
    .then((podeApagar:boolean) =>{
      if(podeApagar) {
        this.produtoService.apagar(id).subscribe((responseApi: ResponseApi) =>{
          this.showMessage({
            type: 'success',
            text: 'Registro deletado.'
          });
          this.listar(this.page, this.count);
        }, err => {
          this.showMessage({
            type: 'error',
            text: err["error"]["erros"][0] != null ? err["error"]["erros"] : err["error"]
          });
        });
      }
    });
  }

  detalhar(id:string) {
    this.router.navigate(['/detalhar-produto',id]);
  }

  setNextPagina(event:any) {
    event.preventDefault(); // evitar reload na tela
    if(this.page+1 < this.pages.length) {
      this.page = this.page + 1;
      this.listar(this.page, this.count);
    }
  }

  setPreviousPagina(event:any) {
    event.preventDefault(); // evitar reload na tela
    if(this.page+1 < this.pages.length) {
      this.page = this.page - 1;
      this.listar(this.page, this.count);
    }
  }

  setPagina(i:number, event:any) {
    event.preventDefault(); // evitar reload na tela
      this.page = i;
      this.listar(this.page, this.count);
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
}
