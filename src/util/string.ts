const truncate = (input: string, threshold = 25) =>
  input.length > threshold ? `${input.substring(0, threshold-2)}...` : input;

export { truncate }