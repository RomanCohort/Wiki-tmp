(function () {
  var view, controller, scheduled = false;
  var startSlide = Math.max(0, Math.min(70, Number(new URLSearchParams(location.search).get('startslide')) || 0));
  var initializing = true;
  function sceneReady(canvas) {
    var images = Array.from(canvas?.querySelectorAll('img') || []).filter(function (image) {
      var rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    return images.length > 0 && images.every(function (image) { return image.complete && image.naturalWidth > 0; });
  }
  function send() {
    scheduled = false;
    if (!controller || !view) return;
    if (initializing && controller.currentSlideIndex() !== startSlide) return;
    initializing = false;
    // iSpring 11 exposes the actual slide canvas through its public view API.
    // Individual .slide elements contain absolutely positioned objects and have no size.
    var canvas = view.slidesContainer();
    var rect = canvas && canvas.getBoundingClientRect();
    parent.postMessage({ type: 'experiment9-player', index: controller.currentSlideIndex(), ready: sceneReady(canvas),
      metrics: rect && rect.width > 0 && rect.height > 0
        ? { left: rect.left, top: rect.top, width: rect.width } : null }, location.origin);
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(send); }
  }
  window.ispringPresentationConnector = { register: function (player) {
    try {
      view = player.view();
      controller = view.playbackController();
      controller.gotoSlide(startSlide);
      controller.slideChangeEvent().addHandler(schedule);
      view.resizeEvent().addHandler(schedule);
      // Registration happens before iSpring attaches/replaces #playerView.
      var observer = new MutationObserver(schedule);
      observer.observe(document.documentElement, { childList: true, subtree: true });
      document.addEventListener('load', schedule, true);
      schedule();
      setTimeout(function () {
        if (controller.currentSlideIndex() < 0) controller.gotoSlide(startSlide);
        schedule();
      }, 250);
      var poll = setInterval(function () {
        schedule();
        var canvas = view.slidesContainer();
        if (!initializing && canvas?.getBoundingClientRect().width > 0 && sceneReady(canvas)) clearInterval(poll);
      }, 100);
      window.addEventListener('pagehide', function () { clearInterval(poll); }, { once: true });
    } catch (error) {
      console.error('Experiment 9 player initialization failed', error);
      parent.postMessage({ type: 'experiment9-player-error' }, location.origin);
    }
  }};
  document.addEventListener('keydown', function (event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
  window.addEventListener('message', function (event) {
    if (event.source !== parent || event.origin !== location.origin || !controller) return;
    if (event.data && event.data.type === 'experiment9-goto' && Number.isInteger(event.data.index)) {
      var target = Math.max(0, Math.min(70, event.data.index));
      if (target > controller.currentSlideIndex()) return;
      controller.gotoSlide(target);
      schedule();
    }
  });
})();
