const { get } = require('snekfetch');

module.export = class WeebAPI {
	constructor(token) {
		if (token) {
			if (!(/^Bearer|Wolke$/.exec(token))) {
				throw new TypeError(
					'The token you have put does not haves a \x1b[31mBearer\x1b[0m or \x1b[33mWolke\x1b[0m on it.'
				);
			}
			this.token = token;
		} else {
			this.token = false;
		}
	}

	get baseURL() {
		return 'https://api.weeb.sh/images';
	}

	parseURL(endpoint = '') {
		return `${this.baseURL}/${endpoint}`;
	}

	static info() {
		return get(this.parseURL());
	}

	tags(hidden = false) {
		const request = get(this.parseURL('tags'))
			.query({ hidden });
		if (this.token) request.set('Authorization', this.token);

		return request;
	}

	types(hidden = false) {
		console.log(this.parseURL('types'));
		const request = get(this.parseURL('types'))
			.query({ hidden });
		if (this.token) request.set('Authorization', this.token);

		return request;
	}

	random(type, { tags, hidden, nsfw, filetype } = {}) {
		const request = get(this.parseURL('random'))
			.query({ type, tags, hidden, nsfw, filetype });
		if (this.token) request.set('Authorization', this.token);

		return request;
	}
};
