# Raízes Urbanas — Fase 3

Projeto acadêmico da disciplina de Desenvolvimento Front-end, desenvolvido com HTML5, CSS3 e JavaScript. A página apresenta uma iniciativa de hortas comunitárias e integra interatividade, consulta de endereços, persistência de dados e otimizações de desempenho.

## Requisitos implementados

- Manipulação do DOM para temas visuais, tamanho de texto, conteúdo dos encontros, validação do formulário e atualização dos resultados de CEP.
- Consumo assíncrono de uma API externa com `fetch`, validação do CEP, limite de tempo e tratamento de erros.
- Persistência do histórico de consultas e das preferências do usuário no Local Storage.
- Lazy loading do conteúdo visual abaixo da dobra.
- Imagens otimizadas em WebP, com dimensões declaradas e prioridade adequada de carregamento.
- Arquivos CSS e JavaScript minificados para uso na página publicada.
- Estrutura semântica, layout responsivo e recursos de acessibilidade.

## Consulta de CEP

A implementação utiliza o ViaCEP e exibe logradouro, bairro, cidade, unidade federativa e CEP. As cinco consultas mais recentes ficam disponíveis no navegador e podem ser reabertas sem uma nova requisição.

## Estrutura do projeto

- `index.html`: estrutura semântica e conteúdo da página.
- `styles.css`: estilos legíveis para desenvolvimento.
- `styles.min.css`: versão minificada carregada pela página.
- `script.js`: comportamentos, validações, consumo da API e persistência.
- `script.min.js`: versão minificada carregada pela página.
- `assets/`: imagens originais e versões otimizadas.
- `relatorio.md`: relatório acadêmico da Fase 3.

## Execução local

O projeto não exige instalação de dependências. Para que a consulta externa funcione nas mesmas condições da publicação, sirva a pasta por HTTP e abra o endereço informado pelo servidor. Um exemplo é:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Links

- [Página publicada](https://rdg547.github.io/raizes-urbanas/)
- [Repositório](https://github.com/RDG547/raizes-urbanas)
