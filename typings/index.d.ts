interface IWeebWrapperResponse {
	status: number;
	id: string;
	type: string;
	baseType: string;
	nsfw: boolean | string;
	fileType: string;
	mimeType: string;
	account: string;
	hidden: boolean;
	tags: string[];
	url: string;
}

interface IWeebInfo {
	version: string;
	message: string;
	status: number;
}

export class WeebWrapper {
	public static readonly baseURL: string;
	public static readonly info: Promise<IWeebInfo>;

	public requestToAPI(
		query: object,
		toPost: boolean,
		endpoint?: string,
	): Promise<IWeebWrapperResponse | string[]>;

	public random(
		type: string,
		{ hidden, nsfw, filetype }: { hidden: boolean, nsfw: boolean, filetype: string},
	): Promise<IWeebWrapperResponse>;

	public tags(hidden: boolean): Promise<string[]>;
	public types(hidden: boolean): Promise<string[]>;
	public upload(
		file: string | Buffer,
		type: string,
		{ nsfw, source, tags }: { nsfw: boolean, source: string, tags: string },
	): Promise<IWeebWrapperResponse>;
}
