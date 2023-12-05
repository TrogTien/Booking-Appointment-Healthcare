module.exports = {
    removeOldAvailableTimes : async (doctor) => {
        try {
            
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
    
            doctor.availableTimes = doctor.availableTimes.filter(item => {
                const itemDate= new Date(item.day);
                return itemDate >= currentDate
            });
    
            await doctor.save();

            return doctor;
        }
        catch (err) {
            throw err;
        }
    }
};