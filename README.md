hortifruti_crud 🌱

Projeto backend em NestJS para gerenciar operações de CRUD no contexto de hortifruti (produtos, fornecedores, pedidos etc.).

🚀 Tecnologias
NestJS (Node.js + TypeScript)
SQLite
Jest (testes)
TypeORM (ORM para acesso ao banco)

📦 Instalação
git clone https://github.com/jeffersonLucass/hortifruti_crud.git
cd hortifruti_crud
npm install

🛠️ Execução
Ambiente de desenvolvimento
npm run start:dev
Acesse a API em http://localhost:3000

Ambiente de produção
npm run build
npm run start:prod

🧪 Testes
Unitários: npm run test
E2E: npm run test:e2e
Cobertura: npm run test:cov

💻 Caminho Feliz
(admin) nome: Gustavo M | senha: 112233 | token: (pegar o token gerado no swagger)
(manager) nome: jefferson | senha: 123456 | token: (pegar o token gerado no swagger)
(user) nome: Kaion | senha: 123456 | token: (pegar o token gerado no swagger)
> Acesse hortifruti.http no src e na parte de "//produtos", coloque o token do usuario escolhido gerado no swagger e utilize a extenção REST para testar o CRUD de produtos.

📂 Estrutura do Projeto
src/ – Código-fonte principal
db.sqlite – Banco de dados SQLite
test/ – Testes automatizados

📬 Endpoints
GET /produtos – Lista todos os produtos
POST /produtos – Cria um novo produto
PATCH /produtos/:id – Atualiza produto
DELETE /pedidos/:id – Remove pedido

👥 Integrantes
Grazielly Sabino (@sabinograzielly)
Gustavo Scot (@GustavoScot)
Jefferson Lucas (@jeffersonLucass)
Kaion Brandão (@kaionBLima)
