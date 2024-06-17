const { UserInfo } = require('../models/UserInfo.model');

class UserInfoController {

    // [GET] /api/user_infos
    readAllUserInfos(req, res) {
        UserInfo.find()
            .then(docs => {
                res.send(docs);
            })
            .catch(err => {
                res.send(err);
            })
    }

    // [GET] /api/user_infos/:userInfoId
    readUserInfo(req, res) {
        UserInfo.findOne({
            _id: req.params.userInfoId
        }).then(doc => {
            res.send(doc)
        }).catch(err => {
            res.status(404).send(err)
        })
    }
    

    // [POST] /api/user_infos
    createUserInfo = async (req, res) => {
        try {
            const newUserInfo = new UserInfo( req.body );
            const userInfo = await newUserInfo.save();
            res.status(200).send(userInfo);
        }
        catch (err) {
            res.status(400).send(err)
        }

    }

    // createMedicalField(req, res) {
    //     const medicalField = new MedicalField( req.body );
    //     medicalField.save()
    //         .then(doc => {
    //             res.send(doc);
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })
    // }

    // [PATCH] /api/user_infos/:userInfoId
    updateUserInfo = async (req, res) => {
        UserInfo.findOneAndUpdate({
            _id: req.params.userInfoId
        }, { $set: req.body })
            .then(() => {
                res.send({ message: "Updated User Info successfully"})
            }).
            catch((err) => {
                res.status(500).send(err)
            })
    
    }

    
    


    

}

module.exports = new UserInfoController();
