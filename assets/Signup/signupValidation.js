export const signupValidation = (data) => {
    let errors = {};

    if (!data.fName) {
        errors.fName = "First Name is Required."
    } else if (/^[a-zA-Z]/.test(data.fName) === false) {
        errors.fName = "Only alphabets are allowed."
    }


    if (!data.lName) {
        errors.lName = "Last Name is Required."
    } else if (/^[a-zA-Z]/.test(data.lName) === false) {
        errors.lName = "Only alphabets are allowed."
    }

    if (!data.email) {
        errors.email = "Email Is Required."
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid Email"
    }
    if (!data.password) {
        errors.password = "Password is required."
    }
    else if (data.password.length < 8) {
        errors.password = "Password Must be more than Eight Characters"
    }
    if (!data.cPassword) {
        errors.cPassword = "Confirm Password is required."
    } else if (data.password !== data.cPassword) {
        errors.cPassword = "Password must match"
    }
    return errors;

}