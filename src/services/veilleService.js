import axios from "axios";
import Config from '../config.json'
const URL_API = Config.SERVER_URL ;
class VeilleService {
    Veille(file) {
    return axios
      .put(URL_API + "/veille/" + file._id, {
        stop: file.stop,
        start: file.start,
      })
      .then((result) => {
        console.log(result.data);
      });
  }
  getVeille() {
    const data = {};
    return axios.get(URL_API + "/veille", JSON.stringify(data));
  }

  Heure(file) {
    console.log(file._id);
    return axios
      .put(URL_API + "/heure/" + file._id, {
        heure: file.heure,
      })
      .then((result) => {
        console.log(result.data);
      });
  }
  getHeure() {
    const data = {};
    return axios.get(URL_API + "/heure", JSON.stringify(data));
  }
}
export default new VeilleService();
