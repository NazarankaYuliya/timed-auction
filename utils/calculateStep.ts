export function calculateStep(limit: number): number {
  switch (true) {
    case limit > 0 && limit <= 19:
      return 2;
    case limit > 19 && limit <= 59:
      return 5;
    case limit > 59 && limit <= 159:
      return 10;
    case limit > 159 && limit <= 299:
      return 20;
    case limit > 299 && limit <= 449:
      return 30;
    case limit > 449 && limit <= 899:
      return 50;
    case limit > 899 && limit <= 1799:
      return 100;
    case limit > 1799 && limit <= 2999:
      return 200;
    case limit > 2999 && limit <= 4499:
      return 300;
    case limit > 4499 && limit <= 9999:
      return 500;
    case limit > 9999 && limit <= 24999:
      return 1000;
    case limit > 24999 && limit <= 49999:
      return 2500;
    default:
      return 5000;
  }
}
