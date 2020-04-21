package com.desafio.mv.internacional.produto.basica;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.SequenceGenerator;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;

@Entity
@Table(name = "produto")
@NamedStoredProcedureQuery(name = "atualizar_produtos", 
                           procedureName = "produto_package.atualizar_produtos",
                           parameters = {
                              @StoredProcedureParameter(mode = ParameterMode.IN, name = "val_percentual", type = Double.class)
                           })
@NamedStoredProcedureQuery(name = "atualizar_valor_produto", 
						   procedureName = "produto_package.atualizar_valor_produto", 
						   parameters = {
							  @StoredProcedureParameter(mode = ParameterMode.IN, name = "val_percentual", type = Double.class), 
							  @StoredProcedureParameter(mode = ParameterMode.IN, name = "produto_id", type = Integer.class) 
							})
public class Produto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="produto_seq")
	@SequenceGenerator(name="produto_seq", sequenceName="produto_seq", allocationSize=1, initialValue = 1)
	private Integer id;

	@Column(length = 100)
	private String nome;
	
	@Column(length = 100)
	private String descricao;
	
	private BigDecimal valor;

	public Produto() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
}
