import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    // { duration: "60", target: 2000 },

    { duration: "5s", target: 5 },

    // Stay at rest on 5 VUs for 10s
    // { duration: "60s", target: 100 },

    // // Ramp-down from 5 to 0 VUs for 5s
    // { duration: "5s", target: 10 }
  ]
};

export default function () {
  var url = "http://172.16.81.124:10002/api/portal/info?clientSn=889020584&content=0&operatorSn=87560";
  let data = {
   
  }


  // url = "http://host.docker.internal:30005/Message/echo?value=111"
  let response = http.get(url, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'X-ApiKey': 'E7C4CE3F5D7CEA6B387966879A193E3BC898BE21',
      'Tutor-Header-TraceID': 'frank-test',
    },
  });

  check(response, { "status is 200": (r) => r.status === 200 });
};
