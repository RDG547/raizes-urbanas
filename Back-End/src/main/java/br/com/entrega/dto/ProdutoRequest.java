package br.com.entrega.dto;

import java.math.BigDecimal;

public record ProdutoRequest(String nome, String descricao, BigDecimal preco, Integer estoque) {
}
