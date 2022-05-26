// function Si(x) {
//     return x-x*x*x/18+Math.pow(x,5)/600;
// }

function Si(x) {
    var one = 1;
    var res = 0;
    for(var n = 0; n<=20; n++) {
  
        var k = 2*n+1;  // дабы в следующей строке 3 раза не вычислять
         
        var cur = Math.pow(x, k) / ( k * fact(k));    // очередной член разложения
  
        // а здесь (imho) надо как-то умудриться отловить момент, когда точности
        // не хватает и в cur пишется 1.#INF. Если это происходит, сразу break из
        // цикла и возвращаем результат. Только блин =(
  
        res += one * cur;   // суммируем
          // номер следующего слагаемого
        one = -one; // меняем знак у следующего слагаемого
    }
    return res;
}

function Ci(x) {
    var one = -1;
    var res = Math.log(x)+0.5772157;
    for(var n = 1; n<=20; n++) {
  
        var k = 2*n;  // дабы в следующей строке 3 раза не вычислять
         
        var cur = Math.pow(x, k) / ( k * fact(k));    // очередной член разложения
  
        // а здесь (imho) надо как-то умудриться отловить момент, когда точности
        // не хватает и в cur пишется 1.#INF. Если это происходит, сразу break из
        // цикла и возвращаем результат. Только блин =(
  
        res += one * cur;   // суммируем
          // номер следующего слагаемого
        one = -one; // меняем знак у следующего слагаемого
    }
    return res;
}
function fact(x) {
    return x<=2?x:fact(x-1)*x;
}
function ReInt(x,t) {
    t = t+1;
    var xp = x+3;
    var xm = 3-x;
    return (-Math.sin(xm)*Ci(xm*t)-Math.sin(xp)*Ci(xp*t)+Math.cos(xp)*Si(xp*t)+Math.cos(xm)*Si(xm*t))/2;
}
function ImInt(x,t) {
    t = t+1;
    var xp = x+3;
    var xm = 3-x;
    return (Math.sin(xm)*Si(xm*t)-Math.sin(xp)*Si(xp*t)-Math.cos(xp)*Ci(xp*t)+Math.cos(xm)*Ci(xm*t))/2;
}
function make_points(a,b) {
    var pointsR = [];
    var pointsI = [];
    var h = 0.01;
    for(var w = a; w<=b; w+=h) {
        var chi = 2*w*Math.PI;
        pointsR.push(new Point(w,ReInt(chi,Math.PI)-ReInt(chi,0)));
        pointsI.push(new Point(w,ImInt(chi,Math.PI)-ImInt(chi,0)));
    }
    return {
        Re: pointsR,
        Im: pointsI
    };
}