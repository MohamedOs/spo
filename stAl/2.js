var vars2={}; var arr2 = [];
function pri2(pageNumber){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
    if (err) {
        alert('Error: ' + err);
    } else {
        vars2.data=select(dom,'script');
        var dataNeu=vars2.data[7].children[0].data;
        dataNeu=dataNeu.split('var news = new Array')[1];
        dataNeu=dataNeu.split(');')[0];
        dataNeu=dataNeu.slice(4, -6);
        var arrIn = eval("[" + dataNeu + "]");
        //var arr=new Array+dataNeu;
        //dataNeu=dataNeu.replace("\n","}{");
        //Ti.API.info(arr);
        //Ti.API.info(arr[8]);
        //Ti.API.info("arr[0]");
        for(var i=0;i<6;i++){
            var imageRow=arrIn[(i*7)+3];
            imageRow=imageRow.split('&z=120')[0];
            arr2.push({
            image:imageRow,
            title:arrIn[(i*7)+4],
            href:"http://www.kooora.com/?"+arrIn[(i*7)+1],
            des:arrIn[(i*7)+6],
            cat:arrIn[(i*7)+2]
              });
            
        }
        Ti.API.info(arr2);
    }
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
    Titanium.API.info('error');
};
var queryIndexCat='http://www.kooora.com/?n=0&o=ncdz&pg='+pageNumber;
xhr.open("GET",queryIndexCat);
xhr.send();

}
