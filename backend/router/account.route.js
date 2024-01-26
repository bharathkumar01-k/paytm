const { getBalanceController, transferController } = require("../controllers/account.controller")
const { transferValidator } = require("../validator/account.validator")

module.exports = (router) =>{
    router.get(
        '/balance',
        getBalanceController
    )
    
    router.post(
        '/transfer',
        transferValidator,
        transferController
    )
}