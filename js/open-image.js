(function(){
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFormElement = document.querySelector('#upload-select-image');
  var inputUploadFileElement = uploadFormElement.querySelector('#upload-file');
  var imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
  var filterPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');
  var uploadEditorElement = uploadFormElement.querySelector('.img-upload__overlay');
  var closeButtonElement = uploadFormElement.querySelector('.img-upload__cancel');

  var onUploadImage = function(evt) {
    showUploadEditior(evt.target.result);
  }

  inputUploadFileElement.addEventListener('change', function(){
    window.loadInputFiles(inputUploadFileElement.files, onUploadImage, FILE_TYPES);
  });

  closeButtonElement.addEventListener('click', function () {
    uploadFormElement.reset();
    closeUploadEditior();
  });

  var onUploadEditorEsc = function(evt) {
    window.util.isEscEvent(evt, closeUploadEditior);
  }

  var showUploadEditior = function(img) {
    imgPreviewElement.src = img;
    Array.from(filterPreviewElements).forEach(function(elem) {
      elem.style.backgroundImage = `url(${img})`;
    });
    uploadEditorElement.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEditorEsc);
  }

  var closeUploadEditior = function(img) {
    uploadEditorElement.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEditorEsc);
  }


})();
