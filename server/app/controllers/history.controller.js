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

    // [GET] /api/quantityPatient
    countPatientByDoctor = async (req, res) => {
        try {
            const doctor = await Doctor.findOne({ userId: req.user_id });
            const dataQuantityPatient = await History.aggregate([
                {
                    $match: { doctorId: doctor._id } // Thêm $match để lọc documents trước khi $group
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$day' },
                            month: { $month: '$day'}
                        },
                        count: { $sum:1 }
                    },

                },
                {
                    $sort: {
                      '_id.year': 1,    // 1 tăng dần, -1 giảm dần
                      '_id.month': 1,
                    },
                },
                
            ]);
            res.status(200).json(dataQuantityPatient);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    // [GET] /api/allPatientByAdmin
    countAllPatientByAdmin = async (req, res) => {
        try {
            const dataQuantityPatient = await History.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: '$day' },
                            month: { $month: '$day'}
                        },
                        count: { $sum:1 }   // Tổng số lương tài liệu
                    },

                },
                {
                    $sort: {
                      '_id.year': 1,
                      '_id.month': 1,
                    },
                },
                
            ]);

            res.status(200).json(dataQuantityPatient);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    // [GET] /api/totalRevenue
    getTotalRevenueByDoctor = async (req, res) => {
        try {
            const doctor = await Doctor.findOne({ userId: req.user_id });
            const dataTotalRevenue = await History.aggregate([
                {
                    $match: { doctorId: doctor._id } // Thêm $match để lọc documents theo bác sĩ đag đăng nhập trước khi $group
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$day' },
                            month: { $month: '$day'}
                        },
                        total: { $sum: "$price" }
                    },

                },
                {
                    $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                    },
                },
                
            ]);

            res.status(200).json(dataTotalRevenue);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    // [GET] /api/totalRevenueByAdmin
    getTotalRevenueByAdmin = async (req, res) => {
        try {
            const dataTotalRevenue = await History.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: '$day' },
                            month: { $month: '$day'}
                        },
                        total: { $sum: '$price' }   // Tổng số lương tài liệu
                    },

                },
                {
                    $sort: {
                      '_id.year': 1,
                      '_id.month': 1,
                    },
                },
                
            ]);

            res.status(200).json(dataTotalRevenue);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    

}

module.exports = new HistoryController();
