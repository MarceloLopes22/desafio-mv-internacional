package com.desafio.mv.internacional.produto.basica.dtos;

import java.io.Serializable;

public class AtributoDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Integer id;
	
	private Double percentual;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getPercentual() {
		return percentual;
	}

	public void setPercentual(Double percentual) {
		this.percentual = percentual;
	}

}
