// let formSendMessage = document.querySelector(".send-message");
let formSendData = document.querySelector(".send-data");
let inputMessage = document.querySelector("#message");

let socket = io();
socket.on("message", message => console.log("Message from server: ", message));
socket.on("private message", message => console.log("Private message from server: ", message));

formSendData.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(formSendData);

    axios.post('/', data);
    //   .then(r => answEl.innerHTML = r.data)
    //   .catch(e => answEl.innerHTML = `ERROR: ${e}`);
    // socket.emit("message", inputMessage.value);
});