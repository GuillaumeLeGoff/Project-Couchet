import axios from "axios";
import Config from '../config.json'
const URL_API = Config.SERVER_URL ;
class VeilleService {
    Veille(mode) {
    return axios
      .put(URL_API + "/mode/" + mode.id,  {
        stop: mode.stop,
        start: mode.start,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  getVeille() {
    const data = {};
    return axios.get(URL_API + "/veille", JSON.stringify(data));
  }
}
export default new VeilleService();
