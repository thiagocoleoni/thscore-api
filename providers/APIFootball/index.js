'use strict'

require('dotenv/config');
const axios = require('axios');
const moment = require('moment');

class APIFootball {

    // constructor() {
    //     this.url = 'https://v3.football.api-sports.io';
    //     axios.defaults.headers.get['x-apisports-key'] = '133c752114eecde74c3bfed7d1abbbdb';
    // }

	constructor() {
        axios.defaults.headers.get['x-apisports-key'] = process.env.APISPORTS_key;
    }

    // Main call method, returning a Promise
	// callAPI(method, url, data = null) {
	// 	try {
	// 		return new Promise(function(resolve, reject) {
	// 			axios({
	// 				method: method,
	// 				// url: 'https://v3.football.api-sports.io' + url,
	// 				url: this.url + url,
	// 				params: data
	// 			})
	// 			.then(function (response) {
	// 				resolve({ data: response.data.response,
	// 					status: response.status,
	// 					error: null });
	// 			})
	// 			.catch(function (error) {
	// 				if (error.response) {
	// 					resolve({ data: null,
	// 						status: error.response.status,
	// 						error: error.response.data });
	// 				} else {
	// 					resolve({ data: null,
	// 						status: 500,
	// 						error: error });
	// 				}
	// 			})
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// Main call method, returning a Promise
	callAPI(method, endpoint, data = null) {
		try {
			return new Promise(function(resolve, reject) {
				axios({
					method: method,
					url: process.env.APISPORTS_URL + endpoint,
					params: data
				})
				.then(function (response) {
					resolve({ data: response.data.response,
						status: response.status,
						error: null });
				})
				.catch(function (error) {
					if (error.response) {
						resolve({ data: null,
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

	async getLive() {
		let api = await this.callAPI('GET', '/fixtures', { live: 'all' });
		
		let response = [];
		api.data.forEach(async function (item, index) {
			response.push({
				id: item.fixture.id,
				datetime: item.fixture.date,
				status_long: item.fixture.status.long,
				status_short: item.fixture.status.short,
				status_elapsed: item.fixture.status.elapsed,

				id_league: item.league.id,
				name_league: item.league.name,
				country_league: item.league.country,
				flag_league: item.league.flag,
				season_league: item.league.season,
				round_league: item.league.round,

				id_home: item.teams.home.id,
				name_home: item.teams.home.name,
				logo_home: item.teams.home.logo,
				score_home: item.goals.home,

				id_away: item.teams.away.id,
				name_away: item.teams.away.name,
				logo_away: item.teams.away.logo,
				score_away: item.goals.away,
			});
		});
		
		return { response: response, status: api.status, error: api.error };
	}

	async getMatches(data) {
		let api = await this.callAPI('GET', '/fixtures', data);

		let response = [];
		api.data.forEach(async function (item, index) {
			response.push({
				id: item.fixture.id,
				date: moment(item.fixture.date).format('YYYY-MM-DD'),

				id_league: item.league.id,
				name_league: item.league.name,
				country_league: item.league.country,
				flag_league: item.league.flag,
				season_league: item.league.season,
				round_league: item.league.round,

				id_home: item.teams.home.id,
				name_home: item.teams.home.name,
				logo_home: item.teams.home.logo,
				score_home: item.goals.home,

				id_away: item.teams.away.id,
				name_away: item.teams.away.name,
				logo_away: item.teams.away.logo,
				score_away: item.goals.away,
			});
		});

		return { response: response, status: api.status, error: api.error };
	}


}

module.exports = APIFootball