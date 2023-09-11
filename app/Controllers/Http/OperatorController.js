'use strict'

const Operator = use('App/Models/Operator');

class OperatorController {
    async store({ request }) {
        const operator = await Operator.create(request.all());
        return {
            success: true,
            message: 'Operator created!',
            data: operator
        };
    }

    async list() {
        let [count] = await Operator.query().count('* as total');
        let data = await Operator.all();
        return { "count": count.total, data };
    }

    async show({ params }) {
        return await Operator.find(params.id);
    }

    async update({ params, request }) {
        const operator = await Operator.findOrFail(params.id);
        const dataToUpdate = request.all();
    
        operator.merge(dataToUpdate);
        await operator.save();

        return {
            success: true,
            message: 'Operator updated!',
            data: operator
        };
    }

    async delete({ params }) {
        const operator = await Operator.findOrFail(params.id);    
        await operator.delete();
    
        return {
            success: true,
            message: 'Operator delected!'
        }    
    }
}

module.exports = OperatorController
