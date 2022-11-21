import axios from "axios";
const URL_API = "http://localhost:4000";
class AuthService {
     login(username, password) {
         return axios.post(URL_API + "/auth/signin", {
                username,
                password
            }).then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
               return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, password) {
        return axios.post(URL_API + "/auth/signup", {
            username,
            password
        });
    }

    updateUser(_id, role){
        let roles = [];
        roles[0] = role;
        return axios.put(URL_API + "/user/" + _id, {
            roles
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();