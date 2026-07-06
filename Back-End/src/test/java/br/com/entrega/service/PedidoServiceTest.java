package br.com.entrega.service;

import br.com.entrega.dto.ItemPedidoRequest;
import br.com.entrega.dto.PedidoRequest;
import br.com.entrega.model.Pedido;
import br.com.entrega.model.Produto;
import br.com.entrega.repository.ClienteRepository;
import br.com.entrega.repository.PedidoRepository;
import br.com.entrega.repository.ProdutoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {
    @Mock
    private PedidoRepository pedidoRepository;
    @Mock
    private ClienteRepository clienteRepository;
    @Mock
    private ProdutoRepository produtoRepository;
    @InjectMocks
    private PedidoService pedidoService;

    @Test
    void deveCalcularTotalDoPedidoEAtualizarEstoque() {
        Produto produto = new Produto("Teclado", "Teclado mecanico", new BigDecimal("250.00"), 5);
        produto.setId("produto-1");

        when(clienteRepository.existsById("cliente-1")).thenReturn(true);
        when(produtoRepository.findById("produto-1")).thenReturn(Optional.of(produto));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Pedido pedido = pedidoService.criar(new PedidoRequest(
                "cliente-1",
                List.of(new ItemPedidoRequest("produto-1", 2))
        ));

        assertEquals(0, new BigDecimal("500.00").compareTo(pedido.getTotal()));
        assertEquals(3, produto.getEstoque());
    }
}
