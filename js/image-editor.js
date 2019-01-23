'use strict';

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
  var hashTagElement = uploadFormElement.querySelector('.text__hashtags');
  var commentElement = uploadFormElement.querySelector('.text__description');
  var submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

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
    effectRange.setPosition(1);
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

  //работы ползунка
  var onEffectValueChange = function(newValue) {
    effectLevelValueElement.value = newValue;
    setEffect();
  }

  var effectRange = new window.InputRange('.effect-level__line',
                                          '.effect-level__depth',
                                          '.effect-level__pin',
                                          onEffectValueChange, 1);

  //проверка поля хэштега
  var checkDublicates = function(array) {
    for(var i = 0; i <= array.length; i++) {
      for(var j = i; j <= array.length; j++) {
        if(i != j && array[i] == array[j]) {
          return true;
        }
      }
    }
    return false;
  }

  var checkHashTagValidity = function() {
    var customValidity = '';
    var text = hashTagElement.value.trim();
    if (text !== '') {
      var tags = text.split(' ');
      tags.map(tag => tag.toLowerCase());

      if (tags.length > 5) customValidity += 'Максимальное количество хештегов - 5. \n';

      var tooLongTag = tags.some(tag => tag.length > 20);
      if (tooLongTag) customValidity += 'Максимальная длинна хештега - 20 символов. \n';

      var noSharpTag = tags.some(tag => tag.charAt(0) !== '#');
      if (noSharpTag) customValidity += 'Все хештеги должны начинаться с # \n';

      var noSharpTag = tags.some(tag => tag === '#');
      if (noSharpTag) customValidity += 'Хештеги не могут состоять только из символа # \n';

      if (checkDublicates(tags)) customValidity += 'Не должно быть нескольких одинаковых хештегов \n';
    }

    hashTagElement.setCustomValidity(customValidity);
  }

  var checkCommentValidity = function() {
    if (commentElement.validity.tooLong) {
      commentElement.setCustomValidity('Комментарий не должен быть длиннее 140 символов');
    } else {
      commentElement.setCustomValidity('');
    }
  }

  hashTagElement.addEventListener('input', checkHashTagValidity);
  commentElement.addEventListener('input', checkCommentValidity);

  hashTagElement.addEventListener('keydown', function(evt) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) evt.stopPropagation();
  });

  commentElement.addEventListener('keydown', function(evt) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) evt.stopPropagation();
  });

  submitButtonElement.addEventListener('click', function(evt) {
    checkHashTagValidity();
    checkCommentValidity();
  });

})();
