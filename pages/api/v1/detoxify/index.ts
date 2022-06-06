import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import hasBadWords from '@/functions/hasBadWords'

interface Offensive {
  toxicity: number[]
  severe_toxicity: number[]
  obscene: number[]
  identity_attack: number[]
  insult: number[]
  threat: number[]
  sexual_explicit: number[]
}

interface Messages {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean | Messages>
) {
  return new Promise<void>(() => {
    const text = req.body.text as string

    switch (req.method) {
      case 'POST':
        if (hasBadWords(text)) {
          return res.status(200).json(true)
        } else {
          axios
            .request({
              method: 'POST',
              url: 'https://detoxify.p.rapidapi.com/',
              headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Host': `${process.env.NEXT_PUBLIC_RAPID_API_HOST}`,
                'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
              },
              data: { text: text },
            })
            .then(function (response) {
              return res.status(200).json(isToxic(response.data as Offensive))
            })
        }
        break
      default:
        res.status(501).json({
          message: `Wrong method or API not implemented`,
        })
    }
  })
}

const isToxic = (label: Offensive) => {
  return Object.values(label).some((percent) => percent >= 0.7) ? true : false
}
