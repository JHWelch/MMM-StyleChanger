/* global Module */

/* Magic Mirror
 * Module: MMM-StyleChanger
 *
 * By Jordan Welch
 * MIT Licensed.
 */

Module.register('MMM-StyleChanger', {
  defaults: {
    styles: [],
    allowMultiple: false,
  },

  requiresVersion: '2.28.0',

  styles: null,

  start () {
    Log.info(`Starting module: ${this.name}`);

    this.styles = this.config.styles.map((style) => ({
      ...style,
      loaded: false,
    }));
  },

  notificationReceived: function (notification, _payload, _sender) {
    if (['MODULE_DOM_CREATED', 'MODULE_DOM_UPDATED'].includes(notification) ) {
      this.bindTouchEvents();
    }
  },

  bindTouchEvents: function () {
    this.bindTouchEvent('.style-button', this.switchStyles);
  },

  bindTouchEvent (className, callback) {
    const elements = document.querySelectorAll(className);
    if (!elements || !elements.length) return;

    callback = callback.bind(this);

    elements.forEach((element) => {
      element.addEventListener('touchend', callback);
      element.addEventListener('click', callback);
    });
  },

  switchStyles (event) {
    const {currentTarget: el} = event;
    const style = this.styles[el.dataset.index];

    if (style.loaded) {
      this.removeStyle(style);

      return;
    }

    if (!this.config.allowMultiple){
      this.styles
        .filter((style) => style.loaded)
        .forEach((style) => this.removeStyle(style));
    }

    this.addStyle(style);
  },

  addStyle (style) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = style.path;
    document.querySelector('head').appendChild(link);

    style.loaded = true;
  },

  removeStyle (style) {
    document.head.querySelector(`link[href="${style.path}"]`)?.remove();
    style.loaded = false;
  },

  getTemplate () {
    return 'MMM-StyleChanger.njk';
  },

  getTemplateData () {
    return {
      styles: this.styles,
    };
  },

  getStyles () {
    return [
      'MMM-StyleChanger.css',
    ];
  },

  getTranslations () {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json',
    };
  },
});
