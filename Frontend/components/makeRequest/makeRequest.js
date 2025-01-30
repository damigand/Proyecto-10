import createMessage from "@c/createMessage/createMessage.js";
import loading from "@c/loading/loading.js";

const url = "https://proy10-back-damigand.vercel.app/api";

const makeRequest = async (endpoint, options) => {
    try {
        loading(true);

        const finalUrl = url + endpoint;

        const request = new Request(finalUrl, options);
        const response = await fetch(request);
        const status = await handleResponse(response);

        return status;
    } catch (error) {
        console.log(`Error fetching: ${error}`);
        const color = "red";
        const message = "Ha habido un error, inténtalo de nuevo en unos momentos.";
        createMessage(color, message);
    } finally {
        loading(false);
    }
};

//Crea mensajes de advertencia y devuelve un objeto
//Indicando si la petición es válida y el json.
const handleResponse = async (response) => {
    const json = await response.json();
    const status = {
        success: false,
        json: json
    };
    switch (response.status) {
        case 400:
            createMessage("red", json);
            break;
        case 404:
            createMessage("red", json);
            break;
        case 500:
            createMessage("red", json);
            break;
        case 202:
            createMessage("yellow", json);
            break;
        case 200:
            status.success = true;
        case 201:
            status.success = true;
    }
    return status;
};

export default makeRequest;
