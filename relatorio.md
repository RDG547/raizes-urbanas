# Relatório de Desenvolvimento da Página Web

**Curso:** Análise e Desenvolvimento de Sistemas

**Projeto (disciplina):** Desenvolvimento front-end

**Nome do Aluno:** Rodrigo Tavares Vieira

**Data:** 29/08/26

**Nome do Projeto:** Raízes Urbanas

## 1. Introdução

O projeto **Raízes Urbanas** é uma página web dinâmica criada para apresentar uma iniciativa de hortas comunitárias urbanas. O objetivo da página é divulgar atividades, oferecer orientações de participação, permitir a personalização da interface e disponibilizar um formulário de inscrição para pessoas interessadas.

Na Fase 3, o projeto foi ampliado para integrar, em uma única solução, HTML5, CSS3 e JavaScript. Além das interações implementadas anteriormente, a página passou a consumir dados externos da API ViaCEP, exibir os resultados em tempo real e armazenar o histórico das consultas no Local Storage do navegador.

Também foram aplicadas técnicas de otimização de desempenho. As imagens receberam versões em formato WebP, um conteúdo visual abaixo da dobra utiliza lazy loading e os arquivos CSS e JavaScript usados pela página foram minificados. Dessa forma, a nova versão reúne manipulação do DOM, consumo de API, persistência local, responsividade, acessibilidade e otimização.

## 2. Estrutura da Página Web

A estrutura foi organizada nos arquivos principais `index.html`, `styles.css` e `script.js`. Para a versão carregada pelo navegador, também foram gerados `styles.min.css` e `script.min.js`, que mantêm o mesmo comportamento com um tamanho menor.

O arquivo `index.html` utiliza elementos semânticos como `header`, `nav`, `main`, `section`, `article`, `aside`, `form`, `figure` e `footer`. O cabeçalho oferece navegação interna para as áreas de conteúdo e um menu de personalização. A página possui seções sobre a iniciativa, atividades, boas práticas, interações, consulta de CEP e contato.

A seção de consulta contém um formulário com rótulo associado ao campo, teclado numérico sugerido em dispositivos móveis, padrão de validação, texto de ajuda e uma região de status com `aria-live`. O resultado é apresentado em uma lista de definições com logradouro, bairro, cidade, unidade federativa e CEP. Ao lado, um painel exibe o histórico persistente e uma imagem carregada sob demanda.

## 3. Manipulação do DOM

O JavaScript seleciona os elementos da página com `document.getElementById` e `document.querySelectorAll`. Os eventos são registrados com `addEventListener`, mantendo o comportamento separado da marcação HTML.

No menu Personalizar, os botões de tema alteram o atributo `data-theme` do `body`, atualizam as variáveis de cor definidas no CSS e modificam o texto explicativo da seção de interação. O controle deslizante muda a variável `--base-font-size`, enquanto o seletor de foco troca dinamicamente o texto e a data do próximo encontro.

O formulário de inscrição também reage às ações do usuário. A função de validação verifica nome, e-mail, área de interesse e autorização, adiciona ou remove classes de erro, atualiza o atributo `aria-invalid` e exibe mensagens específicas. Quando todos os dados estão válidos, o conteúdo da confirmação é criado com o primeiro nome informado.

Na consulta de CEP, o DOM é alterado para mostrar o estado de carregamento, bloquear temporariamente o botão, apresentar mensagens de sucesso ou erro e preencher os campos do endereço. O histórico é criado com `document.createElement`, `textContent`, `append` e `replaceChildren`. Cada item se transforma em um botão que recupera o endereço armazenado sem realizar outra requisição.

## 4. Consumo da API ViaCEP

O consumo dos dados foi implementado no arquivo `script.js` por meio de uma função assíncrona. Antes da requisição, o valor digitado é normalizado com uma expressão regular que remove caracteres não numéricos. O acesso ao serviço somente ocorre quando o resultado contém exatamente oito dígitos.

A requisição utiliza `fetch` no endereço `https://viacep.com.br/ws/{cep}/json/`. O código verifica `response.ok`, converte o corpo com `response.json()` e trata o campo `erro` devolvido pelo serviço quando um CEP de formato válido não existe.

