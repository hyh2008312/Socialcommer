const TARGET = process.env.ENV;

if (TARGET === 'dev') {
  console.dir(`ng build --prod --env=dev -aot`);
}

if (TARGET === 'prod') {
  console.dir(`ng build --prod --env=prod -aot`);
}
