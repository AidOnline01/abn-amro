import axios from 'axios';

export default async function api(
  endpoint: string,
  params: Record<string, unknown> = {},
): Promise<unknown> {
  const response = await axios({
    method: 'get',
    url: `https://api.tvmaze.com/${endpoint}`,
    params,
  });

  return response.data;
}
