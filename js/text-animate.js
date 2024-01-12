$(function(){
   let delayTime = 1000*2;//miliSecond
   var node = $('#animate-text');
   let text = node.text();
   node.html('');
   let wordArray = text.split(',');
   let arrayLength = wordArray.length;
   let i=0;


   setInterval(function(){
    node.fadeTo(delayTime/2, 1);
    node.html(wordArray[i].trim());
    node.fadeTo(delayTime/2, 0);
    i=(i+1)%arrayLength;
   }, delayTime);


});
