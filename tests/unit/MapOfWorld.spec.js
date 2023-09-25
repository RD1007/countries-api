jest.mock("@amcharts/amcharts5", () => {
    return {
        Root: {
        new: jest.fn(),
        },
        Rectangle: {
        new: jest.fn(),
        },
        color: jest.fn(),
    };
});

jest.mock("@amcharts/amcharts5/map", () => {
    return {
        MapChart: {
        new: jest.fn(),
        },
        MapPolygonSeries: {
        new: jest.fn(),
        },
    };
});

jest.mock("@amcharts/amcharts5-geodata/worldLow", () => {
    return {};
});

jest.mock("@amcharts/amcharts5-geodata/continentsLow", () => {
    return {};
});

import { getFixedNames } from '../../src/components/MapofWorld.vue';

describe('getFixedNames function', () => {
  test('correct africa to Africa', () => {
    const result = getFixedNames('africa');
    expect(result).toBe('Africa');
  });
  test('correct antarctica to Antarctic', () => {
    const result = getFixedNames('antarctica');
    expect(result).toBe('Antarctic');
  });
  test('correct asia to Asia', () => {
    const result = getFixedNames('asia');
    expect(result).toBe('Asia');
  });
  test('correct europe to Europe', () => {
    const result = getFixedNames('europe');
    expect(result).toBe('Europe');
  });
  test('correct northamerica to North America', () => {
    const result = getFixedNames('northamerica');
    expect(result).toBe('North America');
  });
  test('correct oceania to Oceania', () => {
    const result = getFixedNames('oceania');
    expect(result).toBe('Oceania');
  });
  test('correct southamerica to South America', () => {
    const result = getFixedNames('southamerica');
    expect(result).toBe('South America');
  });
});