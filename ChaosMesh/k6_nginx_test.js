import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js'

export let options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 15 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95) < 500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://127.0.0.1:80/');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains nginx': (r) => r.body && r.body.includes('Welcome to nginx!'),
  });

  sleep(1);
}


export function handleSummary(data) {
  return {
    'result.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}