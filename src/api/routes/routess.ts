import { Router } from 'express';
import middlewares from '../middlewares';
import Validation from '../validations';
import Controller from '../controllers';
const route = Router();
const App_Name = 'Auto';
export default (app: Router) => {
  app.use('/' + App_Name, route);

  route.post('/Login', Controller.Auth.Login);
  route.post('/SignUp', Controller.Auth.Sign_Up);
  route.post('/ForgotPassword', Controller.Auth.Forgot_Password); //authHere?
  route.get('/search', Controller.posts.searchPosts);
  route.use(middlewares.isLogedin);
  route.get('/isValidAuth', Controller.Auth.isValid);
  route.post('/create-posts', Controller.posts.Add_posts);
  route.get('/get-posts', Controller.posts.getposts);
  route.post('/update-posts', Controller.posts.Update_posts);
  route.get('/getById-posts/:postId', Controller.posts.getpostsByID);
  route.post('/delete-posts', Controller.posts.Delete_posts);

  route.post('/create-comments', Controller.comments.Add_comments);
  route.post('/update-comments', Controller.comments.Update_comments);
  route.get('/get-comments', Controller.comments.getcomments);
  route.get('/getById-comments', Controller.comments.getcommentsByID);
  route.post('/delete-comments', Controller.comments.Delete_comments);
  //addHere?
};
