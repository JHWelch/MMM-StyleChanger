nunjucks = require('../__mocks__/nunjucks');

translate = (str) => str;

let data;
let template;

describe('loading', () => {
  beforeEach(() => {
    template = nunjucks.render('MMM-StyleChanger.njk', data);
  });

  it('does nothing', () => {
    expect(template.trim()).toBe('<div></div>');
  });
});
