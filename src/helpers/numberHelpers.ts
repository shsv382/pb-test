export function roundNumber(value: number, decimals: number = 0): number {
    if (decimals < 0) {
      throw new Error("Decimals should be greater than 0");
    }
  
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}