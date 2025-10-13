const isUnit = (unit: string): unit is 'F' | 'C' => {
  return ['F', 'C'].includes(unit);
}

const kToUnit = (kelvin: number, unit: 'F' | 'C') => {
  let result = NaN;

  switch (unit) {
    case 'F':
      result = (kelvin - 273.15) * 9 / 5 + 32;
      break;
    case 'C':
      result = kelvin - 273.15;
      break;
  }

  return Math.round(result * 100) / 100
}

export { kToUnit, isUnit }