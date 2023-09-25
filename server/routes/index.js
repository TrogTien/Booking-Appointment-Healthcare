const doctorsRouter = require('./doctors.route');
const medicalFieldRouter = require('./medical_field.route');
const appointmentRouter = require('./appointment.route');

function route(app) {
    app.use('/api/doctors', doctorsRouter);
    app.use('/api/medical_fields', medicalFieldRouter);
    app.use('/api/appointments', appointmentRouter);
}

module.exports = route;