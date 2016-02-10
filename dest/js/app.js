function BilibiliParser(a){function e(a){return a.replace(/\t/,"\\t")}for(var t=a.getElementsByTagName("d"),r=[],o=0;o<t.length;o++)if(null!=t[o].getAttribute("p")){var n=t[o].getAttribute("p").split(",");if(!t[o].childNodes[0])continue;var l=t[o].childNodes[0].nodeValue,d={};if(d.stime=Math.round(1e3*parseFloat(n[0])),d.mode=parseInt(n[1]),d.size=parseInt(n[2]),d.color=parseInt(n[3]),d.date=parseInt(n[4]),d.pool=parseInt(n[5]),d.position="absolute",null!=n[7]&&(d.dbid=parseInt(n[7])),d.hash=n[6],d.border=!1,d.mode<7)d.text=l.replace(/(\/n|\\n|\n|\r\n)/g,"\n");else if(7==d.mode)try{if(adv=JSON.parse(e(l)),d.shadow=!0,d.x=parseFloat(adv[0]),d.y=parseFloat(adv[1]),(Math.floor(d.x)<d.x||Math.floor(d.y)<d.y)&&(d.position="relative"),d.text=adv[4].replace(/(\/n|\\n|\n|\r\n)/g,"\n"),d.rZ=0,d.rY=0,adv.length>=7&&(d.rZ=parseInt(adv[5],10),d.rY=parseInt(adv[6],10)),d.motion=[],d.movable=!1,adv.length>=11){d.movable=!0;var s=500,p={x:{from:d.x,to:parseFloat(adv[7]),dur:s,delay:0},y:{from:d.y,to:parseFloat(adv[8]),dur:s,delay:0}};if(""!==adv[9]&&(s=parseInt(adv[9],10),p.x.dur=s,p.y.dur=s),""!==adv[10]&&(p.x.delay=parseInt(adv[10],10),p.y.delay=parseInt(adv[10],10)),adv.length>11&&(d.shadow=adv[11],"true"===d.shadow&&(d.shadow=!0),"false"===d.shadow&&(d.shadow=!1),null!=adv[12]&&(d.font=adv[12]),adv.length>14)){"relative"===d.position&&(console.log("Cannot mix relative and absolute positioning"),d.position="absolute");for(var i=adv[14],v={x:p.x.from,y:p.y.from},u=[],h=new RegExp("([a-zA-Z])\\s*(\\d+)[, ](\\d+)","g"),c=i.split(/[a-zA-Z]/).length-1,f=h.exec(i);null!==f;){switch(f[1]){case"M":v.x=parseInt(f[2],10),v.y=parseInt(f[3],10);break;case"L":u.push({x:{from:v.x,to:parseInt(f[2],10),dur:s/c,delay:0},y:{from:v.y,to:parseInt(f[3],10),dur:s/c,delay:0}}),v.x=parseInt(f[2],10),v.y=parseInt(f[3],10)}f=h.exec(i)}p=null,d.motion=u}null!==p&&d.motion.push(p)}d.dur=2500,adv[3]<12&&(d.dur=1e3*adv[3]);var g=adv[2].split("-");if(null!=g&&g.length>1){var x=parseFloat(g[0]),y=parseFloat(g[1]);d.opacity=x,x!==y&&(d.alpha={from:x,to:y})}}catch(m){console.log("[Err] Error occurred in JSON parsing"),console.log("[Dbg] "+l)}else 8==d.mode&&(d.code=l);null!=d.text&&(d.text=d.text.replace(/\u25a0/g,"█")),r.push(d)}return r}
function CommentManager(t){this.stage=t,this.options={fresh:10},this.commentLine=[],this.runLine=[],this.nowLine=[],this.position=0,this.lastTime=0,this.width=t.offsetWidth,this.height=t.offsetHeight,this.timer=null,this.setBounds=function(){this.width=this.stage.offsetWidth,this.height=this.stage.offsetHeight},this.init=function(){this.setBounds()},this.start=function(){if(!this.timer){var t=this;this.timer=window.setInterval(function(){var i=(new Date).getTime()-t.lastTime;t.lastTime=(new Date).getTime(),t.onTimerEvent(i,t)},this.options.fresh)}},this.stop=function(){window.clearInterval(this.timer),this.timer=0},this.send=function(t){var i=new CommentObject(this,t);switch(i.mode){case 1:i.align=0;break;case 2:i.align=2;break;case 4:i.align=2;break;case 5:i.align=0;break;case 6:i.align=1}cm.init(),cm.layout(),this.stage.appendChild(i.dom),this.nowLine.push(cm)},this.seek=function(t){for(var i=this.position;i<this.commentLine.length;i++){var e=this.commentLine[i];if(e.stime>=t)return i}return this.commentLine.length},this.time=function(t){if(t-=1,this.position>=this.commentLine.length)return void console.log("播放完成");for(var i=this.seek(t);this.position<i;this.position++)console.log(this.commentLine[this.position]);this.position=i},this.onTimerEvent=function(t,i){for(var e=0;e<i.runline.length;e++){var n=i.runline[e];n.time(t)}},this.load=function(t){this.commentLine=t,this.commentLine.sort(function(t,i){return t.stime>=i.stime?1:-1})}}
function CommentObject(t,e){var i={align:0,mode:1,stime:0,text:"",lastTime:4e3,movable:!1,_x:0,_y:0,_size:25,_color:16777215,_manager:t};return e.hasOwnProperty("align")&&(i.align=e.align),e.hasOwnProperty("stime")&&(i.stime=e.stime),e.hasOwnProperty("mode")&&(i.mode=e.mode),e.hasOwnProperty("color")&&(i._color=e.color),e.hasOwnProperty("size")&&(i._size=e.size),e.hasOwnProperty("x")&&(i._x=e.x),e.hasOwnProperty("y")&&(i._y=e.y),i}Object.defineProperty(CommentObject.prototype,"x",{get:function(){return this.align%2===0?this._x=this.dom.offsetLeft:this._x=this.parent.width-this.dom.offsetLeft-this.width,this._x},set:function(t){this._x=t,this.align%2===0?this.dom.style.left=this._x+"px":this.dom.style.right=this._x+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(CommentObject.prototype,"y",{get:function(){return this.align<2?this._y=this.dom.offsetTop:this._y=this.parent.height-this.dom.offsetTop-this.height,this._y},set:function(t){this._y=t,this.align<2?this.dom.style.top=this._y+"px":this.dom.style.bottom=this._y+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(CommentObject.prototype,"color",{get:function(){return this._color},set:function(t){this._color=t;var e=t.toString(16);e=e.length>=6?e:new Array(6-e.length+1).join("0")+e,this.dom.style.color="#"+e,0===this._color&&(this.dom.className=this.parent.options.global.className+" rshadow")},enumerable:!0,configurable:!0}),Object.defineProperty(CommentObject.prototype,"width",{get:function(){return(null===this._width||void 0===this._width)&&(this._width=this.dom.offsetWidth),this._width},set:function(t){this._width=t,this.dom.style.width=this._width+"px"},enumerable:!0,configurable:!0}),Object.defineProperty(CommentObject.prototype,"height",{get:function(){return(null===this._height||void 0===this._height)&&(this._height=this.dom.offsetHeight),this._height},set:function(t){this._height=t,this.dom.style.height=this._height+"px"},enumerable:!0,configurable:!0}),CommentObject.prototype.init=function(){var t=document.createElement("div");t.className=this._manager.options.fresh,t.appendChild(document.createTextNode(this.text)),t.textContent=this.text,t.innerText=this.text,this.dom=t,this.x=this._x,this.y=this._y,this.color=this._color},CommentObject.prototype.layout=function(){},CommentObject.prototype.time=function(t){this.lastTime-=t,this.lastTime<0&&(this.lastTime=0),this.movable&&this.update(),this.lastTime<=0&&this.finish()},CommentObject.prototype.update=function(){},CommentObject.prototype.finish=function(){};