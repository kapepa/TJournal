import io from "socket.io-client";
import cookie from "js-cookie";
import config from "../config";

const SocketIO = io(config.url,{
  auth: { token: `Bearer ${cookie.get('token')}` },
});

export default SocketIO;