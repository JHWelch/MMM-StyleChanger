/* global Module */

/* Magic Mirror
 * Module: MMM-StyleChanger
 *
 * By Jordan Welch
 * MIT Licensed.
 */

Module.register('MMM-StyleChanger', {
  defaults: {
    //
  },

  requiresVersion: '2.28.0',

  loading: true,

  start () {
    Log.info(`Starting module: ${this.name}`);
  },

  getTemplate () {
    return 'MMM-StyleChanger.njk';
  },

  getTemplateData () {
    return {
      //
    };
  },

  getStyles () {
    return [
      // 'font-awesome.css',
      'MMM-StyleChanger.css',
    ];
  },

  getTranslations () {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json',
    };
  },

  socketNotificationReceived (_notification, _payload) {
    //
  },
});
