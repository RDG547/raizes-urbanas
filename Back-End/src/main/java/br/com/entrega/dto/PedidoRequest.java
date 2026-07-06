package br.com.entrega.dto;

import java.util.List;

public record PedidoRequest(String clienteId, List<ItemPedidoRequest> itens) {
}
