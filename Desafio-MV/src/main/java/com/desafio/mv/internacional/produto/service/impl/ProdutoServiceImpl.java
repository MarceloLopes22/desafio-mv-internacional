package com.desafio.mv.internacional.produto.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.desafio.mv.internacional.produto.basica.Produto;
import com.desafio.mv.internacional.produto.controller.response.Response;
import com.desafio.mv.internacional.produto.repositorio.ProdutoRepository;
import com.desafio.mv.internacional.produto.service.ProdutoService;

@Service
public class ProdutoServiceImpl implements ProdutoService {
	
	@Autowired
	private ProdutoRepository repositorio;

	@Override
	public ResponseEntity<Response<Produto>> salvar(Produto produto) {
		Response<Produto> response = new Response<Produto>();
		
		produto = repositorio.save(produto);
		
		response.setData(produto);
		response.setHttpStatus(HttpStatus.OK);
		response.setMensagemSucesso("Produto inserido com sucesso.");
		
		return new ResponseEntity<Response<Produto>>(response, HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<Response<Produto>> editar(Produto produto) {
		Response<Produto> response = new Response<Produto>();
		
		produto = repositorio.save(produto);
		
		response.setData(produto);
		response.setHttpStatus(HttpStatus.OK);
		response.setMensagemSucesso("Produto atualizado com sucesso.");
		
		return new ResponseEntity<Response<Produto>>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Response<Produto>> pesquisarPor(Integer id) {
		Response<Produto> response = new Response<Produto>();
		
		Optional<Produto> optional = repositorio.findById(id);
		
		if (optional == null || optional.isEmpty()) {
			response.setData(optional);
			response.getErros().add("Nenhum produto encontrado.");
			response.setHttpStatus(HttpStatus.OK);
			return new ResponseEntity<Response<Produto>>(response, response.getHttpStatus());
		}
		
		response.setData(optional.get());
		response.setHttpStatus(HttpStatus.OK);
		response.setMensagemSucesso("Produto encontrado com sucesso.");
		
		return new ResponseEntity<Response<Produto>>(response, response.getHttpStatus());
	}

	@Override
	public ResponseEntity<Response<Produto>> remover(Integer id) {
		ResponseEntity<Response<Produto>> pesquisarPor = pesquisarPor(id);
		
		Response<Produto> response = pesquisarPor.getBody();
		
		if (response != null && !response.getErros().isEmpty()) {
			return new ResponseEntity<Response<Produto>>(response, response.getHttpStatus());
		}
		
		if (response != null && response.getErros().isEmpty()) {
			Response<Produto> produto = pesquisarPor.getBody();
			Produto retorno = Produto.class.cast(produto.getData());
			repositorio.delete(retorno);
			response.setHttpStatus(HttpStatus.OK);
			response.setMensagemSucesso("Produto removido com sucesso.");
		}
		
		return new ResponseEntity<Response<Produto>>(response, response.getHttpStatus());
	}

	@Override
	public ResponseEntity<Response<Page<List<Produto>>>> listar(int page, int count) {
		Response<Page<List<Produto>>> response = new Response<Page<List<Produto>>>();
		PageRequest pageable = PageRequest.of(page, count);
		Page<Produto> all = repositorio.findAll(pageable);
		response.setData(all);
		response.setHttpStatus(HttpStatus.OK);
		return new ResponseEntity<Response<Page<List<Produto>>>>(response, response.getHttpStatus());
	}
}
