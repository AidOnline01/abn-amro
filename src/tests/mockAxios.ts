interface Props {
  url: string,
  data: unknown,
  delay?: number,
  params?: Record<string, unknown>
}

export default function mockAxios({
  url, data, delay = 0, params = {},
}: Props) {
  const axios = global.mockAdapter.onGet(url, { params });

  if (delay > 0) {
    axios.replyOnce(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, data]);
      }, delay);
    }));
  } else axios.replyOnce(200, data);
}
