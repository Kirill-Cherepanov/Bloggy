export const getIP = async (): Promise<string> => {
  const data = await fetch('https://api.ipify.org?format=json');
  const ip = (await data.json()).ip;
  return ip;
};
