import { Request, Response } from "express";
import { BaseController } from "../../abstractions/base-controller";
import { BaseResponse } from "../../abstractions/base-response";
import { IExampleHandler } from "./exampleHandler/IExampleHandler";
import { ExampleHandler } from "./exampleHandler/exampleHandler";
import { ActivityLogWritter } from "../../config/activity-logger";

class ExampleController extends BaseController {
    private handler: IExampleHandler = new ExampleHandler()

    UserController = async(request: Request, response: Response) => {
        try {

            const result = await this.handler.handleGetUSer()

            ActivityLogWritter.logWriter("WRITE_ACTIVITY_LOG",{
                request: request,
                response: response,
                log_type: "ACTIVITY",
                activity: "GET_USER",
                payload: {
                    data: result
                }
            })
            return BaseResponse.ok(result, "Success", response)
        } catch (error: any) {
            return BaseResponse.error(error, response)
        }
    }
}

export default new ExampleController()