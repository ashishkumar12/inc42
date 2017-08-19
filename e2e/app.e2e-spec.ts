import { Inc42Page } from './app.po';

describe('inc42 App', () => {
  let page: Inc42Page;

  beforeEach(() => {
    page = new Inc42Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
