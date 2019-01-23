'use strict';

(function() {

  var InputRange = function(barSelector, barFilledSelector,
                               pinSelector, onChange, initPosition) {
    var bar = document.querySelector(barSelector);
    var barFilled = document.querySelector(barFilledSelector);
    var pin = document.querySelector(pinSelector);

    this.bar = bar;
    this.barFilled = barFilled;
    this.pin = pin;
    this.onChange = onChange;
    var self = this;

    if (initPosition) self.setPosition(initPosition);

    var onMouseDown = function(mouseDownEvent) {
      mouseDownEvent.preventDefault();
      var dragged = false;
      var coord = mouseDownEvent.clientX;
      var startCoord = pin.offsetLeft;

      var onMouseMove = function(mouseMoveEvent){
        mouseMoveEvent.preventDefault();
        dragged = true;
        var shift = mouseMoveEvent.clientX - coord;
        var newPinPosition = (startCoord + shift) / bar.offsetWidth;
        if (newPinPosition > 1) newPinPosition = 1;
        else if (newPinPosition < 0) newPinPosition = 0;
        self.setPosition(newPinPosition);
        if (onChange) onChange(newPinPosition);
      }

      document.addEventListener('mousemove', onMouseMove);

      var onMouseUp = function (mouseUpEvent) {
        mouseUpEvent.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            pin.removeEventListener('click', onClickPreventDefault);
          };
          pin.addEventListener('click', onClickPreventDefault);
        }
      };
      document.addEventListener('mouseup', onMouseUp);
    }

    pin.addEventListener('mousedown', onMouseDown);
  }

  InputRange.prototype.setPosition = function(position) {
    this.pin.style.left = position * 100 + '%';
    this.barFilled.style.width = position * 100 + '%';
    if (this.onChange) this.onChange(position);
  }

  InputRange.prototype.getPosition = function(position) {
    return parseInt(this.pin.style.left)/100;
  }

  window.InputRange = InputRange;
})();
