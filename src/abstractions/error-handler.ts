import { Response} from 'express';
import ApiError, { IError } from './api-error';
import { BaseResponse } from './base-response';


export const handleError = (res: Response, err: IError): Response => {
    console.error("Unhandled Exception", JSON.stringify(err.message));
    const { status, message, data } = err;
  
    return BaseResponse.error(message, res, status?.toString(), data);
  }

// const ErrorHandler = (
// 	err: ApiError,
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ): void => {
// 	if (err) {
// 		const status: number = err.status || 500;
// 		console.error(`REQUEST HANDLING ERROR:
//         \nERROR:\n${JSON.stringify(err)}
//         \nREQUEST HEADERS:\n${util.inspect(req.headers)}
//         \nREQUEST PARAMS:\n${util.inspect(req.params)}
//         \nREQUEST QUERY:\n${util.inspect(req.query)}
//         \nBODY:\n${util.inspect(req.body)}`);
// 		const body: IError | string = {
// 			fields: err.fields,
// 			message: err.message || 'An error occurred during the request.',
// 			name: err.name,
// 			status,
// 		};
// 		res.status(status);
// 		res.send(body);
// 	}
// 	next();
// };

// export default ErrorHandler;