import express, { Request, Response } from 'express';
import { fetcher } from './lib/fetcher';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  try {
    const { data } = await fetcher('/?limit=1000');

    const pokemons = data.results.map((pokemon, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { id: paddedId, name: pokemon.name, image, url: pokemon.url };
    });

    res.status(200).json({ data: pokemons });
  } catch (e) {
    const error = e as Error;
    res.status(200).json({ message: error.message });
  }
});

app.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data } = await fetcher(`/${req.params.id}`);
    res.status(200).json({ data: data });
  } catch (e) {
    const error = e as Error;
    res.status(400).json({ message: error.message });
  }
});

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
