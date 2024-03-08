window.addEventListener("DOMContentLoaded", (event) => {
    const user = localStorage.getItem(`user`);
    if (user) {
        const element = document.getElementById(`email`);
        element.value = user;
    }
});

const login = async () => {
    const emailElement = document.getElementById(`email`);
    var isEmailValid = emailElement.reportValidity();
    if (!isEmailValid){
        // show validation error
        return;
    }
   

    const email = emailElement.value;
    localStorage.setItem(`user`, email);

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