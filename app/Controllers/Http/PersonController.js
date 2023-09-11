'use strict'

const Person = use('App/Models/Person');

class PersonController {
    async store({ request }) {
        const person = await Person.create(request.all());
        return {
            success: true,
            message: 'Person created!',
            data: person
        };
    }

    async list() {
        let [count] = await Person.query().count('* as total');
        let data = await Person.all();
        return { "count": count.total, data };
    }

    async show({ params }) {
        return await Person.find(params.id);
    }

    async update({ params, request }) {
        const person = await Person.findOrFail(params.id);
        const dataToUpdate = request.all();
    
        person.merge(dataToUpdate);
        await person.save();

        return {
            success: true,
            message: 'Person updated!',
            data: person
        };
    }

    async delete({ params }) {
        const person = await Person.findOrFail(params.id);    
        await person.delete();
    
        return {
            success: true,
            message: 'Person delected!'
        }    
    }
}

module.exports = PersonController
