# Relatório de Desenvolvimento da Página Web

**Curso:** Front-End
**Projeto (disciplina):** Atividade Avaliativa Fase 2
**Discente:** Rodrigo Tavares Vieira
**Nome do Aluno:** Rodrigo Tavares Vieira
**Data:** 03 de julho de 2026
**Nome do Projeto:** Raízes Urbanas

## 1. Introdução

O projeto **Raízes Urbanas** é uma página web criada para apresentar uma iniciativa de hortas comunitárias urbanas. O objetivo da página é divulgar a proposta do projeto, mostrar atividades da comunidade, oferecer dicas iniciais de participação e disponibilizar um formulário de inscrição para pessoas interessadas.

A página se relaciona com os conteúdos estudados na Fase 2 porque aplica JavaScript para manipular elementos do DOM, responder a eventos do usuário, alterar conteúdo, modificar estilos visuais e validar dados do formulário antes do envio. Além disso, o projeto mantém os conhecimentos de HTML5 semântico e CSS3 responsivo já aplicados na etapa anterior.

Os principais elementos incluídos são cabeçalho com navegação interna e menu dropdown de personalização, seção principal com imagem, blocos informativos, cards de atividades, área de retorno das interações, informações de encontro e formulário de inscrição.

## 2. Estrutura da Página Web

A estrutura foi organizada em três arquivos principais: `index.html`, `styles.css` e `script.js`.

O arquivo `index.html` utiliza elementos semânticos como `header`, `nav`, `main`, `section`, `article`, `aside`, `form` e `footer`. O cabeçalho possui links de navegação interna para as seções Sobre, Atividades, Dicas, Interação e Contato, além de um botão Personalizar que abre um menu dropdown com controles de tema, tamanho do texto e foco do encontro. A página também inclui um link de salto para o conteúdo principal, imagem com atributo `alt` e campos de formulário associados a seus respectivos rótulos.

O arquivo `styles.css` define a identidade visual, o layout responsivo, os estados dos botões, os temas visuais e a aparência das mensagens de validação. O arquivo `script.js` concentra a lógica interativa, selecionando elementos da página e alterando conteúdo, atributos e estilos com base nas ações do usuário.

## 3. Interações implementadas

Foram implementadas interações com diferentes eventos em JavaScript. Os controles de personalização ficam no cabeçalho, dentro de um menu dropdown. A primeira interação ocorre no botão Personalizar, que abre e fecha o menu usando JavaScript.

A segunda interação ocorre nos botões de tema visual. Ao clicar em Verde, Solar ou Noturno, o JavaScript altera o atributo `data-theme` do `body`, muda as variáveis de cor aplicadas pelo CSS e atualiza o texto explicativo da área de interação.

A terceira interação ocorre no controle de tamanho de texto. Quando o usuário move o controle deslizante, o evento `input` altera dinamicamente a variável CSS `--base-font-size`, aplicada ao tamanho base da página, e atualiza o valor exibido na tela.

A quarta interação ocorre no seletor de foco do encontro. Ao escolher Plantio, Compostagem ou Mutirão, o evento `change` altera o texto da área em destaque e também modifica as informações do próximo encontro.

Também foi adicionada validação de formulário. Ao tentar enviar a inscrição, o evento `submit` verifica se nome, e-mail, área de interesse e autorização foram preenchidos corretamente. Caso exista erro, o envio é impedido e mensagens específicas são exibidas. Caso os dados estejam corretos, uma mensagem de confirmação aparece para o usuário.

## 4. Detalhamento técnico

A manipulação do DOM foi feita no arquivo `script.js`. Foram utilizados métodos como `document.getElementById` para selecionar elementos específicos, como o botão de personalização, o menu dropdown, o parágrafo de status, o controle de tamanho, o seletor de foco, os textos do próximo encontro e os campos do formulário. Também foi utilizado `document.querySelectorAll` para selecionar todos os botões de tema.

A estilização dinâmica acontece de duas formas. Na primeira, o JavaScript modifica `document.body.dataset.theme`, permitindo que o CSS aplique cores diferentes conforme o tema selecionado. Na segunda, o JavaScript altera a variável CSS `--base-font-size` com `document.documentElement.style.setProperty`, fazendo o controle de tamanho afetar a página.

Os eventos foram registrados com `addEventListener`. Foram usados eventos de `click` no botão do dropdown e nos botões de tema, `input` no controle de tamanho de texto, `change` no seletor de foco e nos campos do formulário, além de `submit` no formulário de inscrição.

Na validação, a função `validateField` verifica cada campo obrigatório e usa `classList.toggle`, `setAttribute` e `textContent` para marcar erros, atualizar `aria-invalid` e exibir mensagens de orientação. A função `validateForm` impede o envio padrão com `event.preventDefault()` quando há campos inválidos e exibe uma mensagem de sucesso quando os dados estão corretos.

## 5. Conclusão

Durante o desenvolvimento deste projeto, foi possível consolidar os conhecimentos da Fase 2 sobre JavaScript aplicado a páginas web. A atividade demonstrou como selecionar elementos, modificar conteúdos, alterar estilos e reagir a eventos do usuário para tornar uma página mais dinâmica.

Também foi possível compreender melhor a integração entre HTML5, CSS3 e JavaScript. O HTML organiza o conteúdo, o CSS define a apresentação visual e o JavaScript adiciona comportamento interativo. Em projetos futuros, esses conhecimentos podem ser aplicados para criar formulários mais completos, painéis personalizados, páginas com dados dinâmicos e experiências mais responsivas para o usuário.

## 6. Anexos

Os arquivos JavaScript, HTML e CSS estão anexados para revisão:

- `index.html`
- `styles.css`
- `script.js`
- `assets/horta-comunitaria.png`
