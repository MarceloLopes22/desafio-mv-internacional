import { AtributoDto } from './../../modelo/atributoDto.model';
import { SimNao } from './../../modelo/enums/simNao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/modelo/produto.model';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from 'src/app/modelo/responseApi.model';

@Component({
  selector: 'app-atualizar-valor-produto',
  templateUrl: './atualizar-valor-produto.component.html'
})
export class AtualizarValorProdutoComponent implements OnInit {

  @ViewChild("form", {static: true}) form: NgForm;

  atributo = new AtributoDto(null, null);
  produto = new Produto(null,"","",null);
  menssage: {type: string, text: string};
  erros = [];
  classCss: {}
  array = new Array<string>();
  simNao: SimNao;

  constructor(private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
    }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    if(id != undefined){
      this.pesquisar(id);
    }
    this.array = Object.values(SimNao);
    this.simNao = SimNao.SELECIONE;
  }

  atualizar() {
    if(this.atributo != null && this.simNao == SimNao.SIM) {
      this.produtoService.atualizarProdutos(this.atributo).subscribe((responseApi: ResponseApi) => {
        this.showMessage({
          type: 'success',
          text: responseApi.mensagemSucesso
        });
        setTimeout(()=>{
          this.voltar();
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
    } else {
      this.atributo.id = this.produto.id;
      this.produtoService.atualizarValorProduto(this.atributo).subscribe((responseApi: ResponseApi) => {
        this.showMessage({
          type: 'success',
          text: responseApi.mensagemSucesso
        });
        setTimeout(()=>{
          this.voltar();
        }, 3000);
      }, err => {
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
