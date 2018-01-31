/**
 * @file Index file for the weeb.sh Wrapper.
 * @author WizardLink
 */

const { get, post } = require('snekfetch');

class WeebWrapper {
	constructor(token) {
		if (!token) throw new Error('You must put a token to use non-static methods.');
		if (typeof token !== 'string') throw new TypeError('The token you provided is not a string.');

		if (/^(Bearer|Wolke) /.test(token)) this.token = token;
		else if (token.length > 100) this.token = `Bearer ${token}`;
		else this.token = `Wolke ${token}`;
	}

	/**
	 * @description Base URL for reaching weeb.sh's endpoints.
	 * @static
	 * @return {string}
	 */
	static get baseURL() {
		return 'https://api.weeb.sh/images';
	}

	/**
	 * @description Basic information about the API (And version control).
	 * @static
	 * @return {Object}
	 */
	static info() {
		return get(WeebWrapper.baseURL);
	}

	/**
	 * @description Fetch a random (type/tag) image from the API.
	 * @param {string} type The type or tag you want to retrieve an image from.
	 * @return {Object}
	 * @param {Object} [options = {}] The query options.
	 * @param {boolean} [options.hidden] Includes hidden images that can be received.
	 * @param {boolean} [options.nsfw] Includes nsfw images that can be received.
	 * @param {string} [options.filetype] If you want to receive a specific file format only.
	 * @return {Object}
	 */
	random(type, { hidden, nsfw, filetype } = {}) {
		if (!type) throw new TypeError('You must provide a type or a tag!');

		return get(`${WeebWrapper.baseURL}/random`)
			.query({ hidden, nsfw, filetype })
			.set({ Authorization: this.token });
	}

	/**
	 * @description Fetch the current image tags for the weeb.sh API.
	 * @param {boolean} [hidden] Include hidden tags when fetching.
	 * @return {Object}
	 */
	tags(hidden = false) {
		return get(`${WeebWrapper.baseURL}/tags`)
			.query({ hidden })
			.set({ Authorization: this.token });
	}

	/**
	 * @description Fetch the current image types for the weeb.sh API.
	 * @param {boolean} [hidden] Include hidden tags when fetching.
	 * @return {Object}
	 */
	types(hidden = false) {
		return get(`${WeebWrapper.baseURL}/types`)
			.query({ hidden })
			.set({ Authorization: this.token });
	}

	/**
	 * @description Upload an image to the weeb.sh API.
	 * @param {Buffer} file The file to be uploaded.
	 * @param {string} type The type of the image being uploaded.
	 * @param {Object} [options] The additional data of the image.
	 * @param {boolean} [options.nsfw] If the image is NSFW or not.
	 * @param {string} [options.source] The image's source (Link or Anime).
	 * @param {string} [options.tags] The image's tags (Seperated by commas).
	 * @return {Object}
	 */
	upload(file, type, { nsfw, source, tags } = {}) {
		if (!file) throw new TypeError('You must provide a file to be uploaded!');
		if (!type) throw new TypeError('You must provide a type to be set to the file!');

		return post(`${WeebWrapper.baseURL}/upload`)
			.set({ Authorization: this.token })
			.send({ nsfw, source, tags });
	}
}

module.exports = WeebWrapper;
