import axios from "axios";
import Config from "../config.json";
import ModeService from "../services/modeService";

const URL_API = Config.SERVER_URL;
class AuthService {
  //get files
  get() {
    const data = {};
    return axios.get(URL_API + "/files", JSON.stringify(data));
  }
  //update file
  update(file) {
    axios.put(URL_API + "/file/" + file._id, {
      fileName: file.fileName,
      format: file.format,
      path: file.path,
      duration: file.duration,
      name: file.name,
    });
    ModeService.modeChange();
  }
  //delete file
  delete(file) {
    axios.delete(URL_API + "/file/" + file._id).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }
  //post file
  post(file) {
    axios.post(URL_API + "/files", file).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }
  put(file) {
    axios
      .put(URL_API + "/file/" + file._id, {
        duration: file.duration,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }
}

export default new AuthService();
