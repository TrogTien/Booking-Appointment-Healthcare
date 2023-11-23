const { RequestDoctor } = require('../models/RequestDoctor.model');
const { User } = require('../models/User.model');

const nodemailer = require('nodemailer');

class RequestDoctorController {

    // [GET] /api/requestDoctor
    readAllRequestDoctor(req, res) {
        RequestDoctor.find()
            .then(docs => {
                res.send(docs);
            })
            .catch(err => {
                res.send(err);
            })
    }

    // [GET] /api/requestDoctor/:requestDoctorId
    readRequestDoctor(req, res) {
        RequestDoctor.findOne({
            _id: req.params.requestDoctorId
        }).then(doc => {
            res.send(doc)
        }).catch(err => {
            res.status(404).send(err)
        })
    }
    

    // [POST] /api/requestDoctor
    createRequestDoctor = async (req, res) => {
        try {
            
            const newRequestDoctor = new RequestDoctor( req.body );
            
            const requestDoctor = await newRequestDoctor.save();


            const user = await User.findById(requestDoctor.userId);
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'trongtien372001@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
                }
            })

            const options = {
                from: 'trongtien372001@gmail.com',
                to: `${user.email}`,
                subject: `Phản hồi liên hệ hợp tác phòng khám`,
                text: `Yêu cầu của bạn đã được gửi, chúng tôi sẽ liên hệ bạn sau thông qua số điện thoại bạn đã cung cấp.`
            }

            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("Email sent " + info );
                    res.status(200).send(requestDoctor);
                }
            })

        } catch (err) {
            res.status(500).json(err)
        }
        
          
    }

 

    // [DELETE] /api/requestDoctor/:requestDoctorId
    deleteRequestDoctor(req, res) {
        RequestDoctor.findOneAndRemove({
            _id: req.params.requestDoctorId
        })
            .then(removedDoc => {
                res.send(removedDoc)
            }) 
    }

    

}

module.exports = new RequestDoctorController();
