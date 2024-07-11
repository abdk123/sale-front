import { SouccarTemplatePage } from './app.po';

describe('Souccar App', function() {
  let page: SouccarTemplatePage;

  beforeEach(() => {
    page = new SouccarTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
