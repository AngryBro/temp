function Si(x) {
    return x-x*x*x/3/fact(3)+Math.pow(x,5)/5/fact(5)-Math.pow(x,7)/7/fact(7);
}
function Ci(x) {
    var gamma = Math.log(1,781);
    return Math.log(x)+gamma-x*x/2/fact(2)+Math.pow(x,4)/4/fact(4)-Math.pow(x,6)/6/fact(6);
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