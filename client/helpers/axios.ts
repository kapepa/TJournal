import axios from "axios";
import Cookie from "js-cookie"
import config from "../config";

const Axios = axios;

Axios.defaults.baseURL = config.url;
Axios.defaults.headers.common = {'Authorization': `Bearer ${Cookie.get('token')}`};

export default Axios;