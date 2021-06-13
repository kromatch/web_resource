class MobileMenu {
  constructor() {
    //必要な値をthisに格納
    //DOMのボタンクリックのハンドリングをするのでボタンのDOMが必要
    this.DOM = {}; //オブジェクトリテラルで初期化   age: 20とか入れる
    //以下DOMに格納
    this.DOM.btn = document.querySelector(".mobile-menu__btn");
    this.DOM.cover = document.querySelector(".mobile-menu__cover");
    this.DOM.container = document.querySelector("#global-container");

    //ブラウザがスマホかPCかによってイベントタイプを変更できる
    // window.ontouchstartのプロパティが存在するか否かで判断
    this.eventType = this._getEventType();
    this._addEvnet();
  }

  //特定の処理をクラス内で行う場合は、プライベートメソッドに切り出した方がいい
  _getEventType(){
    return window.ontouchstart ? 'touchstart' :'click';
  }

  _toggle() {
    this.DOM.container.classList.toggle("menu-open");
  }

  _addEvnet() {
    //複数addEvnetをする際には、メソッドを呼び出せる形にして、別にすると良い
    //イベント登録
    //MobileMenuの中の要素にアクセスするためthis束縛して、渡す感じ
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}

