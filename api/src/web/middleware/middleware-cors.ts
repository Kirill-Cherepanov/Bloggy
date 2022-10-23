import cors from 'cors';

import { ALLOWED_ORIGINS } from 'config';

const corsOptions: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
