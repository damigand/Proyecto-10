import "./theme.css";
const $ = (el) => document.querySelector(el);

const changeTheme = () => {
    const theme = $("#theme");
    const i = $(".theme-icon");
    const text = $(".theme-text");

    theme.addEventListener("click", () => {
        i.classList.toggle("active");

        if (i.classList.contains("active")) {
            document.documentElement.style.colorScheme = "dark";
        } else {
            document.documentElement.style.colorScheme = "light";
        }

        setTimeout(() => {
            i.classList.toggle("bxs-sun");
            i.classList.toggle("bxs-moon");
            text.textContent = i.classList.contains("active") ? "Dark" : "Light";
        }, 100);
    });
};

export default changeTheme;
