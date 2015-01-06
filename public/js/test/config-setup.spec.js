define(['jquery'], function ($) {
  'use strict';

  describe('The tests', function () {
    it('should pass this test', function () {
      expect(true)
        .toBeTruthy();
    });

    it('should fail this test before I add the not', function () {
      expect(false)
        .not.toBeTruthy();
    });

    it('should have jquery defined', function () {
      expect($().jquery)
        .toBe('2.1.3');
    });
  });
});
