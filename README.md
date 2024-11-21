# Projeto Pokédex com Pesquisa e Navegação por Teclado

Este projeto é uma aplicação de Pokédex que permite buscar pokémons, exibir uma lista com dados paginados e navegar entre os cards usando as teclas do teclado. A aplicação é construída com React, React Query para gerenciamento de dados, e Infinite Scroll para carregamento infinito de pokémons.

## Funcionalidades

- **Pesquisa:** Permite pesquisar pokémons por nome através de uma barra de pesquisa.
- **Navegação por Teclado:** Você pode navegar entre os cards de pokémons usando as teclas de seta para cima e para baixo.
- **Carregamento Infinito:** Novos pokémons são carregados automaticamente conforme você rola para baixo na lista.
- **Foco nos Cards:** Quando um card de Pokémon é focado (via navegação por teclado ou mouse), ele é destacado visualmente.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a construção da interface de usuário.
- **React Query**: Para gerenciamento de dados assíncronos com chamadas à API.
- **Infinite Scroll**: Componente para carregamento infinito de pokémons.
- **TypeScript**: Para maior segurança e tipagem no código.
- **Tailwind CSS**: Utilizado para o estilo da aplicação.

## Como Rodar o Projeto

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/rosaaleila/poke-ui
   cd poke-ui
   ```

2. **Instalar as Dependências**
   ```bash
   npm install
   ```

3. **Rodar o Servidor de Desenvolvimento**
   ```bash
   npm run start
   ```

   Isso iniciará a aplicação em [http://localhost:3000](http://localhost:3000).

## Como Funciona

### 1. Barra de Pesquisa

A barra de pesquisa permite que você filtre os pokémons por nome. Assim que você começa a digitar, a lista é filtrada automaticamente, exibindo apenas os pokémons que correspondem à sua consulta.

### 2. Navegação por Teclado

Você pode usar as setas para cima e para baixo para navegar entre os cards de pokémons. O card focado é destacado visualmente. Você também pode usar o atalho `Ctrl + /` ou `Cmd + /` para focar no campo de pesquisa.

### 3. Carregamento Infinito

Conforme você rola para baixo, a lista de pokémons vai sendo carregada dinamicamente. Isso é feito utilizando a funcionalidade de carregamento infinito.

### 4. Foco em Cards

Quando um card é focado (seja por navegação por teclado ou por hover do mouse), ele é destacado para indicar que está ativo. O foco também pode ser removido ao passar o mouse sobre outro card.

## Estrutura do Projeto

A estrutura do projeto segue o padrão típico de uma aplicação React:

```
/src
  /components
    /pokemonCard    # Componente para exibição de um card de Pokémon
    /ui             # Componentes de interface como Input
  /api
    /pokemonApi     # Funções de API para busca de pokémons
  App.tsx           # Componente principal da aplicação
  index.tsx         # Arquivo de entrada da aplicação
```