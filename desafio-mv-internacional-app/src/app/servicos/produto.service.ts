import { AtributoDto } from './../modelo/atributoDto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../modelo/produto.model';
import { PRODUTO_API } from './produto.api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  salvarOrAtualizar(produto: Produto) {
    if(produto.id != null && produto.id > 0) {
      return this.http.put(`${PRODUTO_API}/api/produto/editar`, produto);
    }
    return this.http.post(`${PRODUTO_API}/api/produto/salvar`, produto);
  }

  listar(page:number, count: number) {
    return this.http.get(`${PRODUTO_API}/api/produto/listar/${page}/${count}`);
  }

  pesquisar(id:number) {
    return this.http.get(`${PRODUTO_API}/api/produto/pesquisar/${id}`);
  }
  
  apagar(id:number) {
    return this.http.delete(`${PRODUTO_API}/api/produto/remover/${id}`);
  }
  
  atualizarProdutos(atributoDto:AtributoDto) {
    return this.http.put(`${PRODUTO_API}/api/produto/atualizarProdutos/`, atributoDto);
  }
  
  atualizarValorProduto(atributoDto:AtributoDto) {
    return this.http.put(`${PRODUTO_API}/api/produto/atualizarProduto/`,atributoDto);
  }
}
