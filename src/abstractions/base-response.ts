import { Response } from "express";

export class BaseResponse {
    public status = false;
    public code?: number | string = "500";
    public message = "Internal Server Error";
    public data!: any;
  
    public constructor(code = "500", message = "") {
      this.code = code;
      this.message = message;
      this.status = false;
      this.data = null;
    }

    static ok(data: any, message: string, res: Response, code = "200"): Response {
        const baseResponse = new BaseResponse();
    
        baseResponse.status = true;
        baseResponse.code = code;
        baseResponse.message = message;
        baseResponse.data = data || null;

        return res
            .status(200)
            .json((
                baseResponse
            ));
    }
    
    static error(message: string, res: Response, code = "500", data?: any | null): Response {
        const baseResponse = new BaseResponse();
    
        baseResponse.status = false;
        baseResponse.code = code;
        baseResponse.message = message;
        baseResponse.data = data || null;
        
        return res
            .status(500)
            .json((
            baseResponse
            ));
        }
    
}

