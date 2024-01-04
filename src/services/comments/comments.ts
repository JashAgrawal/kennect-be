import Helper from '@/helpers';
import { Service, Inject } from 'typedi';
@Service()
export default class commentsService {
  constructor(
    @Inject('commentsModel') private commentsModel,
    @Inject('postsModel') private postsModel,
    @Inject('throwError') private throwError,
    // private mailer: MailerService,
    @Inject('logger') private logger, // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async Addcomments(req): Promise<{ Data: any }> {
    try {
      const { text, userId, postId } = req.body;
      const body = { text, userId, postId };
      const res = await this.commentsModel.create(body);
      return { Data: res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async Updatecomments(req): Promise<{ Data: any }> {
    try {
      const { commentId, text } = req.body;
      const filter = { commentId };
      const update = { commentId, text };
      const res = await this.commentsModel.findOneAndUpdate(filter, update, { useFindAndModify: false });
      const new_res = await this.commentsModel.findOne(filter);
      return { Data: new_res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async getcomments(req): Promise<{ Data: any }> {
    try {
      const { postId } = req.params;
      const res = await this.commentsModel.find({ postId });
      return { Data: res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async getcommentsById(req): Promise<{ Data: any }> {
    try {
      const { commentId } = req.body;
      const filter = { _id: commentId };
      const new_res = await this.commentsModel.findOne(filter);
      return { Data: new_res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async Deletecomments(req): Promise<{ Data: any }> {
    try {
      const { commentId, postId, userId } = req.body;
      const filter = { commentId };
      const comment = await this.commentsModel.findOne(filter);
      if (comment.userId != userId) {
        return { Data: { message: 'Access Denied' } };
      }
      const res = await this.commentsModel.findOneAndDelete(filter);
      const new_res = await this.commentsModel.findOne(filter);
      return { Data: new_res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
}
