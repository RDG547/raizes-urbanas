# Relatório de Desenvolvimento da Página Web

**Nome do Aluno:** Rodrigo
**Data:** 01 de junho de 2026
**Nome do Projeto:** Raízes Urbanas

## 1. Introdução

O projeto **Raízes Urbanas** é uma página web estática criada para apresentar uma iniciativa de hortas comunitárias urbanas. O objetivo da página é divulgar a proposta do projeto, mostrar atividades da comunidade, oferecer dicas iniciais de participação e disponibilizar um formulário de inscrição para pessoas interessadas.

A página se relaciona com os conteúdos estudados na Fase 1 porque aplica HTML5 semântico, boas práticas de acessibilidade, uso de imagem com texto alternativo, formulário com validação nativa e estilização com CSS3. Também foram utilizados recursos de layout responsivo para adaptar o conteúdo a diferentes tamanhos de tela.

## 2. Estrutura da Página Web

A estrutura foi organizada com elementos semânticos do HTML5. O arquivo `index.html` utiliza `header` para o cabeçalho, `nav` para a navegação principal, `main` para o conteúdo central, `section` para dividir os blocos de conteúdo, `article` para conteúdos independentes, `aside` para informações complementares e `footer` para o rodapé.

O cabeçalho possui o nome do projeto e links de navegação interna para as seções Sobre, Atividades, Dicas e Contato. A página também inclui um link de salto para o conteúdo principal, o que melhora a navegação por teclado e por leitores de tela. A imagem principal possui atributo `alt`, descrevendo seu conteúdo de forma objetiva.

## 3. Estilização com CSS3

A estilização foi feita no arquivo `styles.css`. Foram definidas variáveis CSS para manter uma identidade visual consistente, com cores principais, cores de destaque, fundo, bordas e sombra. A tipografia usa fontes seguras do sistema, com tamanhos legíveis e boa hierarquia entre título, subtítulos e textos.

O layout utiliza **Flexbox** no cabeçalho, na navegação e no rodapé para alinhar os elementos de forma flexível. Também utiliza **CSS Grid** nas seções principais, nos cards de atividades e no formulário, permitindo uma organização clara em telas maiores e uma adaptação simples para telas menores.

## 4. Acessibilidade e Responsividade

A acessibilidade foi considerada por meio do uso de tags semânticas, contraste adequado entre texto e fundo, foco visível em links, botões e campos de formulário, textos alternativos em imagem e rótulos associados aos campos do formulário. Os campos obrigatórios utilizam `required`, o e-mail usa `type="email"` e o nome possui `minlength`, aproveitando a validação nativa do HTML.

A responsividade foi implementada com layouts fluidos, larguras máximas e media queries. Em telas menores, as colunas passam para uma única coluna, a navegação se reorganiza e o formulário fica mais confortável para preenchimento em celulares. Dessa forma, o conteúdo permanece acessível e organizado em dispositivos móveis, tablets e desktops.

## 5. Desafios e Soluções

Um dos desafios foi equilibrar visual atrativo com boa legibilidade. Para resolver isso, foi aplicada uma camada escura sobre a imagem principal, garantindo contraste suficiente para o texto do destaque inicial.

Outro desafio foi organizar várias informações sem deixar a página confusa. A solução foi separar o conteúdo em seções bem definidas, usar cards apenas nas atividades e criar painéis complementares para informações rápidas. Também foi necessário ajustar o formulário para funcionar bem em telas pequenas, o que foi resolvido com CSS Grid e media queries.

## 6. Conclusão

Durante o desenvolvimento deste projeto, foi possível consolidar os conhecimentos de HTML5 e CSS3 estudados na primeira fase. A atividade ajudou a compreender como a estrutura semântica melhora a organização do conteúdo e como o CSS pode tornar uma página mais clara, agradável e responsiva.

Em projetos futuros, esses conhecimentos podem ser aplicados para criar sites mais completos, acessíveis e adaptáveis, sempre considerando a experiência do usuário em diferentes dispositivos e contextos de uso.

## 7. Anexos

Os arquivos HTML e CSS estão anexados para revisão:

- `index.html`
- `styles.css`
- `assets/horta-comunitaria.png`

