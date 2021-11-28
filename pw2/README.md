# Programação Web 2

Aqui tem o diretório shop

## Exercício 01

Exercício concluído, builde a imagem do dockerfile e rode:
> docker run --name shop  -p 3000:3000 -v $(pwd):/usr/app -d <image_name>

Para ver o swagger, acesse http://localhost:3000/api-docs/, lá vai ter as rotas que criei (se achar que tem algo de errado, me avisa!!)

## Loja

### backend da aplicação:
1. Executar o comando docker-compose up
2. Executar o comando npm install
3. Rodar as migrações e os seeders
4. Executar o comando npm start

vc tbm pode rodar na hora de executar as migrações e os seeders:
1. `npm run start:migration` para rodar as migrações e seeders
2. `npm run restart:migration` para dar drop, rodar as migrações e seeders

### front da aplicação:

1. Executar o comando npm install
2. Executar o comando npm start

### Extra
Um dos seeders gera um usuário colaborador com user "admin" e senha "admin"

Acho que é isso, creio ter cumprido todas as regras, qualquer dúvida, só entrar em contato cmg!