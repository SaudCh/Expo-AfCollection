export const checkoutValidation = (data) => {

    let errors = {};

    if (!data.email) {
        errors.email = "Email Is Required."
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid Email"
    }

    if (!data.firstName) {
        errors.firstName = "First Name is required."
    } else if (/^[a-zA-Z]/.test(data.firstName) === false) {
        errors.firstName = "Only alphabets are allowed."
    }

    if (!data.address) {
        errors.address = "Address is required."
    }

    if (!data.city) {
        errors.city = "City is required."
    }

    if (!data.postalCode) {
        errors.postalCode = "Postal code is required."
    } else if (/^[0-9]+$/.test(data.postalCode) === false) {
        errors.postalCode = "Only numbers are allowed."
    }

    if (!data.phone) {
        errors.phone = "Phone Number is required."
    }else if (/^[0-9+]+$/.test(data.phone) === false) {
        errors.phone = "Only numbers are allowed."
    }else if(data.phone.length < 11){
        errors.phone = "Phone Number must be 11 digits."
    }

    return errors;

}