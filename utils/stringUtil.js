
function substringStr(target) {
  if (target && target.length > 12) {
    target = target.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
    if(!target){
      return '匿名';
    } else {
      return target.slice(0, 12) + '...';
    }
  }
  return target;
}

module.exports = {
  substringStr: substringStr
}