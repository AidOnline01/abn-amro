export default function mockAxios(url: string, data: unknown, delay = 0) {
  const axios = global.mockAdapter.onGet(url);

  if (delay > 0) {
    axios.reply(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, data]);
      }, delay);
    }));
  } else axios.reply(200, data);
}
