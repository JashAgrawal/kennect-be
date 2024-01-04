import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import Auth from '../../../services/Auth/Auth';
import path from 'path';
// import fs from 'fs-extra';
import responseHandler from 'express-response-handler';
class Auth_Class {
  Sign_Up = async (req: Request, res: Response | responseHandler, next: NextFunction) => {
    try {
      const authServiceInstance = Container.get(Auth);
      const { Data } = await authServiceInstance.Sign_Up(req);
      let { user, token } = Data;
      return res.success.success('Success', Data);
    } catch (e) {
      console.log('🔥 error: %o', e);
      return next(e);
    }
  };
  isValid = async (req: Request, res: Response | responseHandler, next: NextFunction) => {
    try {
      const authServiceInstance = Container.get(Auth);
      const { Data } = await authServiceInstance.isValid(req);
      let { user, token } = Data;
      return res.success.success('Success', Data);
    } catch (e) {
      console.log('🔥 error: %o', e);
      return next(e);
    }
  };
  Login = async (req: Request, res: Response | responseHandler, next: NextFunction) => {
    try {
      const AuthInstance = Container.get(Auth);
      let resp = await AuthInstance.SignIn(req);
      res.cookie('User_token', resp.Data.Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });
      return res.success.success('Login Success', resp.Data);
    } catch (e) {
      return next(e);
    }
  };
  Forgot_Password = async (req: Request, res: Response | responseHandler, next: NextFunction) => {
    try {
      const authServiceInstance = Container.get(Auth);
      const { Data } = await authServiceInstance.Forgot_Password(req);
      let { user, token } = Data;
      return res.success.success('Success', Data);
    } catch (e) {
      console.log('🔥 error: %o', e);
      return next(e);
    }
  };
}

export default new Auth_Class();
