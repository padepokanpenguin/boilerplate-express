export interface IError {
	status?: number;
	data: any;
	message: string;
}

class ApiError extends Error implements IError {
	public status = 500;
	public success = false;
	public data:any;

	constructor(msg: string, statusCode: number, data: any) {
		super();
		this.message = msg;
		this.status = statusCode;
		this.data = data
	}
}

export default ApiError;