import express, { NextFunction, Request, Response } from 'express';
import middleware from './middleware';
require('dotenv').config();
import config from './config/config';
import { BaseResponse } from './abstractions/base-response';
import ApiError from './abstractions/api-error';
import { handleError } from './abstractions/error-handler';

import "./config/db"
import { ActivityLogWritter } from './config/activity-logger';
import routes from './routes';

const server = express;
const app = server();
const router = server.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
    const date = new Date();

    const data = {
        app: config.server.app,
        "app_time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "time": date.toLocaleString()
    }

    return BaseResponse.ok(data, "This service is running", res)
})

middleware.forEach(e => app.use(e))

router.use('/api', routes);

app.use((error: ApiError, request: Request, response: Response, next: NextFunction) => {
    if (error) {
        ActivityLogWritter.logWriter('WRITE_SYSTEM_LOG', {
            request: request,
            response: response,
            log_type: 'SYSTEM_ERROR',
            activity: `Error system in System Service at ${new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta", dateStyle: 'full', timeStyle: 'long'})}`,
            payload: {
                data: JSON.stringify(error),
            }
        });
        BaseResponse.error("Internal Server Error", response, error.status.toString() || "500" );
        handleError(response, error);
    } else {
        next();
    }
  });


app.listen(config.server.port, () => {
    console.log('Server is running on port ' + config.server.port + '...');
})