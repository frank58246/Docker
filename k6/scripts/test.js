import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
      { duration: "5s", target: 0 },

      { duration: "5s", target: 5 },

      // // Stay at rest on 5 VUs for 10s
      // { duration: "10s", target: 1000 },

      // // Ramp-down from 5 to 0 VUs for 5s
      // { duration: "5s", target: 0 }
  ]
};

export default function () {
  // const response = http.post("http://localhost:5052/api/kafka?message=22", {headers: {Accepts: "application/json"}});

  //const response = http.post("https://localhost:5001/Message/SendUpdateHouse", {headers: {Accepts: "application/json"}},);

  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({"caption":"string","upPrice":0,"downPrice":0,"updateTime":"2022-06-28T16:50:17.750Z"});

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var response = http.post(url, payload, params);
  check(response, { "status is 200": (r) => r.status === 200 });
};
