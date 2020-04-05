'use strict';

(function() {
  var photoFilterElement = document.querySelector('.img-filters');
  var filterPopularElement = photoFilterElement.querySelector('#filter-popular');
  var filterNewElement = photoFilterElement.querySelector('#filter-new');
  var filterDiscussedElement = photoFilterElement.querySelector('#filter-discussed');
  var filterButtons = photoFilterElement.querySelectorAll('.img-filters__button');

  var setActiveButton = function(activeButton) {
    Array.from(filterButtons).forEach(button => button.classList.remove('img-filters__button--active'));
    activeButton.classList.add('img-filters__button--active');
  };

  filterPopularElement.addEventListener('click', function() {
    if (window.photoLoader.getLoadedPhotos()){
      setActiveButton(filterPopularElement);
      updateFilter();
    }
  });

  filterNewElement.addEventListener('click', function() {
    if (window.photoLoader.getLoadedPhotos()){
      setActiveButton(filterNewElement);
      updateFilter();
    }
  });

  filterDiscussedElement.addEventListener('click', function() {
    if (window.photoLoader.getLoadedPhotos()){
      setActiveButton(filterDiscussedElement);
      updateFilter();
    }
  });

  var getNewPhotos = function(photos) {
    return window.utils.shuffleArray(photos).slice(0, 10);
  };

  var getPopularPhotos = function(photos) {
    return photos.slice(0).sort(function(a, b) {
       var aCount = a.comments ? a.comments.length : 0;
       var bCount = b.comments ? b.comments.length : 0;
       return bCount - aCount;
    });
  }

  var updateFilter = window.debounce(function () {
    if (window.photoLoader.getLoadedPhotos()){
      var currentFilter = photoFilterElement.querySelector('.img-filters__button--active');
      if (currentFilter === filterPopularElement){
        window.photoLoader.showPhotos(window.photoLoader.getLoadedPhotos());
      } else if (currentFilter === filterNewElement) {
        var newPhotos = getNewPhotos(window.photoLoader.getLoadedPhotos());
        window.photoLoader.showPhotos(newPhotos);
      } else if (currentFilter === filterDiscussedElement) {
        var popularPhotos = getPopularPhotos(window.photoLoader.getLoadedPhotos());
        window.photoLoader.showPhotos(popularPhotos);
      }
    }
  });

  window.showPhotoFilter = function () {
    photoFilterElement.classList.remove('img-filters--inactive');
  }
})();
