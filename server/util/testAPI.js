var request = require("request");

var options = {
  method: 'GET',
  url: 'http://localhost:8080/api/calendar/public-events',
  headers:
  {
    'cache-control': 'no-cache',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VUkRNVFJHT0RnM09VVkZOa1F3UWtORVF6WXpNRGN4TWpFME1rUkRNa014UVRGRlJVSXpNQSJ9.eyJpc3MiOiJodHRwczovL2Rldi11bzIwbm15ZC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTE3ODE0NDI5NzA4OTM0MDc3NDQiLCJhdWQiOlsiaHR0cHM6Ly9hdGxhbnRpY28uY29tLmJyL2ludHJhbmV0L2FwaSIsImh0dHBzOi8vZGV2LXVvMjBubXlkLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1Njc1MzMzMDksImV4cCI6MTU2NzYxOTcwOSwiYXpwIjoiVUdSamhQOEtMalFPWUdkRFNDNDFZWlJKaklaZVB3TUIiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.nN-7KLzgDLmRt50prgXHpWv4DPB4lmWC_Xuqyhjsa2CCWjm1DFKPnalzrVYmusbbnLlPxkL9oBAuauSP5vA0AT-yS1PSuWvy_bdQrXaJlGC4ubm9lksinguWf3XssSsn-4ojuK1cIXASxudvghyaTqe7fL7USfWHmVJb_001A-pjY3w85G5Moxb7IHkWSBRwf2UZ2a2tcR-TvVYtTE31AcoFXQYRKHhp1cTUkQOHMbE2May7zjK57JZ44i8tmZdXb31-iXg5h-UGr9ecZQBmRRI2rMlkCqaAmy9YGwOfy5hYrzX_J-PtQvhQskUz40ERuz_R--O8xooXXK3vG9m-GQ'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});