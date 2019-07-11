export default async function ({ store, req }) {
  const ip = req.connection.remoteAddress || req.socket.remoteAddress;
  if (ip != "127.0.0.1") {
    await store.dispatch('GET_LOCATION_IP', ip);
  } else {
    await store.dispatch('GET_LOCATION');
  }
  console.log(ip);
}
