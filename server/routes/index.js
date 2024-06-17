const doctorsRouter = require('./doctors.route');
const medicalFieldRouter = require('./medical_field.route');
const appointmentRouter = require('./appointment.route');
const authRouter = require('./auth.route');
const requestDoctorRouter = require('./requestDoctor.route');
const historyRouter = require('./history.route');
const userInfoRouter = require('./user_info.route');

const uploadRouter = require('./test.route');

function route(app) {
    app.use('/api/doctors', doctorsRouter);
    app.use('/api/medical_fields', medicalFieldRouter);
    app.use('/api/appointments', appointmentRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/requestDoctor', requestDoctorRouter)
    app.use('/api/upload', uploadRouter);
    app.use('/api/history', historyRouter);
    app.use('/api/user_infos', userInfoRouter);
}

module.exports = route;