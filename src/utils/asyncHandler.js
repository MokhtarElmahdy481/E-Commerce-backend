import AppError from "./AppError.js"

const asyncHandler = (cb) => {
    return (req,res,next)=> {
        cb(req,res,next)
        .catch(error=>{
            return next(new AppError(error.message,error.status))
        })
    }
}
export default asyncHandler;