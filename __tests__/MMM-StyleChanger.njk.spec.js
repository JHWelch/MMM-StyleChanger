nunjucks = require('../__mocks__/nunjucks');

translate = (str) => str;

let data;
let template;

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

it('has a data attribute for custom CSS', () => {
  expect(template).toContain('data-path="config/custom1.css"');
  expect(template).toContain('data-path="config/custom2.css"');
});

it('has an index data property', () => {
  expect(template).toContain('data-index="0"');
  expect(template).toContain('data-index="1"');
});
