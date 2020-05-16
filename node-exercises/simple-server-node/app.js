// buddy
const testController = require('./controller/test');
const signupController = require('./controller/signUp');
const loginController = require('./controller/login');
const userInfoController = require('./controller/userInfo');
const Buddy = require('./lib/server');
// const routes = require('./routes');

const config = {
  httpsOptions: {},
}

const buddyServer = new Buddy(config);

const bodyMiddleware = () => {
  console.log("bodyMiddleware");
}

const parser = async () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise middleware"), 1000);
  });
  // wait until the promise resolves (*)
  let result = await promise;
  console.log(result);
  return result;
}

buddyServer.route({
  method: 'POST',
  path: '/api/v1/signup',
  middlewares: [bodyMiddleware],
  hadnler: signupController
})

buddyServer.route({
  method: 'POST',
  path: '/api/v1/login',
  middlewares: [bodyMiddleware],
  hadnler: loginController
})

buddyServer.route({
  method: 'GET',
  path: '/api/v1/user/:id',
  middlewares: [],
  hadnler: userInfoController
})

buddyServer.route({
  method: 'GET',
  path: '/get/user',
  middlewares: [bodyMiddleware],
  handler: testController
})


buddyServer.route({
  method: 'GET',
  path: '/get/user/:id/:name/:age',
  middlewares: [bodyMiddleware],
  handler: testController
})


buddyServer.addMiddleware([parser]);
buddyServer.start(8000);