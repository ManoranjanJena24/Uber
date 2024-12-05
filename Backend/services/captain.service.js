const captainModel = require('../models/captain.model')


module.exports.createCaptain = async ({
    firstname, lastname, email, password,color,plate,capacity,vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    try {
        // Create a new instance of the user model
        const captain = captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        // Save the user to the database
        // await captain.save();
        return captain; // Return the full Mongoose instance
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};