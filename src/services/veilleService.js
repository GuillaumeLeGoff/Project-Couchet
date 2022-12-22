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

  Heure(heure,date) {
    console.log(heure);
    console.log(date);
    return axios
      .post(URL_API + "/heure", {
        heure: heure,
        date: date
      })
      .then((result) => {
        console.log(result.data);
      });
  }
 
  getHeure() {
    const data = {};
    return axios.get(URL_API + "/heure", data);
  }
  getDate() {
    const data = {};
    return axios.get(URL_API + "/date", data);
  }
}
export default new VeilleService();
