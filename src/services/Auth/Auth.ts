import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import Helper from '../../helpers';
@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel,
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}

  public async Sign_Up(req: any): Promise<{ Data: any }> {
    const salt = randomBytes(32);
    console.log('Signup');
    const { Email, Password, Name } = req.body;
    const hashedPassword = await argon2.hash(Password, { salt });

    if (Email == (null || undefined) || Password == (null || undefined) || Name == (null || undefined)) {
      this.throwError(Helper.StatusCodes.BadRequest, 'Please provide valid data');
    }
    const User = {
      Name,
      Email,
      Password: hashedPassword,
    };
    const res = await this.userModel.create(User);
    return { Data: { res, id: res._id } };
  }

  public async SignIn(req): Promise<{ Data: any }> {
    const { Email, Password } = req.body;
    const userdata = await this.userModel.findOne({ Email });
    if (!userdata) {
      throw new Error('User not registered');
    }
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userdata.Password, Password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userdata);

      const user = userdata.toObject();
      return { Data: { user, token } };
    } else {
      throw new Error('Invalid Password');
    }
  }
  public async Forgot_Password(req: any): Promise<{ Data: any }> {
    const { Email, Password } = req.body;
    if (Email == (null || undefined) || Password == (null || undefined)) {
      this.throwError(Helper.StatusCodes.BadRequest, 'Please provide valid data');
    }
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(Password, { salt });
    const res = await this.userModel.findByIdAndUpdate(
      { Email },
      { Password: hashedPassword },
      { useFindAndModify: false },
    );
    if (res) {
      return { Data: 1 };
    } else {
      this.throwError(Helper.StatusCodes.NotFound, `User with Email ${Email} not found`);
    }
  }
  public async isValid(req: any): Promise<{ Data: any }> {
    if (req.body.userId) {
      return { Data: req.body };
    } else {
      this.throwError(Helper.StatusCodes.Unauthorized, `Unauthorized`);
    }
  }
  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.Role,
        name: user.Name,
        email: user.Email,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET,
    );
  }
}
