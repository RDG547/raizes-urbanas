# Loja MVC MongoDB - Desenvolvimento BACK-END

Aplicacao web Java criada para a fase **Desenvolvimento de Sistemas com RUP e MVC**. O projeto evolui a Loja API da fase anterior para uma arquitetura com **Spring Boot**, **Spring MVC**, **Spring Data MongoDB** e CRUD persistente em banco MongoDB.

## Estudo de caso

O sistema representa uma loja virtual simplificada:

- `Cliente`: pessoa que realiza compras.
- `Produto`: item disponivel no catalogo.
- `Pedido`: entidade que relaciona um cliente a um ou mais produtos.

O relacionamento principal e: um cliente pode possuir varios pedidos, e cada pedido possui itens que referenciam produtos.

## Arquitetura MVC

- **Model**: `Cliente`, `Produto`, `Pedido`, `ItemPedido` e `StatusPedido`.
- **View**: respostas JSON da API HTTP.
- **Controller**: `ClienteController`, `ProdutoController` e `PedidoController`.
- **Service**: regras de negocio, validacoes, calculo de total e baixa de estoque.
- **Repository**: acesso ao MongoDB por Spring Data MongoDB.

## Requisitos

Opcao com ferramentas locais:

- JDK 21 ou superior
- MongoDB em execucao local

O projeto inclui **Maven Wrapper**, entao nao e necessario instalar Maven manualmente.

Opcao com Docker:

- Docker e Docker Compose

## Instalar dependencias na maquina

Em Manjaro/Arch Linux, instale Java, Maven, Docker e Docker Compose com:

```bash
sudo pacman -Syu
sudo pacman -S --needed jdk21-openjdk maven docker docker-compose curl
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```

Depois reinicie a sessao do usuario ou rode:

```bash
newgrp docker
```

Verifique as instalacoes:

```bash
java -version
mvn -version
docker --version
docker compose version
```

O Spring Boot nao e instalado globalmente: ele e baixado pelo Maven a partir das dependencias do `pom.xml`.

Para MongoDB, a forma recomendada neste projeto e Docker:

```bash
docker pull mongo:7
```

Instalacao global do MongoDB e opcional. Em Manjaro/Arch, normalmente e feita via AUR:

```bash
sudo pacman -S --needed base-devel git
yay -S mongodb-bin mongosh-bin
sudo systemctl enable --now mongodb
mongosh --version
```

Se nao tiver `yay`:

```bash
cd /tmp
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Subir o MongoDB

```bash
docker compose up -d mongo
```

O MongoDB ficara disponivel em:

```text
mongodb://localhost:27017/loja_mvc
```

## Executar com Maven Wrapper

```bash
./mvnw spring-boot:run
```

Depois acesse:

```text
http://localhost:8080/
```

## Executar usando Docker Compose

Use este comando caso a maquina nao tenha Maven instalado:

```bash
docker compose up app
```

## Rodar testes

```bash
./mvnw test
```

Ou com Maven via Docker:

```bash
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "$PWD":/workspace \
  -w /workspace \
  -v "$HOME/.m2":/tmp/.m2 \
  -e MAVEN_CONFIG=/tmp/.m2 \
  maven:3.9.9-eclipse-temurin-21 \
  mvn -Dmaven.repo.local=/tmp/.m2/repository test
```

## Ajuste no VS Code/IDE

Se o editor mostrar erros como `The import org.springframework cannot be resolved`, recarregue o projeto Java para ele ler o `pom.xml`:

```bash
./mvnw test
```

Depois, no VS Code, use o comando **Java: Clean Java Language Server Workspace** e reabra a pasta do projeto.

## Endpoints

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/` | Indice da API e camadas MVC |
| GET | `/api/clientes` | Lista clientes |
| GET | `/api/clientes/{id}` | Busca cliente por id |
| POST | `/api/clientes` | Cria cliente |
| PUT | `/api/clientes/{id}` | Atualiza cliente |
| DELETE | `/api/clientes/{id}` | Remove cliente |
| GET | `/api/produtos` | Lista produtos |
| GET | `/api/produtos/{id}` | Busca produto por id |
| POST | `/api/produtos` | Cria produto |
| PUT | `/api/produtos/{id}` | Atualiza produto |
| DELETE | `/api/produtos/{id}` | Remove produto |
| GET | `/api/pedidos` | Lista pedidos |
| GET | `/api/pedidos?clienteId={id}` | Lista pedidos de um cliente |
| GET | `/api/pedidos/{id}` | Busca pedido por id |
| POST | `/api/pedidos` | Cria pedido e baixa estoque |
| PUT | `/api/pedidos/{id}` | Atualiza status do pedido |
| DELETE | `/api/pedidos/{id}` | Remove pedido |

## Exemplos com curl

Criar cliente:

```bash
curl -s -X POST http://localhost:8080/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Souza","email":"ana@email.com","telefone":"11999990000"}'
```

Criar produto:

```bash
curl -s -X POST http://localhost:8080/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teclado","descricao":"Teclado mecanico","preco":250.00,"estoque":10}'
```

Criar pedido:

```bash
curl -s -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId":"COLE_AQUI_O_ID_DO_CLIENTE",
    "itens":[
      {"produtoId":"COLE_AQUI_O_ID_DO_PRODUTO","quantidade":2}
    ]
  }'
```

Atualizar status do pedido:

```bash
curl -s -X PUT http://localhost:8080/api/pedidos/COLE_AQUI_O_ID_DO_PEDIDO \
  -H "Content-Type: application/json" \
  -d '{"status":"PAGO"}'
```

## Arquivos importantes

- `pom.xml`: dependencias Spring Boot, Spring MVC e MongoDB.
- `mvnw` e `.mvn/wrapper`: Maven Wrapper para baixar dependencias sem Maven global.
- `docker-compose.yml`: MongoDB para desenvolvimento local.
- `RELATORIO.md`: relatorio academico da fase 2.
- `docs/diagrama-classes.png`: diagrama de classes.
- `docs/sequencia-criar-pedido.png`: diagrama de sequencia do fluxo de criacao de pedido.
- `docs/*.dot`: arquivos-fonte dos diagramas, mantidos para permitir ajustes futuros.
