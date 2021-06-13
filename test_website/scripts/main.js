document.addEventListener("DOMContentLoaded", function () {
  const maiin = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector(".header");
    this.sides = document.querySelectorAll(".side");
    this._observers = [];
    this._init();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider(".swiper-container");
    Pace.on("done", this._paceDone.bind(this)); //NWが遅い場合ローディングが完了した後にアニメーションが起きるよう
  }
  _paceDone() {
    this._scrollInit();
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }
  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side => side.classList.add("inview"));
    } else {
      this.header.classList.remove("inview");
    }
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }

  _textAnimation(el, isIntersecting) {
    if (isIntersecting) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _destroyObservers() {
    this.observers.forEach((ob) => {
      ob.destroy();
    });
  }

  _destroy() {
    this._destroyObservers();
  }

  _scrollInit() {
    //setとgetで値を設定 _を付けた変数を見た時はクラス内でgetやsetメソッドあるか確認
    this.observers = new ScrollObserver(
      ".nav-trigger",
      this._navAnimation.bind(this),
      { once: false }
    );
    this.observers = new ScrollObserver(".cover-slide", this._inviewAnimation);
    this.observers = new ScrollObserver(
      ".tween-animate-title",
      this._textAnimation
    );
    this.observers = new ScrollObserver(
      ".swiper-container",
      this._toggleSlideAnimation.bind(this),
      { once: false }
    );
    this.observers = new ScrollObserver(".appear", this._inviewAnimation);
    this.observers = new ScrollObserver("#main-content", this._sideAnimation.bind(this),{once:false,rootMargin:"-300px 0px"}); //rootmarginがないとすでに表示されてしまう　main-conttentが300px動いてから発火するようにする
  }
}
