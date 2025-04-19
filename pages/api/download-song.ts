// pages/api/download-song.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

export const config = {
  api: {
    // Allow streaming large files
    responseLimit: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, title } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).send('Missing or invalid "url" parameter');
  }
  const filename = typeof title === 'string' && title.trim() !== '' ? title : 'song';

  // 1. Fetch on the server side (no CORS issues)
  const remoteRes = await fetch(url);
  if (!remoteRes.ok) {
    return res
      .status(remoteRes.status)
      .send(`Error fetching audio: ${remoteRes.statusText}`);
  }
  if (!remoteRes.body) {
    return res.status(500).send('No response body');
  }

  // 2. Tell the browser to download
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filename}.mp3"`
  );
  res.setHeader('Content-Type', 'audio/mpeg');

  // 3. Convert Web ReadableStream → Node.js Readable, then pipe
  const nodeStream = Readable.fromWeb(remoteRes.body as any);
  nodeStream.pipe(res);
}
