const loggerMiddleware = (store) => (next) => (action) => {
  console.log(
    `[LOG]: ${action.type} - ${new Date().toString()}`
  );
  next(action);
};
export default loggerMiddleware
