/**
 * @file Index file for the weeb.sh Wrapper.
 * @author WizardLink
 */

const { get, post } = require('snekfetch');
const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

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
	 * @description A function to receive the parsed object of the request.
	 * @param {string} endpoint Which endpoint of the api that will be requested to.
	 * @param {Object} query The query of the request.
	 * @param {boolean} toPost If it is a post request.
	 * @return {Promise<Object>}
	 */
	async requestToAPI(endpoint = '', query = {}, toPost = false) {
		let request = toPost
			? post(`${WeebWrapper.baseURL}/${endpoint}`).send(query)
			: get(`${WeebWrapper.baseURL}/${endpoint}`).query(query);

		request.set({ Authorization: this.token });

		request = await request;

		return JSON.parse(request.text);
	}

	/**
	 * @description Basic information about the API (And version control).
	 * @static
	 * @return {Promise<Object>}
	 */
	static info() {
		return this.requestToAPI();
	}

	/**
	 * @description Fetch a random (type/tag) image from the API.
	 * @param {string} type The type or tag you want to retrieve an image from.
	 * @return {Object}
	 * @param {Object} [options = {}] The query options.
	 * @param {boolean} [options.hidden] Includes hidden images that can be received.
	 * @param {boolean} [options.nsfw] Includes nsfw images that can be received.
	 * @param {string} [options.filetype] If you want to receive a specific file format only.
	 * @return {Promise<Object>}
	 */
	random(type, { hidden, nsfw, filetype } = {}) {
		if (!type) throw new TypeError('You must provide a type or a tag!');

		return this.requestToAPI('random', { type, hidden, nsfw, filetype });
	}

	/**
	 * @description Fetch the current image tags for the weeb.sh API.
	 * @param {boolean} [hidden] Include hidden tags when fetching.
	 * @return {Promise<Object>}
	 */
	tags(hidden = false) {
		return this.requestToAPI('tags', { hidden });
	}

	/**
	 * @description Fetch the current image types for the weeb.sh API.
	 * @param {boolean} [hidden] Include hidden tags when fetching.
	 * @return {Promise<Object>}
	 */
	types(hidden = false) {
		return this.requestToAPI('types', { hidden });
	}

	/**
	 * @description Upload an image to the weeb.sh API.
	 * @param {Buffer} file The file to be uploaded.
	 * @param {string} type The type of the image being uploaded.
	 * @param {Object} [options] The additional data of the image.
	 * @param {boolean} [options.nsfw] If the image is NSFW or not.
	 * @param {string} [options.source] The image's source (Link or Anime).
	 * @param {string} [options.tags] The image's tags (Seperated by commas).
	 * @return {Promise<Object>}
	 */
	async upload(file, type, { nsfw, source, tags } = {}) {
		if (!file) throw new Error('You must provide a file to be uploaded!');
		if (!type) throw new Error('You must provide a type to be set to the file!');

		if (typeof file === 'string') {
			file = await readFileAsync(file);
		}

		if (file instanceof Buffer) return this.requestToAPI('upload', { file, type, nsfw, source, tags }, true);

		throw new Error('The file parameter is not a Buffer or a String');
	}
}

module.exports = WeebWrapper;
