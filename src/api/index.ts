import axios from 'axios';

export const API_URL = 'https://api.tvmaze.com';

export default async function api(
  endpoint: string,
  params: Record<string, unknown> = {},
): Promise<unknown> {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/${endpoint}`,
    params,
  });

  return response.data;
}
