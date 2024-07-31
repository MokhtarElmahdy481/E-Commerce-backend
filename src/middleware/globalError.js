const globalError = (error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ message: error.message, status: error.status || 500 });
};
export default globalError;
