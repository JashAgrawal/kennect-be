import Helper from '../../helpers';
import Comments from '../../models/comments/comments';
import { Service, Inject } from 'typedi';
@Service()
export default class postsService {
  constructor(
    @Inject('postsModel') private postsModel,
    @Inject('throwError') private throwError,
    // private mailer: MailerService,
    @Inject('logger') private logger, // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async Addposts(req): Promise<{ Data: any }> {
    try {
      const { text, comments, userId } = req.body;
      const body = { text, comments, userId };
      const res = await this.postsModel.create(body);
      return { Data: res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async Updateposts(req): Promise<{ Data: any }> {
    try {
      const { post_id, text } = req.body;
      const filter = { post_id };
      const update = { text };
      const res = await this.postsModel.findOneAndUpdate(filter, update, { useFindAndModify: false });
      const new_res = await this.postsModel.findOne(filter);
      return { Data: new_res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async getposts(req): Promise<{ Data: any }> {
    try {
      const { page, limit } = req.query;
      const res = await this.postsModel
        .find({})
        .skip(req.body.page ? req.body.page * 10 : 0)
        .limit(req.body.limit ? req.body.limit : 10)
        .sort({ updatedAt: -1 })
        .populate('userId');
      return { Data: res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async getpostsById(req): Promise<{ Data: any }> {
    try {
      const { postId } = req.params;
      const filter = { _id: postId };
      const post = await this.postsModel.findOne(filter).populate('userId');
      const comments = await Comments.find({ postId: postId }).populate('userId');
      return { Data: { post, comments } };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async Deleteposts(req): Promise<{ Data: any }> {
    try {
      const { post_id, userId } = req.body;
      const filter = { _id: post_id };
      const post = await this.postsModel.findOne(filter);
      if (post.userId != userId) {
        return { Data: { message: 'Access Denied' } };
      }
      const res = await this.postsModel.findOneAndDelete(filter);
      const new_res = await this.postsModel.findOne(filter);
      return { Data: new_res };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
  public async searchPosts(req): Promise<{ Data: any }> {
    try {
      const { query } = req.query;
      const posts = await this.postsModel
        .find({ $text: { $search: query } })
        .lean()
        .populate('userId');
      const comments = await Comments.find({ $text: { $search: query } })
        .lean()
        .populate({
          path: 'postId',
          populate: {
            path: 'userId',
            model: 'User',
          },
        })
        .populate('userId');
      return { Data: { posts, comments } };
    } catch (e) {
      this.logger.error(e);
      this.throwError(Helper.StatusCodes.InternalError, 'something went wrong');
    }
  }
}
