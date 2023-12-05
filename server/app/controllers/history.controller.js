const { Doctor } = require('../models/Doctor.model');
const { History } = require('../models/History.model');


class HistoryController {

    // [GET] /api/history
    readAllHistories = async (req, res) => {
        try {
            const _userId = req.user_id;
            const doctor = await Doctor.findOne({ userId: _userId });
            const histories = await History.find({ doctorId: doctor._id });

            res.status(200).send(histories);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }
    
    // [POST] /api/history
    createHistory = async (req, res) => {
        try {
            const newHistory = new History(req.body);
            const history = await newHistory.save();
            res.status(200).send(history);
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }


    

}

module.exports = new HistoryController();
