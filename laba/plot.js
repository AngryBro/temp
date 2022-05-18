/*
    
    Синтаксис:
        svg = new SVG(размер по х, размер по у)
        oxy = new OXY(svg, длина оси х, размер шрифта осей, 
        толщина, название оси х, название оси у, длина штрихов точек, )
        oxy.Point( svg, точка, точность (натуральная степень 10), диаметр, цвет )
        oxy.Plot ( svg, массив точек, точность, толщина, цвет )
        
        Пример:
            var svg = new SVG(500,500);
            var oxy = new OXY(svg, 20, 20, 2, 'x', 'y', 2);
            var points1 = [];
            var points2 = [];
            svg.Create();
            oxy.Draw(svg);
            for(var i = -9; i<=-1/3; i+=0.01) {
                points1.push(new Point(i,3/i));
            }
            for(var i = 1/3; i<=9; i+=0.01) {
                points2.push(new Point(i,3/i));
            }
            oxy.Plot(svg, points1, 10,1, 'green');
            oxy.Plot(svg, points2, 10,1, 'green');
        
*/
function Help() {
	console.log(
		`var svg = new SVG(size x, size y)
var oxy = new OXY(svg, Xaxis length, fontsize, 
thickness, Xaxis name, Yaxis name, sticks length, )
svg.Create()
oxy.Draw(svg)
oxy.Point( svg, point, accuracy (natural 10 power), radius, color )
oxy.Plot ( svg, point array, accuracy, thickness, color )`
	);
}
class SVG {
    constructor(width,height) {
        this.width = width;
        this.height = height;
        this.id = "svg";
        this.link = "http://www.w3.org/2000/svg";
    }
    Create() {
        var svg = document.createElementNS(this.link,'svg');
        svg.setAttributeNS(null,"width",String(this.width));
        svg.setAttributeNS(null,"height",String(this.height));
        svg.setAttributeNS(null,"id",this.id);
        document.body.append(svg);
    }
}

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        
    }
    GlobalPos(svg,scale) {
        return new Point( svg.width/scale*this.x+svg.width/2 , svg.height/2 - this.y*svg.height/scale );
    }
    
}

class Axis {
    constructor(name, p1,p2,width, namesize) {
        this.begin = p1;
        this.end = p2;
        this.width = width;
        
        this.name = name;
        this.namesize = namesize;
        if(p1.x == p2.x) {
            this.type = 'y';
        }
        else {
            this.type = 'x';
        }
        var namex;
        var namey;
        if(this.type == "x") {
            namex = this.end.x - this.namesize/2;
            namey = this.end.y + this.namesize;
        }
        else {
            namex = this.end.x + this.namesize/2;
            namey = this.end.y + this.namesize/2;
        }
        this.namepos = new Point(namex,namey);
    }
    Draw(svg) {
        var axis = document.createElementNS(svg.link, 'line');
        axis.setAttributeNS(null,"x1",String(this.begin.x));
        axis.setAttributeNS(null,"x2",String(this.end.x));
        axis.setAttributeNS(null,"y1",String(this.begin.y));
        axis.setAttributeNS(null,"y2",String(this.end.y));
        axis.setAttributeNS(null,"stroke","black");
        axis.setAttributeNS(null,"stroke-width",String(this.width));
        document.getElementById(svg.id).append(axis);
        var name = document.createElementNS(svg.link,'text');
        name.setAttributeNS(null,'font-size',String(this.namesize));
        name.setAttributeNS(null,'x',this.namepos.x);
        name.setAttributeNS(null,'y', this.namepos.y);
        name.innerHTML = this.name;
        document.getElementById(svg.id).append(name);
    }
}

