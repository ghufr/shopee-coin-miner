function block(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

let a = true;

let stime = 10;
let btime = 45;

while (a) {
  await sleep(stime).then(() => block(btime));
}
