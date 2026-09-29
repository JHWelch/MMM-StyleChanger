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
    styles: [],
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
  it('passes the configured stylesheet names', () => {
    const styles = [
      {
        name: 'Style 1',
        path: 'config/custom1.css',
      },
      {
        name: 'Style 2',
        path: 'config/custom2.css',
      },
    ];
    MMMStyleChanger.config.styles = styles;
    expect(MMMStyleChanger.getTemplateData()).toEqual({
      styles,
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

describe('notificationReceived', () => {
  it('binds touch events if notification is MODULE_DOM_UPDATED', () => {
    MMMStyleChanger.bindTouchEvents = jest.fn();
    MMMStyleChanger.notificationReceived('MODULE_DOM_UPDATED');

    expect(MMMStyleChanger.bindTouchEvents).toHaveBeenCalled();
  });

  it('binds touch events if notification is MODULE_DOM_CREATED', () => {
    MMMStyleChanger.bindTouchEvents = jest.fn();
    MMMStyleChanger.notificationReceived('MODULE_DOM_CREATED');

    expect(MMMStyleChanger.bindTouchEvents).toHaveBeenCalled();
  });

  it('does nothing if notification is something else', () => {
    MMMStyleChanger.bindTouchEvents = jest.fn();
    MMMStyleChanger.notificationReceived('SOME_OTHER_NOTIFICATION');

    expect(MMMStyleChanger.bindTouchEvents).not.toHaveBeenCalled();
  });
});

describe('bindTouchEvents', () => {
  it('binds touch events for close button', () => {
    const mockStyleButton = document.createElement('button');
    mockStyleButton.className = 'style-button';
    document.body.appendChild(mockStyleButton);
    MMMStyleChanger.switchStyles = jest.fn();

    MMMStyleChanger.bindTouchEvents();

    mockStyleButton.dispatchEvent(new Event('touchend'));
    expect(MMMStyleChanger.switchStyles).toHaveBeenCalled();
  });
});

describe('bindTouchEvent', () => {
  it('binds touchend and click events to elements with the given class', () => {
    const mockElement = document.createElement('div');
    mockElement.className = 'test-class';
    document.body.appendChild(mockElement);

    const callback = jest.fn();
    MMMStyleChanger.bindTouchEvent('.test-class', callback);

    mockElement.dispatchEvent(new Event('touchend'));
    mockElement.dispatchEvent(new Event('click'));

    expect(callback).toHaveBeenCalledTimes(2);

    document.body.removeChild(mockElement);
  });
});
