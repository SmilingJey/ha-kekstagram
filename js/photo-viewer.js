'use strict';
(function(){
  var openedPhotoData;
  var loadCommentFrom = 0;

  var photoViewerElement = document.querySelector('.big-picture');
  var imgElement = photoViewerElement.querySelector('.big-picture__img img');
  var captionElement = photoViewerElement.querySelector('.social__caption');
  var likesCountElement = photoViewerElement.querySelector('.likes-count');
  var commentsCountElement = photoViewerElement.querySelector('.social__comment-count');
  var commentsListElement = photoViewerElement.querySelector('.social__comments');
  var bodyElement = document.querySelector('body');
  var loadCommentsElement = photoViewerElement.querySelector('.social__comments-loader');
  var closeButtonElement = photoViewerElement.querySelector('.big-picture__cancel');

  //закрытие и открытие окна
  var openPhotoViewer = function () {
    photoViewerElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onPhotoViewerEsc);
    loadDataPhotoViewer(openedPhotoData);
  }

  var closePhotoViewer = function () {
    photoViewerElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onPhotoViewerEsc);
  }

  var onPhotoViewerEsc = function (evt) {
    window.utils.isEscEvent(evt, closePhotoViewer);
  }

  closeButtonElement.addEventListener('click', closePhotoViewer);

  //загрузка данных в окно
  var loadDataPhotoViewer = function(photoData) {
    clearPhotoViewer();
    imgElement.src = photoData.url;
    captionElement.textContent = photoData.description;
    likesCountElement.textContent = photoData.likes;
    loadComments(photoData.comments);
  }

  var clearPhotoViewer = function() {
    loadCommentFrom = 0;
    imgElement.src = '';
    captionElement.textContent = '';
    likesCountElement.textContent = '';
    commentsCountElement.textContent = '';
    while (commentsListElement.firstChild) {
      commentsListElement.removeChild(commentsListElement.firstChild);
    }
    loadCommentsElement.classList.remove('hidden');
  }

  //загрузка комментариев
  loadCommentsElement.addEventListener('click', function(){
    if (openedPhotoData) {
      loadComments(openedPhotoData.comments);
    }
  });

  var loadComments = function(commentsData) {
    var LOAD_COUNT = 5;
    var fragment = document.createDocumentFragment();
    var commentCount = commentsData ? commentsData.length : 0;
    var i = loadCommentFrom;
    while (i < loadCommentFrom + LOAD_COUNT && i < commentCount) {
      fragment.appendChild(createComment(commentsData[i++]));
    }
    commentsListElement.appendChild(fragment);

    if (i === commentCount) {
      loadCommentFrom = commentCount;
      loadCommentsElement.classList.add('hidden');
    }else loadCommentFrom = loadCommentFrom + LOAD_COUNT;

    var commentCountText = `${loadCommentFrom} из <span class="comments-count">${commentCount}</span> комментариев`;
    if (!commentCount) commentCountText = 'Пока нет комментариев';
    commentsCountElement.innerHTML = commentCountText;
  }

  var createComment = function(commentData) {
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    var avatarElement = document.createElement('img');
    avatarElement.classList.add('social__picture');
    avatarElement.alt = 'Аватар комментатора фотографии';
    avatarElement.width = '35';
    avatarElement.height = '35';
    avatarElement.src = commentData.avatar;
    commentElement.appendChild(avatarElement);
    var textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = commentData.message;
    commentElement.appendChild(textElement);
    return commentElement;
  }

  window.openPhoto = function(photoData){
    openedPhotoData = photoData;
    openPhotoViewer();
  }
})();
