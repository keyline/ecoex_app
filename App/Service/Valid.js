export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isValidMobile = (mobile) => {
    let regex = /([0-9]){10}$/;
    return regex.test(mobile)
}

export const isValidAmount = (amount) => {
    let regex = /^[0-9]+$/;
    return regex.test(amount)
}