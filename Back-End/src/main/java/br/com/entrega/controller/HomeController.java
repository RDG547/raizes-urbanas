package br.com.entrega.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class HomeController {
    @GetMapping("/")
    public Map<String, Object> index() {
        return Map.of(
                "nome", "Loja MVC MongoDB",
                "descricao", "Aplicacao web Java com Spring MVC, MongoDB e CRUD de clientes, produtos e pedidos.",
                "camadasMvc", Map.of(
                        "model", List.of("Cliente", "Produto", "Pedido", "ItemPedido"),
                        "view", "Respostas JSON expostas pela API HTTP",
                        "controller", List.of("ClienteController", "ProdutoController", "PedidoController")
                ),
                "rotas", List.of("/api/clientes", "/api/produtos", "/api/pedidos")
        );
    }
}
