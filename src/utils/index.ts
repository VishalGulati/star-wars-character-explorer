export const extractIdFromUrl = (url: string): string | null => {
  const match = url.match(/people\/(\d+)\//);
  return match ? match[1] : null;
};
