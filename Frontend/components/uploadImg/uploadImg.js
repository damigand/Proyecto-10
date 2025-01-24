import makeRequest from "@c/makeRequest/makeRequest";

const uploadImg = async (element) => {
    const file = element?.files[0];
    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    const url = "http://localhost:3000/api/users/avatar";

    const token = JSON.parse(localStorage.getItem("jwt"));

    const options = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: token,
        },
    };

    const response = await makeRequest(url, options);
    return response;
};

export default uploadImg;
