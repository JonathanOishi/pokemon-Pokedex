# 🎮 Pokédex App

<div align="center">

![Pokémon](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

**Uma Pokédex moderna desenvolvida com React Native e GraphQL**

[![Expo](https://img.shields.io/badge/Expo-54.0.7-000020?style=flat&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql)](https://graphql.org/)

</div>

---

## ✨ Funcionalidades

- 🔍 **Busca em tempo real** de Pokémons por nome
- 🏷️ **Filtro por tipo** (Fire, Water, Grass, etc.)
- 📱 **Interface responsiva** com componentes gluestack-ui
- ⚡ **GraphQL** com Apollo Client para queries eficientes
- 🎨 **Design moderno** com NativeWind (Tailwind CSS)
- 📊 **Informações detalhadas** de cada Pokémon

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI

### Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

### Executar em diferentes plataformas

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 🛠️ Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| **Expo** | Framework para desenvolvimento React Native |
| **TypeScript** | Tipagem estática para JavaScript |
| **Apollo Client** | Cliente GraphQL para gerenciamento de dados |
| **NativeWind** | Tailwind CSS para React Native |
| **Gluestack UI** | Biblioteca de componentes UI |
| **Expo Router** | Sistema de navegação file-based |

## 📁 Estrutura do Projeto

```
pokemonPokedex/
├── app/                    # Telas e navegação (Expo Router)
│   ├── index.tsx          # Tela principal da Pokédex
│   └── tabs/              # Navegação por tabs
├── components/            # Componentes reutilizáveis
│   ├── PokemonCard.tsx   # Card de exibição do Pokémon
│   ├── SearchBar.tsx     # Barra de busca
│   └── TypeFilter.tsx    # Filtro de tipos
├── graphql/               # Configuração GraphQL
│   ├── queries.ts        # Queries GraphQL
│   ├── hooks.ts          # Custom hooks
│   └── types.ts          # Tipos TypeScript
├── lib/                   # Configurações
│   └── apolloClient.ts   # Setup do Apollo Client
└── data/                  # Dados mockados
```

## 🎯 Próximos Passos

- [ ] Adicionar animações nas transições
- [ ] Implementar modo escuro
- [ ] Cache offline com Apollo
- [ ] Página de detalhes expandida
- [ ] Comparação entre Pokémons

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Abre no Android
npm run ios        # Abre no iOS
npm run web        # Abre no navegador
npm run build      # Build para produção
npm test           # Executa testes
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

**Feito com ❤️ e ⚡ por [Seu Nome]**

[⬆ Voltar ao topo](#-pokédex-app)

</div>
