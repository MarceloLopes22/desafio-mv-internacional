package com.desafio.mv.internacional.produto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.desafio.mv.internacional.produto.basica.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
	
	@Procedure(name = "atualizar_produtos")
	void atualizarProdutos(@Param("val_percentual")Double percentual);

	@Procedure(name = "atualizar_valor_produto")
	void atualizarProdutos(@Param("produto_id")Integer id, @Param("val_percentual")Double percentual);

}
