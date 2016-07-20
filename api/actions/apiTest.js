export default function loadInfo() {
  return new Promise((resolve) => {
    resolve({
      message: 'This is the api test message',
      time: Date.now()
    });
  });
}
