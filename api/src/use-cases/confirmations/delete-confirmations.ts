import Confirmation from 'models/Confirmation';

export const deleteConfirmations = async (email: string) => {
  await Confirmation.deleteMany({ email });

  return { success: true };
};
