const MessageServices = require('../services/message.service')

class CartController {
    async GetAllMessage(req, res) {
        try {
            const result = await MessageServices.GetAllMessage();
            res.status(200).json({ success: true, message: 'Get all message successfully', message: result });
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }
}

module.exports = new CartController();
