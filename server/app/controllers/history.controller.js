const { Doctor } = require('../models/Doctor.model');
const { History } = require('../models/History.model');


class HistoryController {

    // [GET] /api/history
    readAllHistories = async (req, res) => {
        try {
            const _userId = req.user_id;
            const doctor = await Doctor.findOne({ userId: _userId });
            if (!doctor) {
                return res.status(404).json("Doctor is not found");
            }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const skip = (page - 1) * limit;

            const histories = await History.find({ doctorId: doctor._id })
                                           .skip(skip)
                                           .limit(limit);
            
            const total = await History.countDocuments({ doctorId: doctor._id })

            const response = {
                total,
                page, 
                limit,
                histories
            }

            res.status(200).send(response);
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
