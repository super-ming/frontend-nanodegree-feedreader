/* eslint-env jasmine */
/* global allFeeds, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', () => {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty.
       */
      it('are defined', () => {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).toBeGreaterThan(0);
      });

      /* Test that loops through each feed in the allFeeds object
       * and ensures it has a URL defined and that the URL is not empty.
       */
      it('url is defined', function() {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).toBeGreaterThan(true);
        });
      });

      /* Test that loops through each feed in the allFeeds object and
       *  ensures it has a name defined and that the name is not empty.
       */
      it('name is defined', function() {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).toBeGreaterThan(true);
        });
      });
  });

  describe('The menu', function() {
      const body = document.body,
          menuIcon = document.querySelector('.menu-icon-link');

      /* Test that ensures the menu element is hidden by default.*/
       it('is hidden by default', function() {
         expect(body.classList).toContain('menu-hidden');
       });
       /* Test that ensures the menu changes visibility when the menu icon
        * is clicked. This test should have two expectations: does the menu
        * display when clicked and does it hide when clicked again.
        */
        it('is shown/hidden when clicked', function() {
          menuIcon.click();
          expect(body.classList).not.toContain('menu-hidden');
          menuIcon.click();
          expect(body.classList).toContain('menu-hidden');
        });
  });

  describe('Intial Entries', function() {
      /* Test that ensures when the loadFeed function is called and
       * completes its work, there is at least a single .entry element
       * within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       beforeEach(function(done) {
         loadFeed(0, done);
       });

       it('completes work', function() {
         const feed = document.querySelector('.feed');
         expect(feed.querySelectorAll('.entry').length).toBeGreaterThan(0);
       });
});

  describe('New Feed Selection', function() {
    /* Test that ensures when a new feed is loaded by the loadFeed function
     * that the content actually changes. Remember, loadFeed() is asynchronous.
     */
     const feed = document.querySelector('.feed');
     let firstFeed = feed.innerHTML;
     beforeEach(function(done) {
       // Load first feed
       loadFeed(0, function() {
         // Once the first feed is loaded, save the entries into a variable.
         // Then, load the second feed and signal completion of asynchronous
         // function.
         firstFeed = feed.innerHTML;
         loadFeed(1,done);
       });
     });

     it('content changes', function() {
       expect(feed.innerHTML === firstFeed).toBe(false);
     });
   });
}());
