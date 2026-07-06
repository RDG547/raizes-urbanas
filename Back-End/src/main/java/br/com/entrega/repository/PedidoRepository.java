package br.com.entrega.repository;

import br.com.entrega.model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByClienteId(String clienteId);

    boolean existsByClienteId(String clienteId);
}
