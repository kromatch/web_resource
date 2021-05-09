//downloadされるのはまたないが、HTML要素がDOMに変換されたタイミングで発火

//DOMContentLoadedのイベントリスナーにJSを登録をするとよい
document.addEventListener('DOMContentLoaded',function(){
const el = document.querySelector('.animate-title');
// console.log(el.innerHTML.trim(); //HTMLの文字列を取得+前後のスペースを削除

console.log(el.innerHTML.trim().split(""));
const str = el.innerHTML.trim().split("");

//innerHTMLはDOMへの操作なので、頻繁に書き換えるとパフォーマンスが悪くなる
//用途に合わせたメソッドを使う方が、他者が見た時に意図を理解しやすい
//forはなんでもできてしまうがゆえに、わかりにくい

el.innerHTML = str.reduce((acc,curr) => {
  curr =curr.replace(' ','&nbsp;'); 
  return `${acc} <span class="char">${curr}</span>`;
},"");

// let concatStr ='';

// const str = el.innerHTML.trim();
// for(let c of str){
//   //半角スペースを表示させるためには&nbsp;を代わりとして入れる
//   c =c.replace(' ','&nbsp;'); //半角を&nbsp;に置換
//   concatStr += `<span class="char">${c}</span>`
//  //spanで囲まれた文字列が生成される　バックティックで囲むと${}で変数を使える

// //文字列が繋がったHTMLが生成される
// }
// el.innerHTML = concatStr;
// // console.log(concatStr); 


});