export const getJsonBuffer = async (
  files?:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
): Promise<Express.Multer.File | undefined> => {
  if (!files || !('request-json' in files)) return undefined;

  const jsonBuffer = files['request-json'][0];

  if (jsonBuffer.mimetype !== 'application/json') return undefined;

  return jsonBuffer;
};
