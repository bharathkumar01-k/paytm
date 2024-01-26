const { userAuthentication } = require("../auth")
const { signupController, signinController, userDetailsController, getBulkUsersController } = require("../controllers/user.controller")
const { signupValidator, signinValidator, userValidator, getUserValidator } = require("../validator/user.validator")

module.exports = (router) =>{
    router.post(
        '/signup',
        signupValidator,
        signupController
    )
    router.post(
        '/signin',
        signinValidator,
        signinController
        )
    router.post(
        '/',
        userAuthentication,
        userValidator,
        userDetailsController
    )
    router.get(
        '/bulk',
        userAuthentication,
        getUserValidator,
        getBulkUsersController
    )
}