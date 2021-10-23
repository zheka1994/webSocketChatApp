import mongoose from 'mongoose';
import appConfig from '../../configurations/appConfig.local.js';
import {User} from './models/index.js';

export function connectDb() {
  mongoose.connect(appConfig.connectionString);
  // необходимо для использования глобальной библиотеки промисов
  mongoose.Promise = global.Promise;
  const connection = mongoose.connection;
  return connection;
}

export async function addUser(userRequest) {
  const user = new User({
    firstName: userRequest?.firstName,
    lastName: userRequest?.lastName,
    phoneNumber: userRequest?.phoneNumber,
    email: userRequest?.email,
  });
  try {
    await User.create(user);
  } catch (exception) {
    console.log(exception);
    throw exception;
  }
}

export async function getUserByPhoneNumber(phoneNumber) {
  const user = await User.findOne({phoneNumber});
  return user;
}
