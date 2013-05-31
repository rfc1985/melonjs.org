/*
 * jToolBox JavaScript Library
 * or... my humble attempt to create a game/app framework :)
 *
 * Minified version
 *
 * Copyright (C) 2010, Olivier BIOT
 * http://olivierbiot.wordpress.com/
 * 
 * Author: Olivier Biot
 * Version: 0.4.1
 * Date: January 2010
 */
(function(d,f){var o=d.document;d.sys={mod:"jToolBox",ver:"0.4.1",ua:navigator.userAgent.toLowerCase(),sound:false,storage:false,gyro:(d.DeviceMotionEvent!==f),fps:60,scale:1,};var v={mp3:false,ogg:false,ma4:false,wav:false,};var r=false,p=false,l=[];function i(){if(!p){if(!o.body){setTimeout(i,10)}else{p=true;for(var w=0;w<l.length;w++){l[w].call(d,[])}l=[]}}}function u(){if(r){return}r=true;if(o.addEventListener){o.addEventListener("DOMContentLoaded",i,false)}d.addEventListener("load",i,false)}onReady=function(w){u();if(p){w.call(d,[])}else{l.push(function(){return w.call(d,[])})}return this};u();function t(){var w=o.createElement("audio");if(w.canPlayType){d.sys.sound=true;v.mp3=("no"!=w.canPlayType("audio/mpeg"))&&(""!=w.canPlayType("audio/mpeg"));v.ogg=("no"!=w.canPlayType('audio/ogg; codecs="vorbis"'))&&(""!=w.canPlayType('audio/ogg; codecs="vorbis"'));v.wav=("no"!=w.canPlayType('audio/wav; codecs="1"'))&&(""!=w.canPlayType('audio/wav; codecs="1"'))}if((d.sys.ua.search("iphone")>-1)||(d.sys.ua.search("ipod")>-1)||(d.sys.ua.search("ipad")>-1)||(d.sys.ua.search("android")>-1)){d.sys.sound=false}c.init()}d.onReady(function(){t()});var c={_htmlFPSCounter:null,framecount:0,_fps:60,_lastTime:null,_gameTick:0,debug:false,init:function(){_htmlFPSCounter=o.getElementById("framecounter");debug=(_htmlFPSCounter!==null);_lastTime=new Date();_fps=d.sys.fps},update:function(){var w=new Date();_gameTick=(((w.getTime()-_lastTime.getTime())>>0)+1);if(_gameTick>=1000){_fps=c.framecount;c.framecount=0;_lastTime=w}c.framecount++;if(debug){_htmlFPSCounter.innerHTML="("+_fps+"/"+d.sys.fps+" fps)"}},getTickCount:function(){return _gameTick}};var n={_canvas:null,_context2D:null,_backBufferCanvas:null,_backBufferContext2D:null,_wrapper:null,_double_buffering:false,_game_width_zoom:0,_game_height_zoom:0,_font:{image:null,size:-1,firstChar:-1},init:function(C,D,z,E,A){var y=this._canvas,x=this._wrapper,B=this._game_width_zoom,w=this._game_height_zoom;_double_buffering=E;d.sys.scale=_double_buffering===true?A:1;B=D*d.sys.scale;w=z*d.sys.scale;x=o.getElementById(C);y=o.createElement("canvas");y.setAttribute("width",(B)+"px");y.setAttribute("height",(w)+"px");y.setAttribute("border","0px solid black");x.appendChild(y);if(y.getContext){this._context2D=y.getContext("2d");if(_double_buffering){this._backBufferContext2D=n.createCanvasSurface(D,z);this._backBufferCanvas=this._backBufferContext2D.canvas}else{this._backBufferContext2D=this._context2D}}else{return false}return true},getWrapper:function(){return _wrapper},createCanvasSurface:function(x,w){var y=o.createElement("canvas");y.width=x;y.height=w;return y.getContext("2d")},getScreenCanvas:function(){return _canvas},getScreenFrameBuffer:function(){return this._backBufferContext2D},updateDisplaySize:function(w){if(_double_buffering){if(w){d.sys.scale=w}else{d.sys.scale=o.getElementById("screen size").value}this._game_width_zoom=this._backBufferCanvas.width*d.sys.scale;this._game_height_zoom=this._backBufferCanvas.height*d.sys.scale;this._canvas.width=this._game_width_zoom;this._canvas.height=this._game_height_zoom}},clearSurface:function(x,w){x.fillStyle=w;x.fillRect(0,0,x.canvas.width,x.canvas.height)},scale:function(w,x){w.translate(-(((w.canvas.width*x)-w.canvas.width)>>1),-(((w.canvas.height*x)-w.canvas.height)>>1));w.scale(x,x)},setAlpha:function(x,w){x.globalCompositeOperation=w?"source-over":"copy"},blitSurface:function(){if(_double_buffering){this.blitSurface=function(){c.update();this._context2D.drawImage(this._backBufferCanvas,0,0,this._backBufferCanvas.width,this._backBufferCanvas.height,0,0,this._game_width_zoom,this._game_height_zoom)}}else{this.blitSurface=function(){c.update()}}this.blitSurface()},setFont:function(w,x,y){this._font.image=w;this._font.size=x;this._font.firstChar=y},setSystemFont:function(y,x,z,w){y.fillStyle=w;y.font=x;y.textBaseline=z},drawFont:function(B,w,E,D){var z=w;var C;for(var A=D.length;A--;){C=(D.charAt(A)*this._font.size)+this._font.firstChar;B.drawImage(this._font.image,C,0,this._font.size,this._font.image.height,z,E,this._font.size,this._font.image.height);z-=this._font.size}}};if(!Function.bind){Function.prototype.bind=function(x){var w=this;return function(){return w.apply(x,arguments)}}}var e={random:function(x,w){return(~~(Math.random()*(w-x+1))+x)},round:function(w,y){var x=Math.pow(10,y);return(Math.round(w*x)/x)}};var j={_audio_channels:[],_supportedFormat:["mp3","ogg","wav"],_requestedFormat:null,_ActiveAudioExt:-1,_load_cb:null,sound_enable:true,init:function(w){if(!d.sys.sound){this.sound_enable=false;return}if(w){this._requestedFormat=new String(w)}else{this._requestedFormat=new String("mp3")}this._ActiveAudioExt=this.getSupportedAudioFormat()},getSupportedAudioFormat:function(){var w=0;if((this._requestedFormat.search(/mp3/i)!=-1)&&v.mp3){return this._supportedFormat[w]}if((this._requestedFormat.search(/ogg/i)!=-1)&&v.ogg){return this._supportedFormat[++w]}if((this._requestedFormat.search(/wav/i)!=-1)&&v.wav){return this._supportedFormat[++w]}this.sound_enable=false;return -1},setLoadCallback:function(w){this._load_cb=w},soundLoadError:function(w){this._audio_channels[w][0].load()},soundLoaded:function(w,z){if(z>1){var x=this._audio_channels[w][0];for(var y=1;y<z;y++){this._audio_channels[w][y]=x.cloneNode(true)}}if(this._load_cb){this._load_cb()}},load:function(x){if(this._ActiveAudioExt==-1){return 0}var w=o.createElement("audio");w.autobuffer=true;w.preload="auto";w.addEventListener("canplaythrough",function(y){w.removeEventListener("canplaythrough",arguments.callee,false);j.soundLoaded(x.name,x.channel)},false);w.addEventListener("error",function(y){j.soundLoadError(x.name)});w.src=x.src+x.name+"."+this._ActiveAudioExt;w.load();this._audio_channels[x.name]=[w];return 1},stop:function(x){if(this.sound_enable){var y=this._audio_channels[x];for(var w=y.length;w--;){y[w].pause();y[w].currentTime=0.01}}},pause:function(x){if(this.sound_enable){var y=this._audio_channels[x];for(var w=y.length;w--;){y[w].pause()}}},getSound:function(x){var w=this._audio_channels[x];for(var y=0,z;z=w[y++];){if(z.paused||z.ended){return z}}w[0].pause();w[0].currentTime=0.01;return w[0]},play:function(x,w,z){if(this.sound_enable){var y=this.getSound(x);y.loop=w;y.play();y.addEventListener("ended",function(A){y.removeEventListener("ended",arguments.callee,false);y.pause();y.currentTime=0.01;if(z&&!w){z()}},false)}else{if(z&&!w){setTimeout(z,2000)}}}};var h={_imageList:[],_ressourceCount:0,_loadCount:0,_loaded_cb:f,_timerId:0,preload:function(z,x,w,y){if(z){this.preloadImages(z)}if(x){this.preloadSounds(x)}if(w){this.preloadScripts(w)}h._loaded_cb=y;this.checkLoadStatus()},checkLoadStatus:function(){if(h._loadCount==h._ressourceCount){h._timerId=setTimeout(this._loaded_cb.bind(this),500)}else{h._timerId=setTimeout(this.checkLoadStatus.bind(this),100)}},ressourceLoaded:function(){h._loadCount++},preloadImages:function(w){for(var x=0;x<w.length;x++){h._imageList.push(w[x].name);h._imageList[w[x].name]=new Image();h._imageList[w[x].name].onload=this.onImageLoad.bind(this);h._imageList[w[x].name].onerror=this.onImageError.bind(this);h._imageList[w[x].name].src=w[x].src}h._ressourceCount+=w.length},onImageLoad:function(w){h.ressourceLoaded()},onImageError:function(w){console.log("Failing loading image")},preloadSounds:function(w){j.setLoadCallback(this.ressourceLoaded.bind(this));for(var x=0;x<w.length;x++){h._ressourceCount+=j.load(w[x])}},preloadScripts:function(w){for(var x=0;x<w.length;x++){var y=o.createElement("object");y.data=w[x];y.type="text/javascript";y.width=y.height=0;n._wrapper.appendChild(y)}h._ressourceCount+=w.length},getImageRessource:function(w){if(h._imageList!=null){return h._imageList[w]}else{return null}},getLoadProgress:function(){return h._loadCount/h._ressourceCount}};function g(w,B,A){this.x=w;this.y=B;this.z=0;this.currentSpriteOff=0;this.scale_x=1;this.scale_y=1;this.spriteWidth=0;this.spriteHeight=0;this.scaleFlag=false;this.autodestroy=true;try{this.image=A;this.spriteWidth=this.image.width;this.spriteHeight=this.image.height}catch(z){}}g.prototype.flipX=function(w){if(w){this.scale_x=this.scale_x>0?-this.scale_x:this.scale_x}else{this.scale_x=this.scale_x<0?-this.scale_x:this.scale_x}this.scaleFlag=((this.scale_x!=1)||(this.scale_y!=1))};g.prototype.flipY=function(w){if(w){this.scale_y=this.scale_y>0?-this.scale_y:this.scale_y}else{this.scale_y=this.scale_y<0?-this.scale_y:this.scale_y}this.scaleFlag=((this.scale_x!=1)||(this.scale_y!=1))};g.prototype.draw=function(x){var w=this.x,y=this.y;if(this.scaleFlag){x.scale(this.scale_x,this.scale_y);w=(this.x*this.scale_x)-(this.scale_x<0?this.spriteWidth:0);y=(this.y*this.scale_y)-(this.scale_y<0?this.spriteHeight:0)}x.drawImage(this.image,this.currentSpriteOff,0,this.spriteWidth,this.spriteHeight,w,y,this.spriteWidth,this.spriteHeight);if(this.scaleFlag){x.setTransform(1,0,0,1,0,0)}};g.prototype.update=function(){return false};g.prototype.onDestroyEvent=function(){};g.prototype.destroy=function(){this.onDestroyEvent();if(this.autodestroy){this.image=null;m.remove(this)}};function q(w,B,z,A){g.call(this,w,B,z);this.type=0;this.currentSprite=0;this.collisionEnable=false;this.spritecount=A;this.fpscount=0;this.animationspeed=d.sys.fps/5;this.spriteWidth=this.spriteWidth/A;this.updateColRect(0.4,0.4);this.setCurrentSprite(0)}q.prototype=new g();q.prototype.setCurrentSprite=function(w){this.currentSprite=w;this.currentSpriteOff=this.spriteWidth*w};q.prototype.updateColRect=function(x,w){this.col_width=this.spriteWidth*x;this.col_height=this.spriteHeight*w;this.col_x_off=(this.spriteWidth-this.col_width)/2;this.col_y_off=(this.spriteHeight-this.col_height)/2};q.prototype.update=function(){if(this.fpscount++>this.animationspeed){this.setCurrentSprite(++this.currentSprite<this.spritecount?this.currentSprite:0);this.fpscount=0;return true}return false};q.prototype.collide=function(w){var y=w.y+w.col_y_off;var x=this.y+this.col_y_off;if(((y+w.col_height)<x)||(y>(x+this.col_height))){return m.NO_OBJECT}y=w.x+w.col_x_off;x=this.x+this.col_x_off;if(((y+w.col_width)<x)||(y>(x+this.col_width))){return m.NO_OBJECT}return this.type};var m={NO_OBJECT:0,ENEMY_OBJECT:1,COLLECTABLE_OBJECT:2,ACTION_OBJECT:3,gameObjects:[],parentCanvas:null,canvas_invalidated:true,registeredEventObj:[],init:function(x,w){this.spriteCanvasSurface=n.createCanvasSurface(x,w)},reset:function(){this.removeAll()},add:function(w,x){if(x){w.z=x}this.gameObjects.push(w);if((w).keyEvent){this.registeredEventObj.push(w)}},keyEvent:function(y,x){for(var w=this.registeredEventObj.length;w--;){this.registeredEventObj[w].keyEvent(y,x)}},update:function(){for(var w=this.gameObjects.length;w--;){if(this.gameObjects[w].update()){this.canvas_invalidated=true}}},remove:function(w){this.gameObjects.splice(this.gameObjects.indexOf(w),1);if(w.keyEvent){this.registeredEventObj.splice(this.registeredEventObj.indexOf(w),1)}},removeAll:function(){this.gameObjects=[];this.registeredEventObj=[]},sort:function(){this.gameObjects.sort(function(x,w){return(w.z-x.z)});this.canvas_invalidated=true},collide:function(z,C){var A=this.gameObjects;var w;for(var B=A.length;B--;){if(A[B].collisionEnable){w=A[B].collide(z,C);switch(w){case m.NO_OBJECT:break;case m.COLLECTABLE_OBJECT:A[B].destroy();return w;break;case m.ENEMY_OBJECT:return w;break}}}return w},draw:function(A,w,B){if(this.canvas_invalidated){for(var z=this.gameObjects.length;z--;){this.gameObjects[z].draw(this.spriteCanvasSurface)}this.canvas_invalidated=false;A.drawImage(this.spriteCanvasSurface.canvas,w,B)}}};function b(w,A,z){g.call(this,w,A,z);this.isClickable=true}b.prototype=new g();b.prototype.clicked=function(){};b.prototype.onMouseClick=function(w,z){if((w>this.xpos)&&(w<this.xpos+this.width)&&(z>this.ypos)&&(z<this.ypos+this.height)){if(this.isClickable){this.clicked()}return true}return false};function k(){this.tilewidth=0;this.tileheight=0;this.width=0;this.height=0;this.level=0;this.data=null;this.tileImage=null;this.mapCanvas=null;this.tileInvalidated=null;this.x_lookupTable=[];this.y_lookupTable=[];this.dirtyRect=false;this.init=function(E,D,z,C,A,B){this.tileImage=E;this.tilewidth=C;this.tileheight=A;this.width=D;this.height=z;for(var w=0;w<this.width*this.tilewidth;w++){this.x_lookupTable[w]=Math.floor(w/this.tilewidth)}for(var F=0;F<this.height*this.tileheight;F++){this.y_lookupTable[F]=Math.floor(F/this.tileheight)}if(B){this.dirtyRect=B}else{this.mapCanvas=n.createCanvasSurface(this.width*this.tilewidth,this.height*this.tileheight)}this.reset()},this.reset=function(){},this.update=function(){return false},this.setLevelData=function(C,z){var A;if(this.dirtyRect){if(this.tileInvalidated==null){this.tileInvalidated=[];this.data=[];for(var w=0;w<this.width;w++){this.tileInvalidated[w]=[];this.data[w]=[]}}for(var w=0;w<this.width;w++){for(var B=0;B<this.height;B++){this.tileInvalidated[w][B]=true}}}this.level=C;A=C*(this.height*this.width);for(var w=this.width;w--;){for(var B=this.height;B--;){if(this.tileInvalidated[w][B]==true){this.data[w][B]=z[A+(B*this.width)+w]}}}},this.getTile=function(w,z){return(this.data[this.x_lookupTable[w]][this.y_lookupTable[z]])},this.setTile=function(w,A,z){this.data[this.x_lookupTable[w]][this.y_lookupTable[A]]=z},this.invalidateTile=function(w,z){this.tileInvalidated[this.x_lookupTable[w]][this.y_lookupTable[z]]=true},this.drawTile=function(z,w,C,A){var B=g_level_desc.tileoffset[A]*this.tilewidth;z.drawImage(this.tileImage,B,0,this.tilewidth,this.tileheight,w*this.tilewidth,C*this.tileheight,this.tilewidth,this.tileheight)},this.draw=function(z){if(this.dirtyRect){for(var w=this.width;w--;){for(var A=this.height;A--;){if(this.tileInvalidated[w][A]==true){this.drawTile(z,w,A,this.data[w][A]);this.tileInvalidated[w][A]=false}}}}else{}}}function s(w){this.nextState=w;this.actionKey=13;this._frameBuffer=n.getScreenFrameBuffer();this.reset=function(){this.onResetEvent();m.reset();m.add(this)},this.destroy=function(){this.onDestroyEvent()};this.update=function(){return true},this.draw=function(x){},this.onUpdateFrame=function(){this.update();this.draw(this._frameBuffer);n.blitSurface()}}s.prototype.onResetEvent=function(){};s.prototype.onDestroyEvent=function(){};s.prototype.keyEvent=function(x,w){if((x==this.actionKey)&&w){a.setState(this.nextState)}};var a={STATE_LOADING:0,STATE_MENU:1,STATE_READY:2,STATE_PLAY:3,STATE_PAUSE:4,STATE_UNPAUSE:5,STATE_GAMEOVER:6,STATE_GAME_END:7,STATE_SCORE:8,_state:-1,_intervalId:-1,_kbEvent_cb:null,_mouseEvent_cb:null,_gyroEvent_cb:null,_screenObject:[null,null,null,null,null,null,null,null,null,],_loadingLogo:null,init:function(){this.setScreenObject(this.STATE_LOADING,this)},reset:function(){},destroy:function(){},setScreenObject:function(w,x){this._screenObject[w]=x},setSplashScreen:function(w){this._loadingLogo=new Image();this._loadingLogo.src=w},enableKeyboardEvent:function(w,x){o.onkeydown=function(y){a.onKeyEvent(y,true)};o.onkeyup=function(y){a.onKeyEvent(y,false)};this._kbEvent_cb=x},enableMouseEvent:function(w,x){n.getScreenCanvas().addEventListener("click",a.onMouseEvent,false);this._mouseEvent_cb=x},enableGyroscopicEvent:function(w,x){if(d.sys.gyro){d.ondevicemotion=this.onGyroEvent.bind(this);this._gyroEvent_cb=x}},setState:function(w){switch(w){case this.STATE_PAUSE:this._state=w;clearInterval(this._intervalId);break;case this.STATE_UNPAUSE:this._state=this.STATE_PLAY;this._startMainLoop(this.STATE_PLAY);break;case this.STATE_LOADING:case this.STATE_MENU:case this.STATE_PLAY:case this.STATE_GAMEOVER:case this.STATE_GAME_END:case this.STATE_SCORE:if(this._intervalId!=-1){clearInterval(this._intervalId);this._screenObject[this._state].destroy()}this._screenObject[w].reset();this._startMainLoop(w);this._state=w;break;default:break}},_startMainLoop:function(w){this._intervalId=setInterval(this._screenObject[w].onUpdateFrame.bind(this._screenObject[w]),1000/d.sys.fps)},onMouseEvent:function(z){var w=z.clientX-n.getScreenCanvas().offsetLeft;var A=z.clientY-n.getScreenCanvas().offsetTop;this._mouseEvent_cb(w,A)},onKeyEvent:function(z,w){var x=false;switch(z.keyCode){case 38:case 40:case 37:case 39:case 88:case 32:case 13:x=true;this._kbEvent_cb(z.keyCode,w);break;case 80:x=true;var y=this._state;if(!w&&(y==this.STATE_PAUSE)){this.setState(this.STATE_UNPAUSE)}else{if(!w&&(y==this.STATE_PLAY)){this.setState(this.STATE_PAUSE)}}break;default:break}if(x){z.preventDefault();if(z.stopPropagation){z.stopPropagation()}z.cancelBubble=true}},onGyroEvent:function(w){},onUpdateFrame:function(){var w=n.getScreenFrameBuffer();var A=w.canvas.height/2;n.clearSurface(w,"black");if(this._loadingLogo){w.drawImage(this._loadingLogo,(w.canvas.width-this._loadingLogo.width)/2,(w.canvas.height-this._loadingLogo.height)/2);A+=this._loadingLogo.height/2+20}var x=Math.floor(h.getLoadProgress()*w.canvas.width);w.strokeStyle="gray";w.strokeRect(0,A,w.canvas.width,20);w.fillStyle="gray";w.fillRect(0,A,x,20);n.setSystemFont(w,"bold 14px Courier","top","white");var z=w.measureText("Loading...");w.fillText("Loading...",((w.canvas.width-z.width)/2),(A)+1);n.blitSurface()},};d.ScreenObject=s;d.SpriteObject=g;d.AnimatedSpriteObject=q;d.VideoMngr=n;d.RessourceMngr=h;d.SoundMngr=j;d.AppMngr=a;d.GameObjectMngr=m;d.BackgroundMap=k})(window);