package br.com.entrega.service;

import br.com.entrega.dto.ProdutoRequest;
import br.com.entrega.exception.NotFoundException;
import br.com.entrega.exception.ValidationException;
import br.com.entrega.model.Produto;
import br.com.entrega.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto criar(ProdutoRequest request) {
        Produto produto = new Produto(
                textoObrigatorio(request.nome(), "nome"),
                textoObrigatorio(request.descricao(), "descricao"),
                precoValido(request.preco()),
                estoqueValido(request.estoque())
        );
        produto.marcarCriacao();
        return produtoRepository.save(produto);
    }

    public List<Produto> listar(String busca) {
        String filtro = busca == null ? "" : busca.trim().toLowerCase(Locale.ROOT);
        return produtoRepository.findAll().stream()
                .filter(produto -> filtro.isBlank()
                        || produto.getNome().toLowerCase(Locale.ROOT).contains(filtro)
                        || produto.getDescricao().toLowerCase(Locale.ROOT).contains(filtro))
                .sorted(Comparator.comparing(Produto::getNome, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    public Produto buscarPorId(String id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto nao encontrado."));
    }

    public Produto atualizar(String id, ProdutoRequest request) {
        Produto produto = buscarPorId(id);
        produto.setNome(textoObrigatorio(request.nome(), "nome"));
        produto.setDescricao(textoObrigatorio(request.descricao(), "descricao"));
        produto.setPreco(precoValido(request.preco()));
        produto.setEstoque(estoqueValido(request.estoque()));
        produto.marcarAtualizacao();
        return produtoRepository.save(produto);
    }

    public void remover(String id) {
        if (!produtoRepository.existsById(id)) {
            throw new NotFoundException("Produto nao encontrado.");
        }
        produtoRepository.deleteById(id);
    }

    private String textoObrigatorio(String valor, String campo) {
        if (valor == null || valor.isBlank()) {
            throw new ValidationException("Campo obrigatorio ausente ou invalido: " + campo + ".");
        }
        return valor.trim();
    }

    private BigDecimal precoValido(BigDecimal preco) {
        if (preco == null || preco.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ValidationException("Preco deve ser maior que zero.");
        }
        return preco.setScale(2, RoundingMode.HALF_UP);
    }

    private int estoqueValido(Integer estoque) {
        if (estoque == null || estoque < 0) {
            throw new ValidationException("Estoque nao pode ser negativo.");
        }
        return estoque;
    }
}
