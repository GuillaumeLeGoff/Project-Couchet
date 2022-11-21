import axios from "axios";
import Config from '../config.json'
const URL_API = Config.SERVER_URL ;
class ModeService {
  choiceMode(mode) {
    return axios
      .put(URL_API + "/mode/6368fc0a41898f80900da97b", {
        activeMode: mode,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  getMode() {
    const data = {};
    return axios.get(URL_API + "/modes", JSON.stringify(data));
  }
}
export default new ModeService();
