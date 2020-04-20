package com.desafio.mv.internacional.produto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.mv.internacional.produto.basica.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer>{
}
