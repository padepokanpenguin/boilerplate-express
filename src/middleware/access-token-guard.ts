import {NextFunction, Request, Response} from "express";
import { BaseResponse } from "../abstractions/base-response";

/**
 * Register all unguarded resources here
 */
const unguardedResources: Array<string> = [];

export default async (request: Request, response: Response, next: NextFunction) => {
  if(unguardedResources.includes(request.baseUrl + request.path)){
    /**
     * If the uri is registered in exception,
     * proceed to the resource.
     */

    next();
  }else {

    /**
     * If uri is not registered as unguarded resources,
     * check token validity
     */

    if(typeof request.headers.authorization == 'undefined'){
      return response.status(401).json(new BaseResponse("401", "Unauthorized."))
    }else {

      const token = request.headers.authorization

      if(!token){
        return response.status(401).json(new BaseResponse("403", "Invalid access token."))
      }

      next();
    }

  }
}