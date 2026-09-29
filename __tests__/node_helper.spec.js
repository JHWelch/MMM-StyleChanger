let helper;

jest.mock('@doist/todoist-sdk');

beforeEach(() => {
  helper = require('../node_helper.js');
  helper.setName('MMM-TodoistTouch');
});

describe('socketNotificationReceived', () => {
  it('does nothing', () => {
    expect(true).toBe(true);
  });
});
