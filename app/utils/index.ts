export function isEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export function isValidName(name: string) {
    const regex = /^[a-zA-Z0-9@\s]+$/
    return regex.test(String(name).toLowerCase());
}

export function isValidNric(nric: string) {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(String(nric).toLowerCase());
}