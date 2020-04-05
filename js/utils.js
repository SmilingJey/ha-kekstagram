'use strict';

(function () {
  var checkFileType = function (file, fileTypes) {
    var fileName = file.name.toLowerCase();
    return fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var ESC_KEYCODE = 27;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    showMessage: function (messageElement, mainElement) {
      var onMessageEsc = function (evt) {
        window.utils.isEscEvent(evt, closeMessage);
      };

      var closeMessage = function () {
        mainElement.removeChild(messageElement);
        document.removeEventListener('keydown', onMessageEsc);
      };

      messageElement.addEventListener('click', closeMessage);
      document.addEventListener('keydown', onMessageEsc);
      mainElement.appendChild(messageElement);
    },

    loadInputFiles: function (files, onPreLoad, onLoad, fileTypes) {
      for (var i = 0; i < files.length; i++) {
        if (files[i] && checkFileType(files[i], fileTypes)) {
          onPreLoad(files[i]);
          var reader = new FileReader();
          reader.addEventListener('load', onLoad);
          reader.readAsDataURL(files[i]);
          return true;
        }
      }
      return false;
    },

    shuffleArray: function(array) {
      var newArray = array.slice(0);
      for (var i = newArray.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = newArray[i];
          newArray[i] = newArray[j];
          newArray[j] = temp;
      }
      return newArray;
  }
  };
})();
