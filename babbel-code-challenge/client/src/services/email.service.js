import http from "../http-common";

class EmailDataService {
  getAll() {
    return http.get("/emails");
  }

  create(data) {
    return http.post("/emails/add", data);
  }

  checkEmail(param) {
    return http.get(`https://verify-email.org/home/verify-as-guest/${param}`);
  }

}

export default new EmailDataService();