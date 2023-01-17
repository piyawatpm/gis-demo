// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type Data = {
  message: string;
  token?: string;
};

const privateKey = 'abc';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    console.log(req.body);
    const { username, password } = req.body;
    if (username === 'abc' && password === '123') {
      const token = jwt.sign({ login: 'abc' }, privateKey);
      console.log('login success token = ', token);
      res.status(200).json({ message: 'Welcone', token });
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
