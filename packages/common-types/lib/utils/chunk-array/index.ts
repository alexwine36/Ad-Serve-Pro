export const chunk = <T>(arr: T[], size: number) =>
  size === 0
    ? []
    : Array.from({ length: Math.ceil(arr.length / size) }, (_: T, i: number) =>
        arr.slice(i * size, i * size + size)
      );
