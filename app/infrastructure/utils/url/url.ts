export const buildUrl = (endpoint: string, urlParams: any) => {
  let url = endpoint;
  if (urlParams === null) {
    return url;
  }
  Object.entries(urlParams).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value as string);
  });
  return url;
};
