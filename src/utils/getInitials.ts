export const getInitials = (name: string) => {
  if (!name) return "SN";

  const words = name
    .trim()
    .split(/\s+/)
    .filter(
      (word) =>
        !["de", "da", "do", "dos", "das", "e"].includes(word.toLowerCase()),
    );

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  const firstInitial = words[0][0];
  const lastInitial = words[words.length - 1][0];

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
