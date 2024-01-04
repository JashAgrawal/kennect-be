import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  await dependencyInjectorLoader({
    models: [
      {
        name: 'postsModel',
        // Notice the require syntax and the '.default'
        model: require('../models/posts/posts').default,
      },
      {
        name: 'commentsModel',
        // Notice the require syntax and the '.default'
        model: require('../models/comments/comments').default,
      },
      {
        name: 'userModel',
        model: require('../models/Auth/Auth').default,
      },
      //list models here...?
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
