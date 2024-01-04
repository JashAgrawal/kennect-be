import { Container } from 'typedi';

import Helper from '../../helpers';

const UserRules = (Obj) => {

    return async (req, res, next) => {
        try {
            // How to Use
            // what kind of operation can i perform to another type of user in it's array
            // middlewares.UserRules({user:['owner','admin'],admin:['owner']})

            const userModel = Container.get('userModel') as Function;
            const throwError = Container.get('throwError') as Function;

            let user = await userModel(req.headers['community-name']).findOne({ _id: req.body.userID });
            if (!user) throwError(Helper.StatusCodes.NotFound, 'User Not Found');

            let Roles = Obj[user.role] || [];
            if (!(Roles.includes(req.currentUser.role))) {
                throwError(Helper.StatusCodes.BadRequest, 'you dont have rights');
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}
export default UserRules;