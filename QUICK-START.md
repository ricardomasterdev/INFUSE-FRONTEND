# 🚀 Quick Start - Frontend Angular

Guia rápido para executar o frontend da aplicação de consulta de créditos.

## ⚡ Início Rápido (3 passos)

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Iniciar aplicação

```bash
npm start
```

### 3️⃣ Acessar no navegador

```
http://localhost:4200
```

## 🎯 Como Usar

### Consultar por NFS-e

1. Selecione **"Número da NFS-e"**
2. Digite: `7891011`
3. Clique em **"Buscar"**
4. Visualize os 2 créditos encontrados

### Consultar por Número de Crédito

1. Selecione **"Número do Crédito"**
2. Digite: `123456`
3. Clique em **"Buscar"**
4. Visualize o crédito específico

## 📋 Pré-requisitos

✅ **Node.js 18+** instalado
✅ **npm 9+** instalado
✅ **Backend rodando** em `http://localhost:8080`

## 🔧 Verificar se o Backend está rodando

```bash
curl http://localhost:8080/api/creditos/7891011
```

Se retornar JSON, o backend está OK! ✅

## 🐛 Problemas Comuns

### ❌ "CORS error" ou "Failed to fetch"

**Solução**: Certifique-se que o backend está rodando em `http://localhost:8080`

```bash
# No diretório do backend
mvn spring-boot:run
```

### ❌ "Port 4200 is already in use"

**Solução**: Use outra porta

```bash
ng serve --port 4201
```

### ❌ Módulos não encontrados

**Solução**: Reinstale as dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Scripts Disponíveis

```bash
npm start          # Inicia em modo desenvolvimento
npm run build      # Build de desenvolvimento
npm run build:prod # Build de produção
npm test           # Executa testes
```

## 🐳 Executar com Docker

```bash
# Build da imagem
docker build -t creditos-frontend .

# Executar container
docker run -p 4200:80 creditos-frontend
```

## 🌐 URLs Importantes

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Kafka UI**: http://localhost:8081 (se Kafka estiver rodando)

## 📱 Testando Responsividade

1. Abra o DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Teste diferentes resoluções:
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)

## ✨ Recursos da Interface

- ✅ Design moderno com gradientes
- ✅ Animações suaves
- ✅ Indicador de loading
- ✅ Mensagens de erro amigáveis
- ✅ Formatação automática de valores (R$)
- ✅ Formatação automática de datas (DD/MM/YYYY)
- ✅ Badges coloridos para status
- ✅ Tabela responsiva com scroll horizontal
- ✅ Hover effects nos botões e linhas da tabela

## 🎨 Temas de Cor

A aplicação usa um tema profissional azul/roxo:

- **Gradiente principal**: #667eea → #764ba2
- **Botão primário**: #3b82f6 → #2563eb
- **Sucesso**: #059669
- **Erro**: #dc2626
- **Aviso**: #d97706

## 💡 Dicas

1. **Limpar formulário**: Use o botão "Limpar" para resetar
2. **Enter para buscar**: Pressione Enter no campo de busca
3. **Loading visual**: Aguarde o spinner desaparecer
4. **Scroll na tabela**: Em mobile, deslize a tabela horizontalmente

## 📞 Precisa de Ajuda?

Verifique:
1. Console do navegador (F12) para erros
2. Network tab para ver requisições
3. Backend logs se houver erro 500

---

**Desenvolvido para o Desafio Técnico INFUSE** 🚀
