'use strict'

// require('dotenv/config');
const axios = require('axios');

class Crisp {
	constructor() {		
		axios.defaults.headers.get['X-Crisp-Tier'] = 'plugin';
		axios.defaults.headers.get['Content-Type'] = 'application/json';
    }

	// Main call method, returning a Promise
	callAPI(method, endpoint, data = null) {
		try {
			return new Promise(function(resolve, reject) {
				axios({
					method: method,
					url: 'https://api.crisp.chat/v1/website/f12b329c-3423-44ce-a89d-c749db3d4836' + endpoint,
					params: data,
					auth: {
						username: '21a39ef3-86a4-43d6-a5c8-3c12ff9c481e',
						password: 'f13952f2410b7844b59f877c30cf1db8139a704e011d2ab28c440831d878bcb5'
					}
				})
				.then(function (response) {
					resolve({ data: response.data.data,
						status: response.status,
						error: null });
				})
				.catch(function (error) {
					if (error.response) {
						resolve({ data: error,
							status: error.response.status,
							error: error.response.data });
					} else {
						resolve({ data: null,
							status: 500,
							error: error });
					}
				})
			});
		} catch (error) {
			console.log(error);
		}
	}

	/////////////////////
	//    API Calls    //
	/////////////////////
	async listOperators() {
		let api = await this.callAPI('GET', '/operators/list', {});
		return api.data;
	}

	async listPeople( page ) {
		let api = await this.callAPI('GET', '/people/profiles/' + (page ? page : 1), {});
		return api.data;
	}

	async listConversations( page ) {
		let api = await this.callAPI('GET', '/conversations/' + (page ? page : 1), { order_date_updated: 1});
		return api.data;
	}

	async listMessages( conversation ) {
		let api = await this.callAPI('GET', '/conversation/' + conversation + '/messages');
		return api.data;
	}
}

module.exports = Crisp