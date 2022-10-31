'use strict'

const APIFootball = use('APIFootball');
const Match = use('App/Models/Match');

class MatchController {
    async store({ request }) {
        return await Match.create(request.all());
    }

    async list() {
        return await Match.all();
    }

    async show({ params }) {
        return await Match.find(params.id);
    }

    async update({ params, request }) {
        const match = await Match.findOrFail(params.id);
        const dataToUpdate = request.all();
    
        match.merge(dataToUpdate);
        await match.save();

        return match;
    }

    async delete({ params }) {
        const match = await Match.findOrFail(params.id);    
        await match.delete();
    
        return {
            success: true,
            message: 'Match delected!'
        }    
    }
}

module.exports = MatchController
