import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
      // { duration: "60", target: 2000 },

      { duration: "10s", target: 500 },

      // Stay at rest on 5 VUs for 10s
      { duration: "60s", target: 1000 },

      // Ramp-down from 5 to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  var url = "http://host.docker.internal:55678/character/_search"
  let data ={"query":{"bool":{"must":[{"terms":{"faction":["丐幫"]}}]}},"size":100};

  let response = http.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });  
  
  check(response, { "status is 200": (r) => r.status === 200 });
};
