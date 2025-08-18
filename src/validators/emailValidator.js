const emailValidator = (email) => {
    const REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    return REGEX.test(email);
}

module.exports = emailValidator;