class Line {
    constructor(number, center,type,width, length) {
        this.width = width;
        this.type = type;
        this.center = center;
        this.length = length;
        this.number = number;
    }
    Draw(svg) {
        var line = document.createElementNS(svg.link,'line');
        var point1;
        var point2;
        if(this.type == 'x') {
            point1 = new Point(this.center.x, this.center.y+this.length);
            point2 = new Point(this.center.x, this.center.y - this.length);
        }
        else {
            point1 = new Point(this.center.x - this.length, this.center.y);
            point2 = new Point(this.center.x+this.length, this.center.y);
        }
        line.setAttributeNS(null,'x1',point1.x);
        line.setAttributeNS(null,'x2',point2.x);
        line.setAttributeNS(null,'y1',point1.y);
        line.setAttributeNS(null,'y2',point2.y);
        line.setAttributeNS(null,'stroke-width',this.width);
        line.setAttributeNS(null,'stroke','black');
        document.getElementById(svg.id).append(line);
    }
    DrawNumber(svg,aprox) {
        
        var x;
        var y;
        if(this.type == 'x') {
            x = this.center.x - 2*this.length;
            y = this.center.y + 4*this.length;
        }
        else {
            x = this.center.x + 1*this.length;
            y = this.center.y;
        }
        var text = document.createElementNS(svg.link,'text');
        text.setAttributeNS(null,'x',x); 
        text.setAttributeNS(null,'y',y);
        text.setAttributeNS(null,'font-size',4*this.length)
        text.innerHTML = String(Math.round(this.number*aprox)/aprox);
        if((this.type != 'x')&&(this.number==0)) {
           text.innerHTML = '';
        }
        document.getElementById(svg.id).append(text);
    }
}

class OXY {
    constructor(svg,scale,fontsize,width,x,y,linelength) {
        this.scale = scale;
        this.linelength = linelength;
        this.margin = 10;
        this.fontsize = fontsize;
        this.x = x;
        this.y = y;
        this.width = width;
        this.Xaxis = new Axis(x,new Point(this.margin,svg.height/2),
        new Point(svg.width-this.margin,svg.height/2),this.width,this.fontsize);
        this.Yaxis = new Axis(y,new Point(svg.width/2,svg.height-this.margin),
        new Point(svg.width/2,this.margin),this.width,this.fontsize);
    }
    
    Draw(svg) {
        this.Xaxis.Draw(svg);
        this.Yaxis.Draw(svg);
        var frame = document.createElementNS(svg.link,'rect');
        frame.setAttributeNS(null,"x","0");
        frame.setAttributeNS(null,"y","0");
        frame.setAttributeNS(null,"width",String(svg.width));
        frame.setAttributeNS(null,"height",String(svg.height));
        frame.setAttributeNS(null,"style","fill:none;stroke-width:2;stroke:black;");
        document.getElementById(svg.id).append(frame);
    }
    Point(svg,point,aprox,r,color) {
        var linex = new Line(point.x, new Point(point.x,0).GlobalPos(svg, this.scale),'x',this.width/2,this.linelength);
        var liney = new Line(point.y, new Point(0,point.y).GlobalPos(svg, this.scale),'y',this.width/2,this.linelength);
        var circle = document.createElementNS(svg.link,'circle');
        circle.setAttributeNS(null,'cx',point.GlobalPos(svg,oxy.scale).x);
        circle.setAttributeNS(null,'cy',point.GlobalPos(svg,oxy.scale).y);
        circle.setAttributeNS(null,'r',r);
        circle.setAttributeNS(null,'fill',color);
        document.getElementById(svg.id).append(circle);
        linex.Draw(svg);
        liney.Draw(svg);
        linex.DrawNumber(svg,aprox);
        liney.DrawNumber(svg,aprox);
    }
    Plot(svg,points,aprox,width,color) {
        
        var cmd;
        this.Point(svg, points[0],aprox, width,color);
        this.Point(svg, points[points.length-1],aprox, width, color);
        cmd = ("M " + String(points[0].GlobalPos(svg,this.scale).x)+" "+String(points[0].GlobalPos(svg,this.scale).y));
        for(var i = 1; i<points.length; i++) {
            cmd += " L" + String(points[i].GlobalPos(svg,this.scale).x)+" "+String(points[i].GlobalPos(svg,this.scale).y);
        }
        var plot = document.createElementNS(svg.link,'path');
        plot.setAttributeNS(null,'d',cmd);
        plot.setAttributeNS(null,'stroke-width',width);
        plot.setAttributeNS(null,'stroke',color);
        plot.setAttributeNS(null,'fill','transparent');
        document.getElementById(svg.id).append(plot);
    }
}
Help();