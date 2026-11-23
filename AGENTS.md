# tabnews-ai

Implementação do [TabNews](https://www.tabnews.com.br) feita com agentes de IA. O TabNews é um site de conteúdo para quem trabalha com tecnologia.

## Tecnologias

- Next.js (App Router) e React, em JavaScript
- CSS Modules para os estilos
- ESLint e Prettier

## Estrutura

- `app/`: rotas, layouts, componentes e estilos (App Router)
- `.agents/skills/`: skills de terceiros para os agentes, registradas no `skills-lock.json`; não edite manualmente
- `.claude/skills/`: links simbólicos para `.agents/skills/`

## Comandos

- `npm install`: instala as dependências
- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera o build de produção
- `npm run start`: serve o build de produção
- `npm run lint`: verifica o código com o ESLint
- `npm run format`: formata os arquivos com o Prettier
- `npm run format:check`: verifica a formatação sem alterar arquivos
