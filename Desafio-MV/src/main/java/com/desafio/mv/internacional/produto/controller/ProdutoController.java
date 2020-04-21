package com.desafio.mv.internacional.produto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.mv.internacional.produto.basica.Produto;
import com.desafio.mv.internacional.produto.basica.dtos.AtributoDto;
import com.desafio.mv.internacional.produto.controller.response.Response;
import com.desafio.mv.internacional.produto.service.ProdutoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/produto/")
public class ProdutoController {

	@Autowired
	private ProdutoService service;
	
	@RequestMapping(value = "salvar", method = RequestMethod.POST)
	public ResponseEntity<Response<Produto>> salvar(@RequestBody Produto produto) {
		return this.service.salvar(produto);
	}

	@RequestMapping(value = "editar", method = RequestMethod.PUT)
	public ResponseEntity<Response<Produto>> editar(@RequestBody Produto produto) {
		return this.service.editar(produto);
	}
	
	@RequestMapping(value = "remover/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Response<Produto>> remover(@PathVariable(name = "id") Integer id) {
		return this.service.remover(id);
	}
	
	@GetMapping(value = "pesquisar/{id}")
	public ResponseEntity<Response<Produto>> pesquisar(@PathVariable(name = "id") Integer id) {
		return this.service.pesquisarPor(id);
	}
	
	@GetMapping(value = "listar/{page}/{count}")
	public ResponseEntity<Response<Page<List<Produto>>>> listar(@PathVariable(name = "page") int page,
			@PathVariable(name = "count") int count) {
		return this.service.listar(page, count);
	}

	@RequestMapping(value = "atualizarProdutos", method = RequestMethod.PUT)
	public ResponseEntity<Response<Produto>> atualizarProdutos(@RequestBody AtributoDto atributoDto) {
		return this.service.atualizarProdutos(atributoDto);
	}

	@RequestMapping(value = "atualizarProduto", method = RequestMethod.PUT)
	public ResponseEntity<Response<Produto>> atualizarProduto(@RequestBody AtributoDto atributoDto) {
		return this.service.atualizarProduto(atributoDto);
	}
}
