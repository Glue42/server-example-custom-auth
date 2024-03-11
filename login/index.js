window.addEventListener("DOMContentLoaded", (event) => {
    const user = localStorage.getItem(`user`);
    if (user) {
        const element = document.getElementById(`email`);
        element.value = user;
    }
});

const login = async () => {
    const emailElement = document.getElementById(`email`);
    const isEmailValid = emailElement.reportValidity();
    if (!isEmailValid) {
        // show validation error
        return;
    }

    const email = emailElement.value;
    localStorage.setItem(`user`, email);

    const token = `user:${email}`;

    // if running in interop.io desktop, try to set the token and close the window
    if (typeof glue42gd !== "undefined") {
        await glue42gd.authDone({
            token,
            user: email
        });

        window.close();
    }

    // if being used as protection of admin-ui we will redirect to the admin-ui with the token
    const urlParams = new URLSearchParams(window.location.search);
    const callback = urlParams.get(`callback`);
    if (callback) {
        window.location = callback + "?token=" + token;
    }
};