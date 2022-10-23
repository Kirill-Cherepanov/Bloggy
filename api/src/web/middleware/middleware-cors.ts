import cors from 'cors';

import { ALLOWED_ORIGINS } from 'config';

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

export const corsMiddleware = cors(corsOptions);
