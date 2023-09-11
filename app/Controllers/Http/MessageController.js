'use strict'

const Message = use('App/Models/Message');

class MessageController {
    async store({ request }) {
        const message = await Message.create(request.all());
        return {
            success: true,
            message: 'Message created!',
            data: message
        };
    }

    async list() {
        let [count] = await Message.query().count('* as total');
        let data = await Message.all();
        return { "count": count.total, data };
    }

    async show({ params }) {
        return await Message.query()
                            .where('session_id', params.session_id)
                            .fetch();
    }

    async update({ params, request }) {
        const message = await Message.findOrFail(params.id);
        const dataToUpdate = request.all();
    
        message.merge(dataToUpdate);
        await message.save();

        return {
            success: true,
            message: 'Message updated!',
            data: message
        };
    }

    async delete({ params }) {
        const message = await Message.findOrFail(params.id);    
        await message.delete();
    
        return {
            success: true,
            message: 'Message delected!'
        }    
    }
}

module.exports = MessageController
