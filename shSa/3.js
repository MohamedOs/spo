var vars3={}; var arr3 = [];
function pri3(pageNumber){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
    if (err) {
        alert('Error: ' + err);
    } else {
        vars3.data=select(dom,'script');
        var dataNeu;
for(var i=0;i<vars3.data.length;i++){
if(vars3.data[i].children){
dataNeu+=vars3.data[i].children[0].data;
}
}
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
            arr3.push({
            image:imageRow,
            title:arrIn[(i*7)+4],
            href:"http://www.kooora.com/?"+arrIn[(i*7)+1],
            des:arrIn[(i*7)+6],
            cat:arrIn[(i*7)+2]
              });
            
        }
        Ti.API.info(arr3);
    }
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
    Titanium.API.info('error');
};
var queryIndexCat='http://www.kooora.com/?n=0&o=nc_0&pg='+pageNumber;
xhr.open("GET",queryIndexCat);
xhr.send();

}
