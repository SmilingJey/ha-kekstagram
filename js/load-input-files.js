(function() {
  var checkFileType = function (file, fileTypes) {
    var fileName = file.name.toLowerCase();
    return fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
  };


  window.loadInputFiles = function (files, onLoad, fileTypes) {
    for (var i = 0; i < files.length; i++) {
      if (files[i] && checkFileType(files[i], fileTypes)) {
        var reader = new FileReader();
        reader.addEventListener('load', onLoad);
        reader.readAsDataURL(files[i]);
      }
    }
  };
})();
