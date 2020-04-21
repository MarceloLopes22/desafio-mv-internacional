import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'src/app/modelo/produto.model';
import { NgForm }   from '@angular/forms';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from 'src/app/modelo/responseApi.model';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html'
})
export class ProdutoNovoComponent implements OnInit {

  @ViewChild("form", {static: true}) form: NgForm;

  produto = new Produto(null,"","",null);
  menssage: {type: string, text: string};
  erros = [];
  classCss: {}
  isEdicao:boolean = false;

  constructor(private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
    }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    if(id != undefined){
      this.pesquisar(id);
      this.isEdicao = true;
    }
  }

  salvar(){
    this.produtoService.salvarOrAtualizar(this.produto).subscribe((responseApi: ResponseApi) => {
      this.produto = responseApi.data;
      this.showMessage({
        type: 'success',
        text: responseApi.mensagemSucesso
      });
      setTimeout(()=>{
        this.router.navigate(['/produto-lista']);
      }, 3000);
      
    }, err =>{
      if(err["error"]["erros"][0] != null){
        this.erros = err["error"]["erros"];
      } else {
        this.erros = err["error"];
      }
      setTimeout(()=>{
        this.erros = [];
      }, 2000);
    });    
  }

  pesquisar(id: number) {
    this.produtoService.pesquisar(id).subscribe((responseApi: ResponseApi) =>{
      this.produto = responseApi.data;
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}) : void {
    this.menssage = message;
    this.buildClasses(message.type);
    setTimeout(()=>{
      this.menssage = undefined;
    }, 2000);
  }

  private buildClasses(type: string) : void {
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  voltar(){
    this.router.navigate(['/produto-lista']);
  }

}
