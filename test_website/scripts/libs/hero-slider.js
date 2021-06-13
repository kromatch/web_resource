class HeroSlider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }

  _initSwiper() {
    return new Swiper(this.el, {
      // Optional parameters
      // direction: 'vertical', //verticalは縦方向にスライドする　コメントアウトすれば横スライド
      loop: true,
      grabCursor: true,
      effect: "coverflow", //fadeは画像がフェードしながら変化する  coverflowなら少し立体
      centeredSlides: true, //スライダーが中央揃えになる
      slidesPerView: 1, //何枚のスライドを表示させるか
      speed: 1000, //transitionする間隔
      breakpoints: {
        //1024px時点でスライドの数を2にする
        1024: {
          slidesPerView: 2,
        },
      },
    });
  }

  start(options = {}) {
    options = Object.assign(
      {
        delay: 4000, //4秒毎に切り替わる
        disableOnInteraction: false,
      },
      options);

    this.swiper.params.autoplay = options;
    this.swiper.autoplay.start();
  }

  stop() {
    this.swiper.autoplay.stop();
  }
}