/** @jest-environment jsdom */

require('../__mocks__/Module');
require('../__mocks__/globalLogger');

const name = 'MMM-StyleChanger';

let MMMStyleChanger;

const loadStyle = (style) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = style.path;
  document.querySelector('head').appendChild(link);
  style.loaded = true;
};

beforeEach(() => {
  jest.resetModules();
  require('../MMM-StyleChanger');

  MMMStyleChanger = global.Module.create(name);
  MMMStyleChanger.setData({ name, identifier: `Module_1_${name}` });
});

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = '';
});

it('has a default config', () => {
  expect(MMMStyleChanger.defaults).toEqual({
    styles: [],
    allowMultiple: false,
  });
});

it('requires expected version', () => {
  expect(MMMStyleChanger.requiresVersion).toBe('2.28.0');
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

  it('loads in styles', () => {
    MMMStyleChanger.config.styles = [
      {
        name: 'Style 1',
        path: 'config/custom1.css',
      },
      {
        name: 'Style 2',
        path: 'config/custom2.css',
      },
    ];

    MMMStyleChanger.start();

    expect(MMMStyleChanger.styles).toEqual([
      {
        name: 'Style 1',
        path: 'config/custom1.css',
        loaded: false,
      },
      {
        name: 'Style 2',
        path: 'config/custom2.css',
        loaded: false,
      },
    ]);
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
    MMMStyleChanger.styles = styles;
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

describe('switchStyles', () => {
  let mockButtons;

  beforeEach(() => {
    MMMStyleChanger.styles = [
      {
        name: 'Style 1',
        path: 'config/custom1.css',
        loaded: false,
      },
      {
        name: 'Style 2',
        path: 'config/custom2.css',
        loaded: false,
      },
      {
        name: 'Style 3',
        path: 'config/custom3.css',
        loaded: false,
      },
    ];
    mockButtons = MMMStyleChanger.styles.map((style, index) => {
      const button = document.createElement('button');
      button.className = 'style-button';
      button.innerText = style.name;
      button.dataset.path = style.path;
      button.dataset.index = index.toString();
      document.body.appendChild(button);

      return button;
    });
  });

  it('adds the style to the <head>', () => {
    MMMStyleChanger.switchStyles({
      currentTarget: mockButtons[0],
    });

    const css = document.head.querySelector('link[href="config/custom1.css"]');

    expect(css).not.toBe(null);
    expect(css.rel).toBe('stylesheet');
    expect(css.type).toBe('text/css');
  });

  it('logs the state to the styles object', () => {
    MMMStyleChanger.switchStyles({
      currentTarget: mockButtons[1],
    });

    expect(MMMStyleChanger.styles[0].loaded).toBe(false);
    expect(MMMStyleChanger.styles[1].loaded).toBe(true);
  });

  it('will first unload any existing styles', () => {
    [
      MMMStyleChanger.styles[0],
      MMMStyleChanger.styles[2],
    ].forEach(loadStyle);

    MMMStyleChanger.switchStyles({
      currentTarget: mockButtons[1],
    });

    const css1 = document.head.querySelector('link[href="config/custom1.css"]');
    const css2 = document.head.querySelector('link[href="config/custom2.css"]');
    const css3 = document.head.querySelector('link[href="config/custom3.css"]');

    expect(css1).toBeFalsy();
    expect(css3).toBeFalsy();
    expect(css2).toBeTruthy();
    expect(MMMStyleChanger.styles[0].loaded).toBe(false);
    expect(MMMStyleChanger.styles[1].loaded).toBe(true);
    expect(MMMStyleChanger.styles[2].loaded).toBe(false);
  });

  it('will NOT unload any styles if allowMultiple is enabled', () => {
    MMMStyleChanger.config.allowMultiple = true;
    [
      MMMStyleChanger.styles[0],
      MMMStyleChanger.styles[2],
    ].forEach(loadStyle);

    MMMStyleChanger.switchStyles({
      currentTarget: mockButtons[1],
    });

    const css1 = document.head.querySelector('link[href="config/custom1.css"]');
    const css2 = document.head.querySelector('link[href="config/custom2.css"]');
    const css3 = document.head.querySelector('link[href="config/custom3.css"]');

    expect(css1).toBeTruthy();
    expect(css2).toBeTruthy();
    expect(css3).toBeTruthy();
    expect(MMMStyleChanger.styles[0].loaded).toBe(true);
    expect(MMMStyleChanger.styles[1].loaded).toBe(true);
    expect(MMMStyleChanger.styles[2].loaded).toBe(true);
  });

  it('will unload itself if already loaded', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = MMMStyleChanger.styles[1].path;
    document.querySelector('head').appendChild(link);
    MMMStyleChanger.styles[1].loaded = true;

    MMMStyleChanger.switchStyles({
      currentTarget: mockButtons[1],
    });

    const oldCss = document.head.querySelector('link[href="config/custom1.css"]');
    const newCss = document.head.querySelector('link[href="config/custom2.css"]');

    expect(oldCss).toBeFalsy();
    expect(newCss).toBeFalsy();
    expect(MMMStyleChanger.styles[0].loaded).toBe(false);
    expect(MMMStyleChanger.styles[1].loaded).toBe(false);
  });
});
