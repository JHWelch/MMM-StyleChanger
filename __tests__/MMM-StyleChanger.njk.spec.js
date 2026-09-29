nunjucks = require('../__mocks__/nunjucks');

translate = (str) => str;

let data;
let template;

describe('loading', () => {
  beforeEach(() => {
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
    data = {styles};
    template = nunjucks.render('MMM-StyleChanger.njk', data);
  });

  it('shows the name of every style', () => {
    expect(template).toContain('Style 1');
    expect(template).toContain('Style 2');
  });
});
