// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getCompanyByName } from '@/api/db/services/companyService'
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req
//   const name = req.query.name

//   switch (method) {
//     case 'GET':
//       try {
//         const companies = await getCompanyByName(String(name))
//         if (companies) res.status(200).json(companies)
//         else res.status(400).json({ error: 'No companies found' })
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' })
//       }
//       break
//     default:
//       res.status(405).json({ error: 'Method Not Allowed' })
//       break
//   }
// }
