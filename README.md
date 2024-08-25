# API Brain Agriculture

A API do projeto Brain Agriculture foi projetado em **Layered (Clean) Architecture** desenvolvido com NestJS e NodeJS. Este projeto oferece um modelo abrangente e modularizado, demonstrando uma arquitetura bem estruturada e fácil de manter para suas aplicações.

## Introdução

O principal objetivo deste projeto é demonstrar como criar uma estrutura de aplicação escalável e modular utilizando o robusto conceito da Clean Architecture. Essa arquitetura promove a separação de responsabilidades e estabelece uma distinção clara entre as diferentes camadas da sua aplicação. O foco principal é isolar a regra de negócio, garantindo que ela permaneça independente de aspectos técnicos e externos, o que facilita a manutenção, a escalabilidade e a evolução da aplicação.

## Visão Geral da Arquitetura

A aplicação segue a **Clean Architecture**, que consiste em três camadas principais:

1. **Camada de Infraestrutura (infrastructure)**: A camada de infraestrutura contém as implementações das interfaces definidas nas camadas internas. Ela lida com os aspectos técnicos da sua aplicação, como acesso a bancos de dados, APIs externas e outras integrações com terceiros. Essa camada depende tanto da Camada de Aplicação quanto da Camada de Domínio.

2. **Camada de Aplicação (application)**: A camada de aplicação abriga as diversas funcionalidades e casos de uso que seu módulo oferece. Ela depende da Camada de Domínio para executar a regra de negócio e as operações.

3. **Camada de Domínio (domain)**: Esta camada contém a lógica de negócio central da sua aplicação, seguindo os princípios do Domain-Driven Design (DDD). Ela é independente de qualquer outra camada e inclui entidades, objetos de valor, agregados e serviços de domínio.

![Architecture Diagram](Layers.png)

## Regras de Dependência (Dependency direction)

Para manter uma arquitetura limpa e bem estruturada, seguimos as seguintes regras de dependência:

- **Camada de Domínio**: A lógica central de domínio não deve depender de nenhuma outra camada, mantendo-a desacoplada e reutilizável.

- **Camada de Aplicação**: A camada de aplicação pode depender da Camada de Domínio para acessar e utilizar a lógica de domínio, a fim de atender aos casos de uso.

- **Camada de Infraestrutura**: A camada de infraestrutura pode depender tanto da Camada de Aplicação quanto da Camada de Domínio, permitindo a implementação das interfaces definidas nas camadas internas.

## Comandos para executar no projeto

### Instalação do pacote NPM

```bash
$ npm install
```

### executar o projeto

```bash
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

### Executar testes

```bash
# testes unitários
$ npm run test

# testes end to end
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

### Migrações de banco de dados

```bash
# Criando um arquivo de migração
$ npm run migration:generate -- src/database/migrations/{{nome-versao}}

# Executando a migração
$ npm run migration:run

# Revertendo a migração
$ npm run migration:revert
```
