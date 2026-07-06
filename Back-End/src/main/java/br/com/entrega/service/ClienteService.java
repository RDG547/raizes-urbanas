package br.com.entrega.service;

import br.com.entrega.dto.ClienteRequest;
import br.com.entrega.exception.ConflictException;
import br.com.entrega.exception.NotFoundException;
import br.com.entrega.exception.ValidationException;
import br.com.entrega.model.Cliente;
import br.com.entrega.repository.ClienteRepository;
import br.com.entrega.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;

    public ClienteService(ClienteRepository clienteRepository, PedidoRepository pedidoRepository) {
        this.clienteRepository = clienteRepository;
        this.pedidoRepository = pedidoRepository;
    }

    public Cliente criar(ClienteRequest request) {
        String nome = textoObrigatorio(request.nome(), "nome");
        String email = normalizarEmail(request.email());
        String telefone = textoOpcional(request.telefone());

        validarEmailDisponivel(email, null);

        Cliente cliente = new Cliente(nome, email, telefone);
        cliente.marcarCriacao();
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listar(String busca) {
        String filtro = busca == null ? "" : busca.trim().toLowerCase(Locale.ROOT);
        return clienteRepository.findAll().stream()
                .filter(cliente -> filtro.isBlank()
                        || cliente.getNome().toLowerCase(Locale.ROOT).contains(filtro)
                        || cliente.getEmail().toLowerCase(Locale.ROOT).contains(filtro))
                .sorted(Comparator.comparing(Cliente::getNome, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    public Cliente buscarPorId(String id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente nao encontrado."));
    }

    public Cliente atualizar(String id, ClienteRequest request) {
        Cliente cliente = buscarPorId(id);
        String nome = textoObrigatorio(request.nome(), "nome");
        String email = normalizarEmail(request.email());
        String telefone = textoOpcional(request.telefone());

        validarEmailDisponivel(email, id);

        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setTelefone(telefone);
        cliente.marcarAtualizacao();
        return clienteRepository.save(cliente);
    }

    public void remover(String id) {
        if (!clienteRepository.existsById(id)) {
            throw new NotFoundException("Cliente nao encontrado.");
        }
        if (pedidoRepository.existsByClienteId(id)) {
            throw new ConflictException("Cliente possui pedidos vinculados e nao pode ser removido.");
        }
        clienteRepository.deleteById(id);
    }

    private void validarEmailDisponivel(String email, String idAtual) {
        clienteRepository.findByEmail(email).ifPresent(cliente -> {
            if (idAtual == null || !cliente.getId().equals(idAtual)) {
                throw new ConflictException("Ja existe cliente cadastrado com este e-mail.");
            }
        });
    }

    private String textoObrigatorio(String valor, String campo) {
        if (valor == null || valor.isBlank()) {
            throw new ValidationException("Campo obrigatorio ausente ou invalido: " + campo + ".");
        }
        return valor.trim();
    }

    private String textoOpcional(String valor) {
        return valor == null ? "" : valor.trim();
    }

    private String normalizarEmail(String email) {
        String normalizado = textoObrigatorio(email, "email").toLowerCase(Locale.ROOT);
        if (!normalizado.contains("@") || !normalizado.contains(".")) {
            throw new ValidationException("E-mail invalido.");
        }
        return normalizado;
    }
}
