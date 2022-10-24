import cors from 'cors';

import { ALLOWED_ORIGINS } from 'config';

const corsOptions: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  ],
};

export const corsMiddleware = cors(corsOptions);
