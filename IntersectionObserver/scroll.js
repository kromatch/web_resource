class ScrollObserver {
    constructor(els, cb, options) {
      this.els = document.querySelectorAll(els); //els=elements略
      const defaultOptions = {
        root: null, //交差対象としたい親の要素を入れる
        rootMargin: "0px", //デフォルトはviewpoint=画面いっぱいが交差点だが、指定できる
        threshold: 0,
        once: true, //デフォルト　一度画面に入れば、解除される
      };
      //assignというメソッドでoptionsとdefaultOptionsを統合する
      //後に設定された方にオブジェクトに同じ値がセットされても上書きされる
      this.cb = cb;
      this.options = Object.assign(defaultOptions, options);
      this.once = this.options.once; //onceが指定されたら、this.onceにはいる
      this._init();
    }
  
    //constructorで定義するものは、thisのプロパティに値に設定するものを入れた方が良い
    // プロパティに値を入れ切った後に複雑な初期化処理をした方が変数の定義漏れを防げる
  
    _init() {
      const callback = function (entries, observer) {  
        entries.forEach((entry) => { //entry=画面に入ってきた各要素　複数要素があるとき、どれが入ってきたのかわからないといけない
          if (entry.isIntersecting) {
            this.cb(entry.target, true); //第一引数は監視しているDOMを渡す。(entry.targetに画面に入ってきた要素が格納されている)第２引数に、交差しているかしていないかのtrue,falseを渡す
            if (this.once) {
              observer.unobserve(entry.target); //一度入ったタイミングで監視を止めたい時
            }
          } else {
            this.cb(entry.target, false);
          }
        });
      };
      //IntersectioObserは比較的新しいため、古いブラウザだと使えないことがある。そのため、polfillを入れると良い
      //IntersectionObserverはwindowのプロパティのクラスなので、この中のthisはwindowオブジェクト
      this.io = new IntersectionObserver(callback.bind(this), this.options);

        // @see https://github.com/w3c/IntersectionObserver/tree/master/polyfill
        this.io.POLL_INTERVAL =100;//100msの間隔で監視をする
        this.els.forEach((el) => this.io.observe(el));
      }
    //ユーザーが不要になったタイミングで、処理を開放とする
      destory(){
    this.io.disconnect();
      }
    }