/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function ()
{
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function ()
  {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function ()
    {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Second test: a test that loops through each feed in the allFeeds object
     *  and ensures it has a URL defined and that the URL is not empty
     */

    it('have URLs defined, and URLs are not empty', function ()
    {
      for (let i = 0; i < allFeeds.length; i++)
      {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });

    /* Third test: a test that loops through each feed in the allFeeds object
     *  and ensures it has a name defined and that the name is not empty
     */

    it('have names defined, and names are not empty', function ()
    {
      for (let i = 0; i < allFeeds.length; i++)
      {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });

  });

  describe('The menu', function ()
  {
    const body = $('body');

    /* A test that ensures the menu element is hidden by default.
     * The menu is hidden if the body has the class 'menu-hidden'
     */

    it('is hidden by default', function ()
    {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* A test that ensures the menu changes visibility when the menu icon
     * is clicked. This test should have two expectations:
     * does the menu display when clicked and does it hide when clicked again.
     * I'm using the trigger function, to trigger click event to the menu icon
     */

    it('changes visibility when the menu icon is clicked', function ()
    {
      const menuIcon = $('.menu-icon-link');
      menuIcon.trigger('click');
      expect(body.hasClass('menu-hidden')).toBe(false);
      menuIcon.trigger('click');
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

  });

  describe('Initial Entries', function ()
  {

    // Testing an asynchonous function so... Using the done() function

    beforeEach(function (done)
    {
      loadFeed(0, function ()
      {
        done();
      });
    });

    /* The code is self-explanatory
     */

    it(' when the loadFeed function is called and completes its work, there ' +
      'is at least a single .entry element within the .feed container',
      function (done)
      {
        const container = $('.feed');
        expect(container.children().length).toBeGreaterThan(0);
        done();
      })

  });

  describe('New Feed Selection', function ()
  {
    /* To check if the loadFeed function has changed the content in the feed list
     * I'm comparing first of all the length of the list before loadFeed is
     * used, and after the function (which runs with a random index)
     * Then I'm comparing every HTML node of the two lists
     * If there is at least one element which is different, it means the list
     * was updated, and the boolean variable is set to 'true'.
     */

    let index = Math.floor((Math.random() * 2) + 1);
    const container = $('.feed');
    let feedList;

    beforeEach(function (done)
    {
      feedList = container.children().slice();
      loadFeed(index, function ()
      {
        done();
      })
    });

    it('when a new feed is loaded by the loadFeed function the content ' +
      'actually changes.',
      function (done)
      {
        let testBool = false;

        if (container.children().length != feedList.length) testBool = true;
        else
        {
          for (let i = 0; i < container.children().length && i < feedList.length; i++)
          {
            if (!(container.children()[i]).isEqualNode(feedList[i]))
            {
              testBool = true;
              break;
            }

          };
        }
        expect(testBool).toBe(true);
        done();
      });


  });

}());