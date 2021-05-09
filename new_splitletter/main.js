document.addEventListener('DOMContentLoaded',function(){
const ta = new TextAnimation('.animate-title');
const ta2 = new TextAnimation('.animate-title2');
//1秒後にアニメーションを発動
setTimeout(()=>{  
  ta.animate();
  ta2.animate();
      },1000);
});


class TextAnimation {
  constructor(el) {
    this.el = document.querySelector(el);
    this.chars = this.el.innerHTML.trim().split("");
    this.el.innerHTML = this._splitText();
  

  }
//_がつくとプライベートメソッド(とはいえ、JSでは厳格に縛れないので暗黙的に明示)
  _splitText() {
    return this.chars.reduce((acc,curr) => {
      curr =curr.replace(' ','&nbsp;'); 
      return `${acc} <span class="char">${curr}</span>`;
    },"");
  }
//パブリックメソッド
  animate(){
    this.el.classList.toggle('inview');
  }
  }


