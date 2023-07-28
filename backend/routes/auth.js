const express = require(`express`)
const authRouter = express.Router()

const {signupAuth, loginAuth} = require(`../controllers/auth`)

authRouter.route(`/signup`).post(signupAuth)
authRouter.route(`/login`).post(loginAuth)



module.exports = authRouter;