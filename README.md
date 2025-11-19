# 🚀 Frontend - Sistema de Consulta de Créditos ISSQN

Interface web moderna e responsiva desenvolvida em **Angular 17** para consulta de créditos constituídos.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Build e Deploy](#build-e-deploy)
- [Docker](#docker)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Responsividade](#responsividade)

## 🎯 Sobre o Projeto

Aplicação frontend desenvolvida como parte do **Desafio Técnico INFUSE** para consulta de créditos constituídos de ISSQN. A interface permite buscar créditos por:

- **Número da NFS-e**: Retorna todos os créditos vinculados à nota fiscal
- **Número do Crédito**: Retorna um crédito específico

## 🛠 Tecnologias Utilizadas

- **Angular 17** - Framework frontend (Standalone Components)
- **TypeScript 5.2** - Linguagem de programação
- **RxJS** - Programação reativa
- **CSS3** - Estilização moderna com gradientes e animações
- **Nginx** - Servidor web para produção
- **Docker** - Containerização da aplicação

## ✅ Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **Angular CLI** 17.x (opcional, mas recomendado)
- **Docker** (para containerização)

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd INFUSE-FRONTEND
```

### 2. Instale as dependências

```bash
npm install
```

## 🚀 Execução

### Modo Desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

O proxy está configurado para redirecionar `/api` para `http://localhost:8080`

### Modo Desenvolvimento com Proxy

```bash
ng serve --proxy-config proxy.conf.json
```

### Executar testes

```bash
npm test
```

### Lint do código

```bash
npm run lint
```

## 🏗 Build e Deploy

### Build de Produção

```bash
npm run build:prod
```

Os arquivos serão gerados na pasta `dist/creditos-frontend`

### Build de Desenvolvimento

```bash
npm run build
```

## 🐳 Docker

### Build da imagem Docker

```bash
docker build -t creditos-frontend:latest .
```

### Executar container

```bash
docker run -d -p 4200:80 --name creditos-frontend creditos-frontend:latest
```

### Executar com Docker Compose (Backend + Frontend)

Na raiz do projeto backend:

```bash
docker-compose up -d
```

Acesse:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                          # Módulo core (serviços e models)
│   │   ├── models/
│   │   │   └── credito.model.ts       # Interface do modelo Credito
│   │   └── services/
│   │       └── credito.service.ts     # Service de comunicação com API
│   │
│   ├── features/                      # Módulo de features
│   │   └── creditos/
│   │       └── components/
│   │           └── credito-search/    # Componente de busca
│   │               ├── credito-search.component.ts
│   │               ├── credito-search.component.html
│   │               └── credito-search.component.css
│   │
│   ├── app.component.ts               # Componente raiz
│   ├── app.component.html
│   └── app.component.css
│
├── environments/                      # Configurações de ambiente
│   ├── environment.ts                 # Desenvolvimento
│   └── environment.prod.ts            # Produção
│
├── assets/                            # Recursos estáticos
├── index.html                         # HTML principal
├── main.ts                            # Bootstrap da aplicação
└── styles.css                         # Estilos globais

```

## ✨ Funcionalidades

### 🔍 Busca de Créditos

- **Busca por NFS-e**: Consulta todos os créditos vinculados a uma nota fiscal
- **Busca por Crédito**: Consulta um crédito específico pelo número
- **Validação de entrada**: Não permite buscas vazias
- **Loading state**: Indicador visual durante a busca
- **Tratamento de erros**: Mensagens amigáveis para o usuário

### 📊 Exibição de Resultados

- **Tabela responsiva**: Scroll horizontal em dispositivos móveis
- **Formatação de valores**: Moeda brasileira (BRL)
- **Formatação de datas**: Formato DD/MM/YYYY
- **Badges visuais**: Identificação rápida de tipos e status
- **Highlight de valores**: Destaque para base de cálculo

### 🎨 Interface

- **Design Moderno**: Gradientes e sombras suaves
- **Animações**: Transições suaves e feedback visual
- **Ícones SVG**: Inline para melhor performance
- **Tema profissional**: Paleta de cores azul/roxo
- **Feedback visual**: Estados de hover, focus e disabled

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:

- **Desktop** (> 1024px): Layout completo com tabela expandida
- **Tablet** (768px - 1024px): Tabela com scroll horizontal
- **Mobile** (< 768px): Layout otimizado com elementos empilhados

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablet */
@media (max-width: 1024px) { ... }
```

## 🔧 Configuração

### Proxy (Desenvolvimento)

O arquivo `proxy.conf.json` redireciona chamadas `/api` para o backend:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

### Environment

**Development** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: '/api'
};
```

**Production** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: '/api'
};
```

## 🌐 Integração com Backend

A aplicação consome os seguintes endpoints do backend:

### GET `/api/creditos/{numeroNfse}`
Retorna lista de créditos por NFS-e

**Exemplo de resposta:**
```json
[
  {
    "numeroCredito": "123456",
    "numeroNfse": "7891011",
    "dataConstituicao": "2024-02-25",
    "valorIssqn": 1500.75,
    "tipoCredito": "ISSQN",
    "simplesNacional": "Sim",
    "aliquota": 5.0,
    "valorFaturado": 30000.00,
    "valorDeducao": 5000.00,
    "baseCalculo": 25000.00
  }
]
```

### GET `/api/creditos/credito/{numeroCredito}`
Retorna um crédito específico

## 🎨 Paleta de Cores

```css
/* Primárias */
--primary: #3b82f6     /* Blue 500 */
--primary-dark: #2563eb /* Blue 600 */

/* Secundárias */
--secondary: #667eea   /* Indigo 400 */
--accent: #764ba2      /* Purple 500 */

/* Neutras */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-600: #4b5563
--gray-900: #1e293b

/* Feedback */
--success: #059669     /* Green 600 */
--error: #dc2626       /* Red 600 */
--warning: #d97706     /* Amber 600 */
```

## 📝 Comandos Úteis

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm start

# Build produção
npm run build:prod

# Testes
npm test

# Lint
npm run lint

# Build Docker
docker build -t creditos-frontend .

# Run Docker
docker run -p 4200:80 creditos-frontend
```

## 🐛 Troubleshooting

### Erro de CORS

Se encontrar erros de CORS em desenvolvimento, verifique:
1. O proxy está configurado em `proxy.conf.json`
2. O backend está rodando na porta 8080
3. Execute com: `ng serve --proxy-config proxy.conf.json`

### Porta 4200 em uso

```bash
ng serve --port 4201
```

### Erro de módulos

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licença

Este projeto foi desenvolvido como parte do Desafio Técnico INFUSE.

## 👨‍💻 Autor

Desenvolvido com ❤️ para o Desafio Técnico INFUSE

---

**Nota**: Esta aplicação foi desenvolvida utilizando as melhores práticas de Angular, incluindo:
- Standalone Components (Angular 17+)
- Tipagem forte com TypeScript
- Programação reativa com RxJS
- Separation of Concerns
- Clean Code principles
- Responsive Design
- Accessibility (WCAG)
