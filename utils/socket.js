import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:4000");
const socket = io.connect("https://server-ems-74rn.onrender.com");

socket.on("connect", () => {
    console.log("connected to server", socket.id);
});

socket.on("disconnect", () => {
    console.log("disconnected from server");
});

export default socket;
