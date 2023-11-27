const { History } = require('../models/History.model');


class HistoryController {

    // [GET] /api/history
    readAllHistories(req, res) {
        History.find()
            .then(docs => {
                res.send(docs);
            })
            .catch(err => {
                res.send(err);
            })
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
