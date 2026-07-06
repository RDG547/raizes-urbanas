package br.com.entrega.service;

import br.com.entrega.dto.ItemPedidoRequest;
import br.com.entrega.dto.PedidoRequest;
import br.com.entrega.dto.PedidoStatusRequest;
import br.com.entrega.exception.ConflictException;
import br.com.entrega.exception.NotFoundException;
import br.com.entrega.exception.ValidationException;
import br.com.entrega.model.ItemPedido;
import br.com.entrega.model.Pedido;
import br.com.entrega.model.Produto;
import br.com.entrega.model.StatusPedido;
import br.com.entrega.repository.ClienteRepository;
import br.com.entrega.repository.PedidoRepository;
import br.com.entrega.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository, ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
    }

    public Pedido criar(PedidoRequest request) {
        String clienteId = textoObrigatorio(request.clienteId(), "clienteId");
        if (!clienteRepository.existsById(clienteId)) {
            throw new NotFoundException("Cliente nao encontrado.");
        }

        Map<String, Integer> quantidades = consolidarItens(request.itens());
        List<ItemPedido> itens = new ArrayList<>();
        List<Produto> produtosAtualizados = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (Map.Entry<String, Integer> entry : quantidades.entrySet()) {
            Produto produto = produtoRepository.findById(entry.getKey())
                    .orElseThrow(() -> new NotFoundException("Produto nao encontrado: " + entry.getKey() + "."));
            int quantidade = entry.getValue();
            if (!produto.possuiEstoque(quantidade)) {
                throw new ConflictException("Estoque insuficiente para o produto: " + produto.getNome() + ".");
            }

            BigDecimal subtotal = produto.getPreco()
                    .multiply(BigDecimal.valueOf(quantidade))
                    .setScale(2, RoundingMode.HALF_UP);
            itens.add(new ItemPedido(produto.getId(), produto.getNome(), quantidade, produto.getPreco(), subtotal));
            total = total.add(subtotal);

            produto.baixarEstoque(quantidade);
            produtosAtualizados.add(produto);
        }

        produtoRepository.saveAll(produtosAtualizados);

        Pedido pedido = new Pedido(clienteId);
        pedido.definirItens(itens, total.setScale(2, RoundingMode.HALF_UP));
        pedido.marcarCriacao();
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listar(String clienteId) {
        List<Pedido> pedidos = clienteId == null || clienteId.isBlank()
                ? pedidoRepository.findAll()
                : pedidoRepository.findByClienteId(clienteId.trim());
        return pedidos.stream()
                .sorted(Comparator.comparing(Pedido::getCriadoEm).reversed())
                .toList();
    }

    public Pedido buscarPorId(String id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pedido nao encontrado."));
    }

    public Pedido atualizarStatus(String id, PedidoStatusRequest request) {
        StatusPedido status = request.status();
        if (status == null) {
            throw new ValidationException("Status do pedido e obrigatorio.");
        }

        Pedido pedido = buscarPorId(id);
        pedido.setStatus(status);
        pedido.marcarAtualizacao();
        return pedidoRepository.save(pedido);
    }

    public void remover(String id) {
        if (!pedidoRepository.existsById(id)) {
            throw new NotFoundException("Pedido nao encontrado.");
        }
        pedidoRepository.deleteById(id);
    }

    private Map<String, Integer> consolidarItens(List<ItemPedidoRequest> itens) {
        if (itens == null || itens.isEmpty()) {
            throw new ValidationException("Pedido deve possuir ao menos um item.");
        }

        Map<String, Integer> quantidades = new LinkedHashMap<>();
        for (ItemPedidoRequest item : itens) {
            String produtoId = textoObrigatorio(item.produtoId(), "produtoId");
            Integer quantidade = item.quantidade();
            if (quantidade == null || quantidade <= 0) {
                throw new ValidationException("Quantidade deve ser maior que zero.");
            }
            quantidades.merge(produtoId, quantidade, Integer::sum);
        }
        return quantidades;
    }

    private String textoObrigatorio(String valor, String campo) {
        if (valor == null || valor.isBlank()) {
            throw new ValidationException("Campo obrigatorio ausente ou invalido: " + campo + ".");
        }
        return valor.trim();
    }
}
