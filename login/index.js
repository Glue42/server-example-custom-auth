window.addEventListener("DOMContentLoaded", (event) => {
    const user = localStorage.getItem(`user`);
    if (user) {
        const element = document.getElementById(`email`);
        element.value = user;
    }

    const pass = localStorage.getItem(`pass`);
    if (pass) {
        const element = document.getElementById(`password`);
        element.value = pass;
    }
});

const login = async () => {
    const emailElement = document.getElementById(`email`);
    var isEmailValid = emailElement.reportValidity();
    if (!isEmailValid){
        // show validation error
        return;
    }
    const passwordElement = document.getElementById(`password`);
    var isPasswordValid = passwordElement.reportValidity();
    if (!isPasswordValid){
        // show validation error
        return;
    }

    const email = emailElement.value;
    localStorage.setItem(`user`, email);
    localStorage.setItem(`password`, passwordElement.value);

    const token = `user:${email}`;
    await glue42gd.authDone({
        token,
        user: email
    });
    closeWindow();
};

const closeWindow = () => {
    window.close();
};