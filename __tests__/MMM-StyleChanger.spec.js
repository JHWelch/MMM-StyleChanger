/** @jest-environment jsdom */

require('../__mocks__/Module');
require('../__mocks__/globalLogger');

const name = 'MMM-StyleChanger';

let MMMStyleChanger;

beforeEach(() => {
  jest.resetModules();
  require('../MMM-StyleChanger');

  MMMStyleChanger = global.Module.create(name);
  MMMStyleChanger.setData({ name, identifier: `Module_1_${name}` });
});

it('has a default config', () => {
  expect(MMMStyleChanger.defaults).toEqual({
    //
  });
});

it('requires expected version', () => {
  expect(MMMStyleChanger.requiresVersion).toBe('2.28.0');
});

it('inits module in loading state', () => {
  expect(MMMStyleChanger.loading).toBe(true);
});

describe('start', () => {
  const originalInterval = setInterval;
  const configObject = {
    token: 'test-token',
    filter: 'test-filter',
  };

  beforeEach(() => {
    MMMStyleChanger.setConfig(configObject);
    global.setInterval = jest.fn();
    MMMStyleChanger.config.filter = 'test-filter';
  });

  afterEach(() => {
    global.setInterval = originalInterval;
  });

  it('logs start of module', () => {
    MMMStyleChanger.start();

    expect(global.Log.info).toHaveBeenCalledWith('Starting module: MMM-StyleChanger');
  });
});

describe('getTemplate', () => {
  it('returns template path', () => {
    expect(MMMStyleChanger.getTemplate()).toBe('MMM-StyleChanger.njk');
  });
});

describe('getTemplateData', () => {
  it('returns template data', () => {
    expect(MMMStyleChanger.getTemplateData()).toEqual({
      //
    });
  });
});

describe('getStyles', () => {
  it('returns styles path', () => {
    expect(MMMStyleChanger.getStyles()).toEqual([
      // 'font-awesome.css',
      'MMM-StyleChanger.css',
    ]);
  });
});
