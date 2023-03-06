import fetch from 'node-fetch';

export const fetcher = async (params: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon${params}`);
  const data = await res.json();

  return { data: data };
};
