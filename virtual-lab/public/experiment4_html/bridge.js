(function () {
  var startSlide = Math.max(0, Math.min(30, Number(new URLSearchParams(location.search).get('startslide')) || 0));
  window.ispringPresentationConnector = { register: function (player) {
    var controller = player.view().playbackController();
    window.experiment4Controller = controller;
    controller.gotoSlide(startSlide);
  }};
  document.addEventListener('keydown', function (event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
})();
