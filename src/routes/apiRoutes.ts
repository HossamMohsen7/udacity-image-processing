import express from 'express';
import { transformImage } from '../utils/utils';

const router = express.Router();

router.get(
  '/images',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response | void> => {
    const { filename, width, height, flip, rotate, format } = req.query;

    const rotateDegreee = rotate ? parseInt(rotate as string) : 0;

    const processResponse = await transformImage(
      filename as string,
      parseInt(width as string),
      parseInt(height as string),
      flip == 'true',
      rotateDegreee,
      format as string
    );

    if (processResponse.success === false) {
      return res.status(400).send(processResponse.error);
    }

    if (!processResponse.outputPath) {
      return res.status(400).send('Image transformation failed');
    }

    return res.sendFile(processResponse.outputPath);
  }
);

export default router;
