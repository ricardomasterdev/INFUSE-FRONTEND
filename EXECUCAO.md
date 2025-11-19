# 🎯 Como Executar o Projeto Completo

## 📋 Visão Geral

Este guia mostra como executar **BACKEND + FRONTEND** juntos.

## 🚀 Opção 1: Execução Local (Desenvolvimento)

### Passo 1: Iniciar o Backend

```bash
cd C:\INFUSE-BACKEND
mvn spring-boot:run
```

✅ Backend rodando em: `http://localhost:8080`

### Passo 2: Iniciar o Frontend (nova janela de terminal)

```bash
cd C:\INFUSE-FRONTEND
npm install
npm start
```

✅ Frontend rodando em: `http://localhost:4200`

### Passo 3: Acessar a Aplicação

Abra o navegador em: **http://localhost:4200**

## 🐳 Opção 2: Execução com Docker (Recomendado)

### Passo 1: Executar Docker Compose

```bash
cd C:\INFUSE-BACKEND
docker-compose up -d
```

Isso irá iniciar:
- ✅ PostgreSQL (porta 5432)
- ✅ Zookeeper (porta 2181)
- ✅ Kafka (porta 9092)
- ✅ Backend API (porta 8080)
- ✅ Frontend Angular (porta 4200)
- ✅ Kafka UI (porta 8081)

### Passo 2: Aguardar os Containers

```bash
docker-compose ps
```

Aguarde todos os containers ficarem "healthy"

### Passo 3: Acessar a Aplicação

Abra o navegador em: **http://localhost:4200**

## 🌐 URLs Disponíveis

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:4200 | Interface web |
| **Backend API** | http://localhost:8080 | API REST |
| **Swagger UI** | http://localhost:8080/swagger-ui.html | Documentação interativa |
| **Kafka UI** | http://localhost:8081 | Monitoramento Kafka |
| **PostgreSQL** | localhost:5432 | Banco de dados |

## ✅ Testando a Aplicação

### 1. Buscar por NFS-e

1. Acesse: http://localhost:4200
2. Selecione: **"Número da NFS-e"**
3. Digite: `7891011`
4. Clique em: **"Buscar"**
5. Resultado: **2 créditos encontrados**

### 2. Buscar por Número de Crédito

1. Selecione: **"Número do Crédito"**
2. Digite: `123456`
3. Clique em: **"Buscar"**
4. Resultado: **1 crédito encontrado**

## 🛑 Parar a Aplicação

### Modo Local

```bash
# Parar backend: Ctrl+C no terminal
# Parar frontend: Ctrl+C no terminal
```

### Modo Docker

```bash
cd C:\INFUSE-BACKEND
docker-compose down
```

Para remover volumes também:

```bash
docker-compose down -v
```

## 📊 Dados de Teste Disponíveis

### NFS-e com múltiplos créditos:
- `7891011` → 2 créditos
- `1122334` → 2 créditos
- `5566778` → 2 créditos

### Números de Crédito individuais:
- `123456`
- `789012`
- `654321`
- `234567`
- `345678`
- `456789`
- `567890`
- `678901`
- `890123`
- `901234`

## 🔧 Troubleshooting

### ❌ Problema: "Cannot connect to the Docker daemon"

**Solução**: Inicie o Docker Desktop

### ❌ Problema: "Port 8080 is already in use"

**Solução**: Pare outros serviços na porta 8080

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### ❌ Problema: Frontend não conecta ao backend

**Verifique**:
1. Backend está rodando: `curl http://localhost:8080/api/creditos/7891011`
2. CORS está configurado corretamente
3. Proxy está configurado em `proxy.conf.json`

### ❌ Problema: Erro de banco de dados

**Verifique**:
1. PostgreSQL está rodando
2. Credenciais estão corretas em `application.properties`
3. Script de inicialização foi executado

### ❌ Problema: npm install falha

**Solução**:

```bash
# Limpar cache
npm cache clean --force

# Remover node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

## 📱 Testando Responsividade

### Desktop
- Resolução: 1920x1080
- Navegador: Chrome, Firefox, Edge

### Tablet
- Resolução: 768x1024
- Use DevTools (F12) → Toggle Device Toolbar

### Mobile
- Resolução: 390x844 (iPhone 12 Pro)
- Use DevTools (F12) → Toggle Device Toolbar

## 🎨 Features do Frontend

- ✅ Design moderno com gradientes azul/roxo
- ✅ Animações suaves e transições
- ✅ Loading spinner durante buscas
- ✅ Mensagens de erro amigáveis
- ✅ Formatação automática de moeda (R$)
- ✅ Formatação automática de datas
- ✅ Badges coloridos para status
- ✅ Tabela responsiva com scroll
- ✅ Hover effects interativos
- ✅ Validação de formulários

## 🎯 Funcionalidades do Backend

- ✅ API RESTful com Spring Boot
- ✅ Validação de dados
- ✅ Tratamento de erros customizado
- ✅ Documentação Swagger
- ✅ CORS configurado
- ✅ Kafka para auditoria (opcional)
- ✅ Testes unitários
- ✅ Docker e Docker Compose

## 📚 Documentação Adicional

- **Backend README**: `C:\INFUSE-BACKEND\README.md`
- **Frontend README**: `C:\INFUSE-FRONTEND\README.md`
- **Frontend Quick Start**: `C:\INFUSE-FRONTEND\QUICK-START.md`
- **Kafka Setup**: `C:\INFUSE-BACKEND\KAFKA-SETUP.md`

## 💡 Dicas

1. **Use Docker** para execução mais simples
2. **Verifique logs** se algo não funcionar
3. **Teste no Swagger** antes de testar no frontend
4. **Use o DevTools** para debugar erros
5. **Limpe os dados** se necessário

## 🎓 Padrões Utilizados

### Backend
- ✅ Clean Architecture
- ✅ Repository Pattern
- ✅ Service Layer
- ✅ DTO Pattern
- ✅ Exception Handling
- ✅ Factory Pattern (Kafka Publisher)
- ✅ Singleton (Spring Beans)

### Frontend
- ✅ Component-Based Architecture
- ✅ Service Layer
- ✅ Observable Pattern (RxJS)
- ✅ Standalone Components (Angular 17+)
- ✅ Separation of Concerns
- ✅ Responsive Design
- ✅ Accessibility (WCAG)

---

**Desafio Técnico INFUSE - Sistema de Consulta de Créditos** 🚀

Desenvolvido com ❤️ usando **Spring Boot** + **Angular** + **Docker**
