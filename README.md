# Projeto TH Score
Projeto com a finalidade de trazer para os amantes do futebol a melhor experiência no momento de acompanhar placares de futebol.


## Funcionalidades
As funcionalidades desenvolvidas são:
 - Placas dos jogos ao vivo
 - Histórico de placares


## Roadmap
A ferramenta escohida para construir o roadmap foi https://airtable.com
![image](https://user-images.githubusercontent.com/47663864/199133694-60889e69-0502-4a58-a5cd-ada57fc614ed.png)


## Database
Para a estrutura de database foi utilizado a ferramenta https://supabase.com
Na primeira entrega, estamos utilizando apenas a tabela 'matches'. Para a próxima versão, será aplicado a seguinte estrutura:
![image](https://user-images.githubusercontent.com/47663864/199134050-1a282656-e0d1-4a58-80e6-aef18ac88f6e.png)


## Backend
Para o backend da aplicação foi construído uma API em https://adonisjs.com (framework baseado em Node.js) e hospedada com https://heroku.com no seguinte endereço https://thscore-api.herokuapp.com 
Os métodos desenvolvidor foram:
- /api/live
- /api/history

### API para jogos ao vivo
Para ter acesso aos resultados de jogos ao vivo foi utilizado https://www.api-football.com


## Frontend
No frontend da aplicação foi utilizado https://reactjs.org utilizando os componentes do framework/template https://primefaces.org. O frontend foi desenvolvido com foco em dispositivos desktop nesta primeira entrega, ficando o desafio para o futuro de projetar uma versão mobile responsiva. O frontend foi hospedado com https://www.netlify.com/

### Mapeamento das Telas
- Home (/): Breve apresentação da TH Score
- Ao Vivo (/live): Resultados de partidas ao vivo
- Histórico (/history) : Histórico de partidas para estudos
