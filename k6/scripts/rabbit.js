import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
      // { duration: "60", target: 2000 },

      { duration: "10s", target: 10 },

      // Stay at rest on 5 VUs for 10s
      { duration: "60s", target: 1000 },

      // // Ramp-down from 5 to 0 VUs for 5s
      // { duration: "5s", target: 10 }
  ]
};

export default function () {
  var url = "http://host.docker.internal:30005/Message/SendUpdateHouse"
  let data = {"caption":"abc","upPrice":0,"downPrice":0,"updateTime":"2022-06-25T15:09:02.955Z"};

  let response = http.get(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });  
  
  check(response, { "status is 200": (r) => r.status === 200 });
};
