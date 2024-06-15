import {ValidationError} from "express-validator";
import ApiError from "../api-error";

export default class RequestValidationException extends ApiError {

  constructor(errorMessage: Array<ValidationError>) {
    super(
        `Bad Request - ${(errorMessage[0].msg)}`,
        400,
        errorMessage
    );
  }
};