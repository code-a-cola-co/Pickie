export default (hex: string): string => {
  const hex2rgba = (h, a = 1) => {
    const [r, g, b] = h.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${a})`;
  };
  const match: any = hex2rgba(hex).match(/\d+/g);
  if ((match[0] * 0.299) + (match[1] * 0.587) + (match[2] * 0.114) > 186) {
    return '#000000';
  }
  return '#FFFFFF';
};
