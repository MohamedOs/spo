var varsS2={};
var arrS2 = [];   
function singlePost2(link){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
  if (err) {
    alert('Error: ' + err);
  } else {
    varsS2.data=select(dom,'script');
     var dataSingle;
for(var i=0;i<varsS2.data.length;i++){
if(varsS2.data[i].children){
dataSingle+=varsS2.data[i].children[0].data;
}
}
    var dataSingleImage=dataSingle.split('var article_images = new Array (')[1];
    dataSingleImage=dataSingleImage.split('"");')[0];
    dataSingleImage=dataSingleImage.slice(3, -7);
    dataSingle=dataSingle.split('var article_content = ')[1];
    dataSingle=dataSingle.split('var article_twtag')[0];
    dataSingle=dataSingle.slice(1, -4);
    //Ti.API.info(dataSingle);
    //var dataSingle2 = eval("[" + dataSingle + "]");
        // Ti.API.info(dataSingleImage);
         arrS2.push({
         image:dataSingleImage,
         content:dataSingle,
            });
         Ti.API.info(arrS2[0]);
      }
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
    Titanium.API.info('error');
};
var queryIndexCat=link;
xhr.open("GET",queryIndexCat);
xhr.send(); 
}
