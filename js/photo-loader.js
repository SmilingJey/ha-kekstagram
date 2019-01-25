'use strict';

(function() {
  var loadedPhotos;
  var photosContainerElement = document.querySelector('.pictures');

  var photoTemplate = document.querySelector('#picture')
                      .content
                      .querySelector('.picture');

  var createPhoto = function (photoData) {
    var photoElement = photoTemplate.cloneNode(true);

    var pictureImg = photoElement.querySelector('.picture__img');
    pictureImg.src = photoData.url;

    var pictureCommnets = photoElement.querySelector('.picture__comments');
    pictureCommnets.textContent = photoData.comments ? photoData.comments.length : 0;

    var pictureLikes = photoElement.querySelector('.picture__likes');
    pictureLikes.textContent = photoData.likes;

    photoElement.addEventListener('click', function() {
      window.openPhoto(photoData);
    });
    return photoElement;
  }

  var onLoadPhotosError = function(evt) {
    console.log('Error load photo ' + evt);
  }

  var onLoadPhotos = function(data) {
    loadedPhotos = data;
    window.photoLoader.showPhotos(loadedPhotos)
    window.showPhotoFilter();

  }

  var loadPhotos = function () {
    window.backend.loadCards(onLoadPhotos, onLoadPhotosError);
  };

  window.photoLoader = {
    showPhotos: function (photosData) {
      var photos = photosContainerElement.querySelectorAll('.picture');
      for (var i = 0; i < photos.length; i++) {
        photosContainerElement.removeChild(photos[i]);
      }

      var fragment = document.createDocumentFragment();
      photosData.forEach(function(photoData) {
        fragment.appendChild(createPhoto(photoData));
      });
      photosContainerElement.appendChild(fragment);
    },

    getLoadedPhotos: function () {
      return loadedPhotos;
    }
  }

  loadPhotos();
})();
