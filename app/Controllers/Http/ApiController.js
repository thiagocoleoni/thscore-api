'use strict'

const APIFootball = use('APIFootball');
const Match = use('App/Models/Match');

class ApiController {
    async live({}) {
        try {
            return await APIFootball.getLive();
        } catch (e) {
            return { erro: e.toString() };
        }
    }

    async history({}) {
        try {
            return await Match.all();
        } catch (e) {
            return { erro: e.toString() };
        }
    }

    async updateMatches({ request }) {
        try {
            let matches = await APIFootball.getMatches(request.get());

            let response = [];
            matches.response.forEach(async function (item) {
                try {
                    await Match.create(item);
                    response.push({ id: item.id, msg: 'Adicionado com sucesso!' });
                } catch (e) {                    
                    response.push({ id: item.id, msg: 'Erro ao adicionar!', erro: e.toString() });
                }
            });

            return { response: response, status: 200 };
        } catch (e) {
            return { erro: e.toString() };
        }
    }
}

module.exports = ApiController
