'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var mainElement = document.querySelector('main');

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };
})();
