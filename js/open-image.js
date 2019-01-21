(function(){
  var uploadFormElement = document.querySelector('#upload-select-image');
  var inputUploadFileElement = uploadFormElement.querySelector('#upload-file');
  var imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
  var filterPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');
  var uploadEditorElement = uploadFormElement.querySelector('.img-upload__overlay');
  var closeButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
  var effectLevelElement = uploadFormElement.querySelector('.img-upload__effect-level');
  var effectLevelValueElement = uploadFormElement.querySelector('.effect-level__value');
  var effectsListElement = uploadFormElement.querySelector('.effects__list');
  var scaleSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
  var scaleValueElement = uploadFormElement.querySelector('.scale__control--value');

  //закрытие формы
  closeButtonElement.addEventListener('click', function () {
    closeUploadEditior();
  });

  var onUploadEditorEsc = function(evt) {
    window.util.isEscEvent(evt, closeUploadEditior);
  }

  var closeUploadEditior = function(img) {
    uploadFormElement.reset();
    uploadEditorElement.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEditorEsc);
  }

  // загрузка изображения
  var onUploadImage = function(evt) {
    showUploadEditior(evt.target.result);
  }

  inputUploadFileElement.addEventListener('change', function() {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    window.loadInputFiles(inputUploadFileElement.files, onUploadImage, FILE_TYPES);
  });

  //открытие формы
  var resetEditor = function() {
    setScale(100);
    effectLevelElement.classList.add('hidden');
    setEffect();
  }

  var showUploadEditior = function(img) {
    imgPreviewElement.src = img;
    Array.from(filterPreviewElements).forEach(function(elem) {
      elem.style.backgroundImage = `url(${img})`;
    });
    uploadEditorElement.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEditorEsc);
    resetEditor();
  }

  //изменение выбранного эффекты
  var onChangeEffect = function(evt) {
    if (evt.target.value === 'none') effectLevelElement.classList.add('hidden');
    else effectLevelElement.classList.remove('hidden');
    effectLevelValueElement.value = 100;
    setEffect();
  }

  effectsListElement.addEventListener('change', onChangeEffect);

  var setEffect = function() {
    var effect = uploadFormElement.querySelector('.effects__radio:checked').value;
    var value = effectLevelValueElement.value;
    var filter = "none";
    if (effect === 'chrome') filter = `grayscale(${value})`;
    else if (effect === 'sepia') filter = `sepia(${value})`;
    else if (effect === 'marvin') filter = `invert(${value*100}%)`;
    else if (effect === 'phobos') filter = `blur(${value*3}px)`;
    else if (effect === 'heat') filter = `brightness(${value*2 + 1})`;
    imgPreviewElement.style.filter = filter;
  }

  //изменение масштаба
  var setScale = function(scale){
    if (scale > 100) scale = 100;
    if (scale < 25) scale = 25;
    scaleValueElement.value = scale + '%';
    imgPreviewElement.style.transform = `scale(${scale/100})`;
  };

  scaleSmallerElement.addEventListener('click', function() {
    setScale(parseInt(scaleValueElement.value) - 25);
  });

  scaleBiggerElement.addEventListener('click', function() {
    setScale(parseInt(scaleValueElement.value) + 25);
  });
})();
