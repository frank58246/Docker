import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
      { duration: "5s", target: 0 },

      { duration: "5s", target: 5 },

      // Stay at rest on 5 VUs for 10s
      { duration: "10s", target: 1000 },

      // Ramp-down from 5 to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  const response = http.get("http://host.docker.internal:3000/?orgId=1", {headers: {Accepts: "application/json"}});
  check(response, { "status is 200": (r) => r.status === 200 });
};
