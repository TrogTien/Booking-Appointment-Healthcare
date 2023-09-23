const doctorsRouter = require('./doctors');
const medicalFieldRouter = require('./medical_field');

function route(app) {
    app.use('/api/doctors', doctorsRouter);
    // app.use('/medical-field', medicalFieldRouter);
}

module.exports = route;