package com.desafio.mv.internacional.produto.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.desafio.mv.internacional.produto.basica.Produto;
import com.desafio.mv.internacional.produto.controller.response.Response;

public interface ProdutoService {

	public ResponseEntity<Response<Produto>> salvar(Produto produto);
	
	public ResponseEntity<Response<Produto>> editar(Produto produto);
	
	public ResponseEntity<Response<Produto>> pesquisarPor(Integer id);
	
	public ResponseEntity<Response<Produto>> remover(Integer id);
	
	public ResponseEntity<Response<Page<List<Produto>>>> listar(int page, int count);

	public ResponseEntity<Response<Produto>> atualizarProdutos(Integer id, Double percentual);
	
	public ResponseEntity<Response<Produto>> atualizarProdutos(Double percentual);
}
