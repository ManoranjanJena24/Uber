const userModel = require('../models/user.model')

// module.exports.createUser = async ({
//     firstname, lastname, email, password
// }) => {
//     if (!firstname || !email || !password) {
//         throw new Error('All fields are required');
//     }
//     const user = userModel.create({
//         fullname: {
//             firstname,
//             lastname
//         },
//         email,
//         password
//     })

//     return user;

// }

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    try {
        // Create a new instance of the user model
        const user = new userModel({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });

        // Save the user to the database
        await user.save();
        return user; // Return the full Mongoose instance
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};
