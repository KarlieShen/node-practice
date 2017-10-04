module.exports.isEmptyObj = (obj) => {   
　　for (var name in obj){
　　　　return false;
　　}　　
　　return true;
}