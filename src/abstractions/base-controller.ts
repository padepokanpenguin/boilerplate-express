import {validationResult} from "express-validator";
import {Request} from "express";
import RequestValidationException from "./exceptions/request-validation-exceptions";

export abstract class BaseController {

  /**
   * requestValidator
   * 
   * This function is an extract method to make sure
   * that validation through request is right.
   * 
   * If it has a validation error within, throw RequestValidationException
   * 
   * @see RequestValidationException
   * 
   * @param request 
   */
  public requestValidator(request: Request) {

    const errors = validationResult(request);

    console.log(errors);

    if(!errors.isEmpty()){
        
      throw new RequestValidationException(
        errors.array()
      );
    }
  }

}