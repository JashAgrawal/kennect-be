import { Container } from 'typedi';
const jwt = require('jsonwebtoken');
import StatusCodeHelper from '../../../helpers/StatusCodes';

const isLogedIn = async (req, res, next) => {
  try {
    const throwError = Container.get('throwError') as Function;
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function (err, decoded) {
        if (decoded?._id) {
          // console.log(decoded);
          req.body.userId = decoded?._id;
          req.body.name = decoded?.name;
          req.body.email = decoded?.email;
          next();
          return;
        } else {
          throwError(StatusCodeHelper.Unauthorized, 'Unauthorized1');
        }
      });
    } else {
      throwError(StatusCodeHelper.Unauthorized, 'Unauthorized2');
    }
    return;
  } catch (e) {
    return next(e);
  }
};

export default isLogedIn;
