import express from 'express';

import { upload, updloadSettingsFields } from 'web/middleware';

import { deleteUserController } from './delete-user.controller';
import { updateProfilePicController } from './update-profile-pic.controller';
import { updateUserDataController } from './update-user-data.controller';
import { updateUserController } from './update-user.controller';

const settingsRouter = express.Router();

settingsRouter.patch('/', updloadSettingsFields, updateUserController);
settingsRouter.patch('/data', updateUserDataController);
settingsRouter.put(
  '/profile-picture',
  upload.single('profile-picture'),
  updateProfilePicController
);
settingsRouter.delete('/', deleteUserController);

export default settingsRouter;
