interface IWeebWrapperResponse {
	status: number;
	id: string;
	type: string;
	baseType: string;
	nsfw: boolean | 'only';
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
	public static info(): Promise<IWeebInfo>;

	public constructor(token: string);

	public requestToAPI(
		endpoint?: string,
		query?: object,
		toPost?: boolean,
	): Promise<IWeebWrapperResponse | string[]>;
	public random(
		type: string,
		options?: { hidden?: boolean, nsfw?: boolean, filetype?: string},
	): Promise<IWeebWrapperResponse>;
	public tags(hidden?: boolean): Promise<string[]>;
	public types(hidden?: boolean): Promise<string[]>;
	public upload(
		file: string | Buffer,
		type: string,
		options?: { nsfw?: boolean, source?: string, tags?: string },
	): Promise<IWeebWrapperResponse>;
}
