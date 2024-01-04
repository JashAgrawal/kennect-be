import { Container } from 'typedi';
import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from './logger';
// import agendaFactory from './agenda';
import config from '../config';

export default ({  models }: { models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });
    Container.set('logger', LoggerInstance);

    // const agendaInstance = agendaFactory({ mongoConnection });
    // const mgInstance = new Mailgun(formData);
    // Container.set('agendaInstance', agendaInstance);
    // Container.set('emailClient', mgInstance.client({ key: config.emails.apiKey, username: config.emails.apiUsername }));
    // Container.set('emailDomain', config.emails.domain);

    LoggerInstance.info('✌️ Agenda injected into container');
    const throwError = (code = 500, message = 'huh!') => {
      let error: any = new Error(message);
      error.status = code;
      throw error;
    };
    Container.set('throwError', throwError);
    return { agenda: '' };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
