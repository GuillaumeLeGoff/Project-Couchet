import axios from "axios";
import Config from '../config.json'
const URL_API = Config.SERVER_URL ;
class ModeService {
  choiceMode(mode) {
    return axios
      .put(URL_API + "/mode/637a54bc1b9131702da13698", {
        activeMode: mode,
        mode: mode,
        modeBack: mode,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  choiceMode2(mode) {
    return axios
      .put(URL_API + "/mode/637a54bc1b9131702da13698", {
        activeMode: mode,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  shutdownMode(mode) {
    return axios
      .put(URL_API + "/mode/637a54bc1b9131702da13698", {
        activeMode: 0,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  choiceVisuMode(mode) {
    return axios
      .put(URL_API + "/mode/637a54bc1b9131702da13698", {
        mode: mode
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
