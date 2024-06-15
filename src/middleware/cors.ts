import { NextFunction, Request, Response } from 'express';

/**
 * cors.ts
 *  This middleware contain 
 */

export default (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if(req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    return res.status(200).json({});
  }

  next();
};