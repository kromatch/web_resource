document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("#btn");
  const ta = new TextAnimation(".animate-title");
  const ta2 = new TextAnimation(".animate-title2");
  //1秒後にアニメーションを発動

   //newで呼ばれたタイミングのanimateのthisはTextAnimationクラスのオブジェクトを参照する
   //オブジェクトのメソッドとして読んでいる
  setTimeout(() => {
    ta.animate();
    ta2.animate();
  }, 1000);

 //btnのように他のオブジェクトのメソッド=addEventListenerが呼ばれる時の関数(コールバック関数)animateで呼ばれるthisは直近のオブジェクト=btnとなる
  //addEventListenerにクリックを指定する時、thisが何をさしているか確認すること
  //ta.animateだけだと、DOMで取りに行くのが TextAnimationではなく<button id="btn">Animation</button>となる
  btn.addEventListener('click', ta.animate.bind(ta));
  btn.addEventListener('click', ta2.animate.bind(ta2));
});

class TextAnimation {
  constructor(el) {
    this.el = document.querySelector(el);
    this.chars = this.el.innerHTML.trim().split("");
    this.el.innerHTML = this._splitText();
  }
  //_がつくとプライベートメソッド(とはいえ、JSでは厳格に縛れないので暗黙的に明示)
  _splitText() {
    return this.chars.reduce((acc, curr) => {
      curr = curr.replace(" ", "&nbsp;");
      return `${acc} <span class="char">${curr}</span>`;
    }, "");
  }
  //パブリックメソッド
  animate() {
    console.log(this);
    this.el.classList.toggle("inview"); //ta.animate.bindで縛るとthis=taとなる
  }
}
