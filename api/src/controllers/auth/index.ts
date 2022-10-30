import express from 'express';

import { getAccessTokenController } from './get-access-token.controller';
import { getSelfController } from './get-self.controller';
import { loginController } from './login.controller';
import { logoutController } from './logout.controller';
import { registrationController } from './registration.controller';
import { resetPasswordController } from './reset-password.controller';

const authRouter = express.Router();

authRouter.get('/token', getAccessTokenController);
authRouter.get('/self', getSelfController);
authRouter.delete('/logout', logoutController);
authRouter.post('/login', loginController);
authRouter.post('/registration', registrationController);
authRouter.post('/reset-password', resetPasswordController);

export default authRouter;
