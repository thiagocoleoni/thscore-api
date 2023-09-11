'use strict'

const Conversation = use('App/Models/Conversation');

class ConversationController {
    async store({ request }) {
        const conversation = await Conversation.create(request.all());
        return {
            success: true,
            message: 'Conversation created!',
            data: conversation
        };
    }

    async list() {
        let [count] = await Conversation.query().count('* as total');
        let data = await Conversation.all();
        return { "count": count.total, data };
    }

    async show({ params }) {
        return await Conversation.find(params.id);
    }

    async update({ params, request }) {
        const conversation = await Conversation.findOrFail(params.id);
        const dataToUpdate = request.all();
    
        conversation.merge(dataToUpdate);
        await conversation.save();

        return {
            success: true,
            message: 'Conversation updated!',
            data: conversation
        };
    }

    async delete({ params }) {
        const conversation = await Conversation.findOrFail(params.id);    
        await conversation.delete();
    
        return {
            success: true,
            message: 'Conversation delected!'
        }    
    }
}

module.exports = ConversationController
