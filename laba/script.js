function f(t) {
//	return Math.sin(t);
	return Math.sin(3*t)/(1+t);
}

function spectr_graph(f,D,m) {
	var points_Re = [];
	var points_Im = [];
	var delta_omega = 0.001;
	for(var omega = -m; omega<=m; omega+=delta_omega) {
		points_Re.push(new Point(omega,F(f,omega,D,'Re')));
		points_Im.push(new Point(omega,F(f,omega,D,'Im')));
	}
	return {
		Re: points_Re,
		Im: points_Im
	};
}

function F(f,omega,D,part) {
	var s = 0;
	var h = (D.b-D.a)/D.n;
	for(var t = D.a; t <= D.b; t += h) {
		if(part=='Re') {
			s += f(t)*Math.cos(2*Math.PI*omega*t)+
				f(t+h)*Math.cos(2*Math.PI*omega*(t+h));
		}
		else {
			s += f(t)*Math.sin(2*Math.PI*omega*t)+
				f(t+h)*Math.sin(2*Math.PI*omega*(t+h));
		}
	}
	return s*h/2;
}

var D = {
	a: 0,
	b: Math.PI,
	n: 1000
};

var m = 0.22;

//var points = spectr_graph(f,D,m);
var points = make_points(-0.22,0.22);

var svg = new SVG(1000, 1000)
var oxy = new OXY(svg, 1.5, 30, 2, 'w', 'F', 4);
svg.Create();
oxy.Draw(svg);

oxy.Plot ( svg, points.Re, 100, 2, 'blue' );
oxy.Plot ( svg, points.Im, 100, 2, 'red' );
