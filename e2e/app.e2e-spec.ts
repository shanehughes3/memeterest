import { MemeterestPage } from './app.po';

describe('memeterest App', () => {
  let page: MemeterestPage;

  beforeEach(() => {
    page = new MemeterestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
