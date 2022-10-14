import Confirmation from 'models/Confirmation';

export const validateConfirmation = async (email: string, message: string) => {
  const confirmation = await Confirmation.findOne({ email });
  if (!confirmation) return null;

  if (confirmation.message !== message) return false;

  return true;
};
