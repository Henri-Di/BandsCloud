
# 🎶 BandsCloud

**BandsCloud** é uma plataforma web inovadora voltada para fortalecer a conexão entre **artistas independentes**, **estabelecimentos culturais** e **fãs de música**. Criada para fomentar a cena musical alternativa, a aplicação oferece um espaço digital onde músicos podem divulgar seus trabalhos, encontrar oportunidades de shows e construir parcerias com casas de espetáculo, bares, e outros espaços culturais.

---

## 🚀 Visão Geral

O BandsCloud facilita a interação entre:

- 🎤 **Artistas** que buscam visibilidade e oportunidades de apresentação.  
- 🏛️ **Estabelecimentos** que desejam encontrar talentos autênticos para eventos ao vivo.  
- 🎧 **Fãs** que querem acompanhar seus artistas favoritos e descobrir novas músicas.

A missão do projeto é proporcionar um ambiente inclusivo, colaborativo e dinâmico, valorizando a diversidade da música independente.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Symfony** – Framework PHP moderno e robusto  
- **TypeScript** – Tipagem forte para segurança e manutenção  
- **PHP-FPM** – Gerenciador rápido de processos PHP  
- **JWT (JSON Web Token)** – Autenticação segura e stateless

### Frontend
- **Vite** – Ferramenta de build ultrarrápida  
- **React** – Biblioteca declarativa para interfaces reativas  
- **Tailwind CSS** – Utilitários CSS para design moderno e responsivo  
- **TypeScript** – Mais segurança e produtividade

### DevOps
- **Docker** – Ambientes isolados e portáveis  
- **Nginx** – Proxy reverso e servidor web  
- **Makefile** – Automação de comandos comuns

### Banco de Dados
- **MySQL** – Banco de dados relacional

---

## ⚙️ Arquitetura

A aplicação segue uma arquitetura desacoplada **frontend-backend**, com comunicação via API RESTful e autenticação JWT.

```
[ React + Vite + Tailwind ]
           ⬇️
     [ NGINX Proxy ]
           ⬇️
[ Symfony API (PHP-FPM) ]
           ⬇️
       [ MySQL DB ]
```

---

## 📦 Instalação

> Pré-requisitos: Docker + Docker Compose

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bandscloud.git
cd bandscloud

# Suba os containers em modo desenvolvimento
make up

# Acesse o frontend: http://localhost:3000
# Acesse o backend API: http://localhost/api
```

Para encerrar os serviços:

```bash
make down
```

---

## 🔐 Autenticação e Segurança

A aplicação utiliza **JWT** para autenticação, garantindo:

- Sessões seguras e sem estado  
- Diferentes níveis de acesso: `ARTIST`, `VENUE`, `FAN`  
- Proteção de rotas no frontend e backend  

---

## 🧩 Funcionalidades Principais

- 🔒 Registro e login seguro com JWT  
- 👤 Perfis personalizados para artistas, fãs e locais  
- 📅 Disponibilidade e agendamento de apresentações  
- 💬 Sistema de mensagens entre usuários  
- 🎧 Playlists e músicas autorais  
- 📍 Mapeamento de locais culturais parceiros  
- 👥 Sistema de seguidores e interação social  

---

## 📁 Estrutura de Pastas

```bash
bandscloud/
├── backend/           # Symfony (API)
│   ├── src/
│   ├── config/
│   └── ...
├── frontend/          # React + Vite
│   ├── src/
│   ├── public/
│   └── ...
├── docker/            # Configurações de container
├── .env
├── docker-compose.yml
└── Makefile           # Comandos úteis
```


---

## 🚀 Deploy na Render (Frontend)

O frontend do BandsCloud é hospedado na plataforma **Render**.

### Configurações de Deploy

- **Build Command**: `npm run build`
- **Start Command**: `serve -s dist`
- **Publish Directory**: `dist`
- **Environment**:
  - `VITE_API_URL=https://seu-backend.render.com/api`

### Passos:

1. Crie um novo serviço **Static Site** na Render.
2. Conecte seu repositório Git com o projeto frontend.
3. Preencha os comandos e variáveis de ambiente conforme indicado acima.
4. Clique em **Create Static Site**.
5. Após o deploy, o site estará disponível na URL pública gerada pela Render.



---

## 📌 Roadmap

- [x] MVP com autenticação, perfis e listagem básica  
- [ ] Sistema completo de mensagens privadas  
- [ ] Busca inteligente por artistas e locais  
- [ ] Integração com serviços de streaming  
- [ ] Modo escuro / acessibilidade  
- [ ] Deploy contínuo com GitHub Actions  

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues**, enviar **pull requests**, ou apenas sugerir melhorias.

1. Fork o projeto  
2. Crie uma branch (`git checkout -b feature/nova-feature`)  
3. Commit suas alterações (`git commit -m 'feat: nova feature'`)  
4. Push para o repositório (`git push origin feature/nova-feature`)  
5. Abra um Pull Request  

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

---

## 👨‍🎤 Desenvolvedor

Feito com ❤️ por **Matheus Diamantino**

- [LinkedIn](https://www.linkedin.com/in/matheus-diamantino-952b3121a/)  
- [GitHub](https://github.com/Henri-Di/BandsCloud.git)  
