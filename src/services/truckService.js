import axios from "axios";
import Config from "../config.json";
const URL_API = Config.SERVER_URL;
class TruckService {
  postTruck(truck) {
    return axios
      .put(URL_API + "/truck/" + truck._id, {
        id: truck.id,
        dockIndex: truck.dockIndex,
        plate: truck.plate,
        state: truck.state,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
  getTrucks() {
    const data = {};
    return axios.get(URL_API + "/trucks", JSON.stringify(data));
  }
}
export default new TruckService();
