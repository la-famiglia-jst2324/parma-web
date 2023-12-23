import type { NextApiRequest, NextApiResponse } from 'next';

import { getLinkValueByID } from '@/api/db/services/linkValueService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { valueId } = req.query;

  switch (method) {
    case 'GET':
      try {
        const value = await getLinkValueByID(Number(valueId));
        if (value) res.status(200).json(value);
        else res.status(400).json({ error: 'No Measurement Value found' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
};
