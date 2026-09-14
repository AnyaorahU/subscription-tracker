// const errorMiddleware = (err, req, res, next) => {
//   try {
//     let error = { ...err };
//     error.message = err.message;
//     console.error(error);

//     //mongodb bad Object
//     if (err.name == "CastError") {
//       const message = "Resource not Found";
//       error = new Error(message);
//       error.statusCode = 404;
//     }

//     //mongodb dublicate key
//     if (err.code === 11000) {
//       const message = "Dublicate field value entered";
//       error = new Error(message);
//       error.statusCode = 400;
//     }

//     //validation error
//     if (err.name === "ValidationError") {
//       const message = Object.values(err.errors).map((val) => val.message);
//       ((error = new Error(message.join(", "))), (error.statusCode = 400));
//     }

//     res
//       .status(error.statusCode || 500)
//       .json({ success: false, error: error.message || "Server Error" });
//   } catch (error) {
//     next(error);
//   }
// };
