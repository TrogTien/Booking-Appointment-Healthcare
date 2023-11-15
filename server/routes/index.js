const doctorsRouter = require('./doctors.route');
const medicalFieldRouter = require('./medical_field.route');
const appointmentRouter = require('./appointment.route');
const authRouter = require('./auth.route');

function route(app) {
    app.use('/api/doctors', doctorsRouter);
    app.use('/api/medical_fields', medicalFieldRouter);
    app.use('/api/appointments', appointmentRouter);
    app.use('/api/auth', authRouter);
}

module.exports = route;