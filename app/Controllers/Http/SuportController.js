'use strict'

const Crisp = use('Crisp');
const Operator = use('App/Models/Operator');
const Person = use('App/Models/Person');
const Conversation = use('App/Models/Conversation');
const Message = use('App/Models/Message');

class SuportController {
    async saveOperators(){
        const response = [];
        const operators = await Crisp.listOperators();

        try {
            const promises = operators.map(async (item, idx) => {
                try {
                    let operator = [];
                    if (item.details.user_id && item.type == 'operator') {
                        operator = {
                            'crisp_id': item.details.user_id,
                            'email': item.details.email,
                            'first_name': item.details.first_name,
                            'last_name': item.details.last_name,
                            'role': item.details.role,
                            'avatar': item.details.avatar,
                            'type': item.type
                        }
                        await Operator.create(operator);
                        response.push({ crisp_id: item.details.user_id, msg: 'Operador ' + item.details.first_name + ' ' + item.details.last_name + ' adicionado com sucesso!' });
                    }
                } catch (e) {
                    response.push({ crisp_id: item.details.user_id, msg: 'Erro ao adicionar!', erro: e.toString() });
                }
            });
            await Promise.all(promises);

            return { status: 200, data: response };
        } catch (e) {
            return { erro: e.toString() };
        }
    }

    async savePeople({ params }){
        const response = [];
        let execute = true;
        let page;
        if (params.page == 'all') {
            page = 1;
        } else {
            page = params.page;
        }

        while (execute === true) {
            const people = await Crisp.listPeople(page);
            console.log(page);
            
            if (people.length) {
                try {
                    const promises = people.map(async (item, idx) => {
                        try {
                            let person = [];
                            if (item.people_id) {
                                let personExists = await Person.findBy('crisp_id', item.people_id);
                                person = {
                                    'crisp_id': item.people_id,
                                    'email': item.email,
                                    'nickname': item.person.nickname,
                                    'country': item.person.geolocation.country,
                                    'region': item.person.geolocation.region,
                                    'city': item.person.geolocation.city,
                                    'latitude': item.person.geolocation.coordinates.latitude,
                                    'longitude': item.person.geolocation.coordinates.longitude,
                                    'created': new Date(item.created_at)
                                }
                                
                                if (personExists) {
                                    personExists.merge(person);
                                    await personExists.save();
                                    response.push({ crisp_id: item.people_id, msg: "Pessoa " + item.people_id + ' atualizada com sucesso!' });
                                } else {
                                    await Person.create(person);
                                    response.push({ crisp_id: item.people_id, msg: "Pessoa " + item.people_id + ' adicionada com sucesso!' });
                                }
                            }
                        } catch (e) {
                            response.push({ crisp_id: item.people_id, msg: 'Erro ao adicionar!', erro: e.toString() });
                        }
                    });
                    await Promise.all(promises);
                } catch (e) {
                    return { erro: e.toString() };
                }

                if (params.page == 'all') {
                    page++;
                } else {
                    execute = false;
                }
            } else {
                execute = false;
            }
        }
        return { status: 200, data: response };
    }

    async saveConversations({ params }){
        const response = [];
        let execute = true;
        let page = params.page === 'all' ? 1 : params.page;
        
        while (execute === true) {
            const conversations = await Crisp.listConversations(page);
            console.log(page);
            
            if (conversations.length) {
                try {
                    const promises = conversations.map(async (item, idx) => {
                        try {
                            let conversation = [];
                            if (item.session_id) {
                                let conversationExists = await Conversation.findBy('session_id', item.session_id);
                                conversation = {
                                    'session_id': item.session_id,
                                    'created': new Date(item.created_at),
                                    'updated': new Date(item.updated_at),
                                    'last_active': new Date(item.active.last),
                                    'nickname': item.meta.nickname,
                                    'email': item.meta.email,
                                    'country': item.meta.device.geolocation.country,
                                    'region': item.meta.device.geolocation.region,
                                    'city': item.meta.device.geolocation.city,
                                    'latitude': item.meta.device.geolocation.coordinates.latitude,
                                    'longitude': item.meta.device.geolocation.coordinates.longitude,
                                    'ip': item.meta.ip,
                                    'os': item.meta.device.system.os.name,
                                    'os_version': item.meta.device.system.os.version,
                                    'browser': item.meta.device.system.browser.name,
                                    'browser_version': item.meta.device.system.browser.version,
                                    'state': item.state,
                                    'status': item.status,
                                    'unread_operator': item.unread.operator,
                                    'unread_visitor': item.unread.visitor,
                                    'data': item.meta.data,
                                    'segments': item.meta.segments,
                                    'website_crisp_id': item.website_id,
                                    'people_crisp_id': item.people_id,
                                    'operator_crisp_id': item.assigned ? item.assigned.user_id : null
                                }
                                
                                if (conversationExists) {
                                    conversationExists.merge(conversation);
                                    await conversationExists.save();
                                    response.push({ crisp_id: item.session_id, msg: "Conversa " + item.session_id + ' atualizada com sucesso!' });
                                } else {
                                    await Conversation.create(conversation);
                                    response.push({ crisp_id: item.session_id, msg: "Conversa " + item.session_id + ' adicionada com sucesso!' });
                                }

                                this.saveMessages( {params: {conversation: item.session_id}} );
                            }
                        } catch (e) {
                            response.push({ crisp_id: item.people_id, msg: 'Erro ao adicionar!', erro: e.toString() });
                        }
                    });
                    await Promise.all(promises);
                } catch (e) {
                    return { erro: e.toString() };
                }

                if (params.page == 'all') {
                    page++;
                } else {
                    execute = false;
                }
            } else {
                execute = false;
            }
        }
        return { status: 200, data: response };
    }

    async saveMessages({ params }){
        const response = [];
        let conversation = params.conversation;

        if (!conversation) {
            return { erro: "Não é possível buscar mensagens sem informar uma conversa" };
        }

        try {
            const messages = await Crisp.listMessages(conversation);

            const promises = messages.map(async (item, idx) => {
                try {
                    let message = [];
                    let [messageExists] = await Message.query()
                                                       .where('session_id', item.session_id)
                                                       .where('datetime', new Date(item.timestamp).toISOString())
                                                       .count();
                    
                    if (messageExists.count == 0) {
                        message = {
                            'session_id': item.session_id,
                            'type': item.type,
                            'from': item.from,
                            'origin': item.origin,
                            'content': item.type == 'field' || item.type == 'picker' ? item.content.text : item.content,
                            'user_nickname': item.user.nickname,
                            'delivered': item.delivered,
                            'read': item.read,
                            'datetime': new Date(item.timestamp).toISOString()
                        }

                        response.push({ crisp_id: item.session_id, msg: "Mensagem da conversa " + item.session_id + ' adicionada com sucesso!' });
                        await Message.create(message);
                    }
                } catch (e) {
                    response.push({ crisp_id: item.people_id, msg: 'Erro ao adicionar!', erro: e.toString() });
                }
            });
            await Promise.all(promises);
        } catch (e) {
            return { erro: e.toString() };
        }

        return { status: 200, data: response };
    }
}

module.exports = SuportController
