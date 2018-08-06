import { doGet, include } from './server/webapp';
import './es6';

global.doGet = doGet;
global.include = include;

global.sendmail = (email = 'amit@labnol.org') => {
  Logger.log(`________________ sendEmail ${email}`);
  // GmailApp.sendEmail(email, 'It works!', 'Hello Google Apps Script');
};