Para melhorar a experiência do usuário, foi adicionado um `AbortController` com limite de oito segundos. A interface apresenta mensagens diferentes para CEP inexistente, tempo excedido e falha de conexão. O bloco `finally` sempre remove o estado de carregamento e restaura o texto do botão, independentemente do resultado.

Quando a resposta é válida, somente os campos necessários são normalizados antes da exibição e do armazenamento: `cep`, `logradouro`, `bairro`, `localidade` e `uf`. Essa seleção reduz o acoplamento da interface ao restante dos dados fornecidos pelo serviço.

## 5. Persistência de Dados com Local Storage

O Local Storage é usado para manter o histórico das cinco consultas mais recentes. Cada registro contém os campos do endereço e a data da consulta. Antes de salvar um novo item, o código remove uma ocorrência anterior do mesmo CEP, coloca o resultado no início da lista e limita o conjunto ao tamanho definido.

Ao carregar a página, os dados são lidos com `localStorage.getItem`, convertidos com `JSON.parse`, validados e apresentados no painel de histórico. Se o usuário consultar novamente um CEP já armazenado, a página recupera o objeto localmente e evita uma nova chamada à API.

As funções de leitura e escrita usam `try...catch` para que a página continue funcionando mesmo quando o armazenamento estiver indisponível ou contiver dados inválidos. O botão Limpar remove a chave do histórico, esvazia a lista e atualiza imediatamente a interface.

Além do histórico, o projeto persiste o tema visual, o tamanho de texto e o foco do encontro. Essas preferências são restauradas na próxima visita, demonstrando outra aplicação prática do armazenamento local.

## 6. Técnicas de Otimização

A imagem principal original em PNG possuía aproximadamente 2,6 MB. Foi gerada uma versão WebP com as mesmas dimensões e cerca de 251 KB, reduzindo significativamente a transferência. O elemento `picture` oferece o WebP aos navegadores compatíveis e mantém o PNG como alternativa.

A imagem complementar foi redimensionada para 720 por 480 pixels, convertida para WebP e inserida com `loading="lazy"` e `decoding="async"`. Assim, o navegador posterga o download desse conteúdo até que ele se aproxime da área visível. Os atributos `width` e `height` reservam o espaço necessário e ajudam a evitar mudanças inesperadas no layout.

Como a imagem principal aparece no início da página, ela não usa lazy loading. Em vez disso, foi priorizada com preload e `fetchpriority="high"`, evitando atrasar o maior elemento visual da primeira tela.

Os arquivos de produção `styles.min.css` e `script.min.js` foram gerados a partir dos arquivos-fonte. A minificação remove espaços e simplifica a representação do código, diminuindo o volume transferido sem prejudicar a versão legível mantida para manutenção.

## 7. Conclusão

Durante o desenvolvimento da Fase 3, foi possível consolidar a integração entre estrutura, apresentação, comportamento e dados externos. A atividade demonstrou como uma interface pode responder às ações do usuário, buscar informações em tempo real e preservar resultados entre diferentes acessos.

O uso da API ViaCEP permitiu praticar operações assíncronas, validação de entrada e tratamento de falhas. O Local Storage mostrou como manter dados úteis no próprio navegador e reduzir requisições repetidas. As técnicas de otimização reforçaram que o desempenho depende tanto do código quanto das escolhas de imagens e da ordem de carregamento dos recursos.

Esses conhecimentos podem ser aplicados em projetos futuros que utilizem catálogos, painéis, cadastros e consultas a serviços externos. A combinação de acessibilidade, responsividade, persistência e desempenho contribui para páginas mais eficientes e agradáveis em diferentes dispositivos e condições de conexão.

## 8. Anexos

Os arquivos HTML, CSS, JavaScript e imagens estão anexados para revisão:

- `index.html`
- `styles.css`
- `styles.min.css`
- `script.js`
- `script.min.js`
- `assets/horta-comunitaria.png`
- `assets/horta-comunitaria.webp`
- `assets/horta-detalhe.webp`

**Repositório:**

https://github.com/RDG547/raizes-urbanas

**Página publicada:**

https://rdg547.github.io/raizes-urbanas/
