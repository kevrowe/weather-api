import { kToUnit } from './units'

describe('lib/units', () => {
  it('should convert k to c', () => {
    expect(kToUnit(273.15, 'C')).toBe(0)
    expect(kToUnit(0, 'C')).toBe(-273.15)
  })
  it('should convert k to f', () => {
    expect(kToUnit(273.15, 'F')).toBe(32)
    expect(kToUnit(241.15, 'F')).toBe(-25.6)
  })
})