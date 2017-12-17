"use strict";
if (typeof localStorage.rr !== "string") {
	let s = document.createElement("script");
	s.innerHTML = "window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';";
	localStorage.rr = "";
	document.head.appendChild(s);
}
var game = {};
var main = function() {

var googleAuth2;

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

function countDownTimer(end, id)
{
	var end = end;
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;
    function showRemaining() {
		if (game.tournament.participating) {
            clearInterval(timer);
            document.getElementById("countdown").style.display="none";
			return;
		}
        var now = Date.now();
        var distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(id).innerHTML = 'EXPIRED!';
            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        document.getElementById(id).innerHTML = days + ' days ';
        document.getElementById(id).innerHTML += hours + ' hrs ';
        document.getElementById(id).innerHTML += minutes + ' mins ';
        document.getElementById(id).innerHTML += seconds + ' secs';
    }
    timer = setInterval(showRemaining, 1000);
}

function getScript (src, callback) {
	var headElm = document.head || document.getElementsByTagName('head')[0];
	var script = document.createElement("script");
	var once = true;
	script.async = "async";
	script.type = "text/javascript";
	script.charset = "UTF-8";
	script.src = src;
	script.onload = script.onreadystatechange = function () {
		if (once && (!script.readyState || /loaded|complete/.test(script.readyState))) {
			once = false;
			callback();
			script.onload = script.onreadystatechange = null;
		}
	};
	headElm.appendChild(script);
}


function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function millisToPlayTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours/24);
    if (days) {
        return days + " days";
    } else if (hours) {
        return hours + " hours";
    } else {
        return minutes + " minutes";
    }
}

function ordinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
    return "";
}


function copyToClipboardMsg(elem, msgElem) {
    var succeed = copyToClipboard(elem);
  var msg;
  if (!succeed) {
      msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
  } else {
      msg = "Text copied to the clipboard."
  }
  if (typeof msgElem === "string") {
      msgElem = document.getElementById(msgElem);
  }
  msgElem.innerHTML = msg;
  msgElem.style.visibility = "visible";
  setTimeout(function() {
      msgElem.style.visibility = "hidden";
  }, 2000);
}

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  
  // copy the selection
  var succeed;
  try {
        succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }
  
  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  return succeed;
}


(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = Date.now(), timeToCall = Math.max(0, frame_time - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) { clearTimeout(id); };
	}
	if (!window.requestIdleCallback) {
		window.requestIdleCallback = function (callback) { callback(); };
	}
	if (!window.cancelIdleCallback) {
		window.cancelIdleCallback = function () {};
	}
}());

// (4.22208334636).fixed(n) will return fixed point value to n places, default n = 3
Number.prototype.fixed = function (n) { n = n || 3; return parseFloat(this.toFixed(n)); };

var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomFloat = function(min, max) {
	return Math.random() * (max - min + 1) + min;
}


var lerp = function (p, n, t) {
	var _t = Number(t); _t = Math.max(0, Math.min(1, _t));
	return p + _t * (n - p);
};

var Eps = 1E-4;


var debugPoints = [];
var debugLines = [];

class Coord {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static read(dataReader) {
		return new Coord(dataReader.readInt16(), dataReader.readInt16());
	}

	write(dataWriter) {
		dataWriter.writeInt16(this.x);
		dataWriter.writeInt16(this.y);
	}

	angle(){
		return Math.atan2(this.y, this.x);
	}

	toP2vec(){
		return [this.x, this.y];
	}

	static fromP2Vec(p2vec){
		return new Coord(p2vec[0], p2vec[1]);
	}

	copy() {
		return new Coord(this.x, this.y);
	}

	static convert(obj) {
		return new Coord(obj.x, obj.y);
	}

	add(other) {
		return new Coord(this.x + other.x, this.y + other.y);
	}

	sub(other) {
		return new Coord(this.x - other.x, this.y - other.y);
	}

	mul_scalar(r) {
		return new Coord(this.x * r, this.y * r);
	}

	lerp(other, t) {
		return new Coord(lerp(this.x, other.x, t), lerp(this.y, other.y, t))
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normal() {
		var length = this.length();
		if (length < Eps) {
			return new Coord(0, 0);
		}
		return this.mul_scalar(1.0 / length);
	}

	ortho() {
		return new Coord(this.y, -this.x);
	}

	crossProd(other) {
		return this.x * other.y - this.y * other.x;
	}

	dist(other) {
		return this.sub(other).length();
	}

	near(other) {
		return this.dist(other) < Eps;
	}

	static lineLineIntersection(a, b, c, d) { //ab = segment1, cd = segment2
		//http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect 

		var p = a;
		var r = b.sub(a);
		var q = c;
		var s = d.sub(c);

		var rxs = r.crossProd(s);
		
		if (Math.abs(rxs) < Eps) {
			return; //P�rhuzamos vagy egy egyenesre esik, ak�r �t is fedhetik egym�st! Egyel�re ilyen esetben nem h�vodhat.
		}

		var t = q.sub(p).crossProd(s) / rxs;
		var u = q.sub(p).crossProd(r) / rxs;

		var crossPoint = p.add(r.mul_scalar(t));

		return { crossPoint: crossPoint, t: t, u: u };		
	}

	static vectorCircleIntersection(beg, end, c, r) {
		var a = beg;
		var b = end;

		var ab = b.sub(a);
		var cd = ab.ortho().normal().mul_scalar(r);
		var d1 = c.add(cd);
		var d2 = c.sub(cd);
		var inter = Coord.lineLineIntersection(a, b, d1, d2);
		if (!inter) {
			return;
		}
		var e = inter.crossPoint;
		if (e.dist(c) > r) {
			return;
		}

		//debugPoints.push(e);
		//debugLines.push({ beg: c, dir: e.sub(c).normal() });

		var aeDist = e.dist(a);
		var ceDist = e.dist(c);
		var efDist = Math.sqrt(r * r - ceDist * ceDist);
		var f = e.sub(ab.normal().mul_scalar(efDist));
		var g = e.add(ab.normal().mul_scalar(efDist));

		return { beg: f, end: g };
	}

	insideRect (leftBottom, rightTop) {
		return this.x >= leftBottom.x && this.y >= leftBottom.y && this.x <= rightTop.x && this.y <= rightTop.y;
	}

	static circleInsideRect (c, r, leftBottom, rightTop) {
		var leftBottomInflated = leftBottom.sub(new Coord(r , r));
		var rightTopInflated = rightTop.add(new Coord(r , r));
		return c.insideRect(leftBottomInflated, rightTopInflated);
	}

	static rectRectOverlap(leftBottom1, rightTop1, leftBottom2, rightTop2) {
		if (rightTop1.x < leftBottom2.x || rightTop1.y < leftBottom2.y || leftBottom1.x > rightTop2.x || leftBottom1.y > rightTop2.y) {
			return false;
		}
		return true;
		
	}
}


var drawDebug = function (ctx) {
	ctx.save()

	ctx.fillStyle = "#FF00FF";
	debugPoints.forEach(p => {
		ctx.fillRect(p.x - 2.0, p.y - 2.0, 4, 4);
	});

	debugLines.forEach(line => {
		ctx.strokeStyle = "#FF00FF";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(line.beg.x, line.beg.y);
		var end = line.beg.add(line.dir.mul_scalar(50));
		ctx.lineTo(end.x, end.y);

		ctx.stroke();

	});

	ctx.restore();
}

var getAngleDiff = function(target, base) {
	let angDiff = target - base;
	angDiff %= Math.PI * 2;
	if (angDiff > Math.PI) {
		angDiff = angDiff - 2 * Math.PI;
	} else if (angDiff < -Math.PI) {
		angDiff = angDiff + 2 * Math.PI;				
	}
	return angDiff;
}

class PlayerState {
	constructor(pos, angle) {
		this.pos = pos.copy();
		this.angle = angle;
	}

	static fromServerData(data) {
		return new PlayerState(Coord.convert(data.pos), data.angle);
	}

	copy() {
		return new PlayerState(this.pos, this.angle);
	}

	interpolate(other, t) {
		let pos = this.pos.lerp(other.pos, t);

		let angDiff = getAngleDiff(other.angle, this.angle);
		let angle = lerp(this.angle, this.angle + angDiff, t);
		 
		return new PlayerState(
			pos,
			angle
		);
	}
}

var UserPriviliges = {
  None: 0,
  Chat: 1,
  Kick: 2,
  Ban: 4,
  ServerOwner: 8,
  Commentator: 16
}

var BasicUser = UserPriviliges.Chat;
var Admin = BasicUser | UserPriviliges.Kick | UserPriviliges.Ban;

var RankType = [
  { name: "Guest",  stick: "stick-default"},
  { name: "Plebian",		score: 0, stick: "stick-default"},
  { name: "Scruberino", 	score: 100, stick: "stick_basic"},
  { name: "Village Idiot", 	score: 250, stick: "stick-twitch"},
  { name: "Filthy Casual",  score: 500, stick: "stick-bluesteel"},
  { name: "Potato Warrior",	score: 750, stick: "stick-funky"},
  { name: "Stardust", 		score: 1000, stick: "stick-ivory"},
  { name: "Starbaby", 	    score: 1250, stick: "stick-dotty"},
  { name: "Starchild",  	score: 1500, stick: "stick-ninja"},
  { name: "Starman", 	    score: 1750, stick: "stick-pinky"},
  { name: "Starlord",		score: 2000, stick: "stick-snake"},	
  { name: "Titan",  		score: 2250, stick: "stick-candycane_exc"},	
  { name: "Titan Elite",	score: 2500, stick: "stick-rocket"},	
  { name: "Titan Overlord",	score: 2750, stick: "stick-blackdiamond"},	
  { name: "Master",         score: 3000, stick: "stick-e"},	
  { name: "Grandmaster",    score: 4000, stick: "stick-sevn"}
];

function getRankColor(rank) {
    if (rank <= 5) {
        return "#36edc9";
    } else if (rank <= 10) {
        return "#43f9f3";
    } else if (rank <= 15) {
        return "#ffe169";
    } else return "#fd3051";
}

class PlayerInfo {
	constructor() {
		this.userName = '';
		this.privilige = BasicUser;
		this.privilige = 1;
		this.rank = 0;
        this.score = 0;
        this.color = 1;
        
        this.maxWinStreak = 0;
        this.maxLoseStreak = 0;
        this.playTime = 0;
        this.avatar = 0;
        this.wins = 0;
        this.losses = 0;
        this.fouls = 0;

		this.registered = Date.now();
		this.lastLogin = Date.now();
        this.country ="us";
        this.guid = "";
    }
    
    getScoreChange(otherRank, isWinner) {
        let rankDiff = this.rank - otherRank;

		if (isWinner) {
			var d = 40 - rankDiff * 5;
			d = Math.max(1, d);
			d = Math.min(80, d);
			return d;
		} else {
			var d = -40 - rankDiff * 5;
			d = Math.min(-1, d);
			d = Math.max(-80, d);
			return d;
        }
    }

    calcRank(score) {
        for (var i = 1; i < RankType.length; i++) {
			if (i == RankType.length - 1) {
				return i;
			}
			if (RankType[i + 1].score  > score && RankType[i].score  <= score) {
				return i;
			}
		}
    }

    addScore(amount) {
        this.score = Math.max(0, this.score+amount);
        if (this.rank > 0) {
            this.rank = this.calcRank(this.score);
        }
    }

    get size() {
        return (22 + // fields
                4 + //playTime
                this.userName.length*4 + 4 +
                this.country.length*4 + 4 +
                this.guid.length*4 + 4);      
    }

    static fromData(data) {
        let playerInfo = new PlayerInfo();
        playerInfo.userName = data.userName;
        playerInfo.privilige = data.privilige;
        playerInfo.rank = data.rank;
        playerInfo.score = data.score;
        playerInfo.color = data.color;
        playerInfo.maxWinStreak = data.maxWinStreak;
        playerInfo.maxLoseStreak = data.maxLoseStreak;
        playerInfo.playTime = data.playTime;
        playerInfo.avatar = data.avatar;
        playerInfo.wins = data.wins;
        playerInfo.losses = data.losses; 
        playerInfo.fouls = data.fouls;
        playerInfo.registered = data.registered;
        playerInfo.lastLogin = data.lastLogin;
        playerInfo.country = data.country;
        playerInfo.guid = data.guid;
        return playerInfo;
    }

	write(dataWriter) {
        dataWriter.writeUint8(this.privilige);
        dataWriter.writeUint8(this.rank);
        dataWriter.writeUint32(this.score);
        dataWriter.writeUint8(this.color);
        dataWriter.writeUint8(this.maxWinStreak);
        dataWriter.writeUint8(this.maxLoseStreak);
        dataWriter.writeFloat32(this.playTime);
        dataWriter.writeUint8(this.avatar);
        dataWriter.writeUint32(this.wins);
        dataWriter.writeUint32(this.losses);
        dataWriter.writeUint32(this.fouls);
		dataWriter.writeString(this.userName);
		dataWriter.writeString(this.country);
        dataWriter.writeString(this.guid);
    }
    
    read(dataReader) {
        this.privilige = dataReader.readUint8();
        this.rank = dataReader.readUint8();
        this.score = dataReader.readUint32();
        this.color = dataReader.readUint8();
        this.maxWinStreak = dataReader.readUint8();
        this.maxLoseStreak = dataReader.readUint8();
        this.playTime = dataReader.readFloat32();
        this.avatar = dataReader.readUint8();
        this.wins = dataReader.readUint32();
        this.losses = dataReader.readUint32();
        this.fouls = dataReader.readUint32();
        this.userName = dataReader.readString();
        this.country = dataReader.readString();
        this.guid = dataReader.readString();
    }
}

var currentZoom = 1;

var Config = {
	clientInputRate: 1000 / 20,
	clientFrameTime: 1000 / 60,
	serverFrameTime: 1000 / 200,

	interpolationRate: 0.3,

	minZoom: 0.45,
	maxZoom: 2,

	mouseControlMinDist: 17,
	mouseControlMaxDist: 34,

	canvasRes: 1,

	maxSpeed: 650
};


class DataReader {
	constructor(arrayBuffer) {
		this.dataView = new DataView(arrayBuffer);
		this.byteOffset = 0;
	}

	step(bytes) {
		this.byteOffset += bytes;
	}

	readInt8() {
		let value = this.dataView.getInt8(this.byteOffset);
		this.byteOffset++;
		return value;
	}

	readUint8() {
		let value = this.dataView.getUint8(this.byteOffset);
		this.byteOffset++;
		return value;
	}

	readInt16() {
		let value = this.dataView.getInt16(this.byteOffset);
		this.byteOffset += 2;
		return value;
	}

	readUint16() {
		let value = this.dataView.getUint16(this.byteOffset);
		this.byteOffset += 2;
		return value;
	}

	readInt32() {
		let value = this.dataView.getInt32(this.byteOffset);
		this.byteOffset += 4;
		return value;
	}

	readUint32() {
		let value = this.dataView.getUint32(this.byteOffset);
		this.byteOffset += 4;
		return value;
	}

	readFloat32() {
		let value = this.dataView.getFloat32(this.byteOffset);
		this.byteOffset += 4;
		return value;
	}

	readFloat64() {
		let value = this.dataView.getFloat64(this.byteOffset);
		this.byteOffset += 8;
		return value;
	}

	readString() {
		if (this.dataView.length < this.dataView.byteOffset + 4) {
			return "";
		}

		let strLength = this.readFloat32();
		if (this.dataView.length < this.dataView.byteOffset + strLength * 4) {
			return "";
		}

		let arr = [];
		for(var i = 0; i<strLength; ++i) {
			arr.push(this.readFloat32());
		}
		return String.fromCharCode.apply(String, arr);
		// if (/[\u0080-\uffff]/.test(str)) {
		// 	return { str: "", offset: offset };
		// }
	}

	readFlags() {
		let byte = this.readUint8();
		let flags = new Array(8);
		for (let i = 0; i < 8; i++) {
			flags[i] = byte & Math.pow(2, i);
		}
		return flags;
	}

	readAngle() {
		let angle = this.readInt16();
		return angle * Math.PI / 1280;
	}
}

class DataWriter {
	constructor(arrayBuffer) {
		this.dataView = new DataView(arrayBuffer);
		this.byteOffset = 0;
	}

	step(bytes) {
		this.byteOffset += bytes;
	}

	writeInt8(value) {
		this.dataView.setInt8(this.byteOffset, value);
		this.byteOffset++;		
	}
	
	writeUint8(value) {
		this.dataView.setUint8(this.byteOffset, value);
		this.byteOffset++;		
	}

	writeInt16(value) {
		this.dataView.setInt16(this.byteOffset, value);
		this.byteOffset += 2;		
	}
	
	writeUint16(value) {
		this.dataView.setUint16(this.byteOffset, value);
		this.byteOffset += 2;		
	}

	writeInt32(value) {
		this.dataView.setInt32(this.byteOffset, value);
		this.byteOffset += 4;		
	}
	
	writeUint32(value) {
		this.dataView.setUint32(this.byteOffset, value);
		this.byteOffset += 4;		
	}

	writeFloat32(value) {
		this.dataView.setFloat32(this.byteOffset, value);
		this.byteOffset += 4;
	}

	writeFloat64(value) {
		this.dataView.setFloat64(this.byteOffset, value);
		this.byteOffset += 8;
	}

	writeString(str) {
		// if(/[\u0080-\uffff]/.test(str)){
		// 	return;
		// }
		this.writeFloat32(str.length);
		for(var i=0; i < str.length; i++) {
			this.writeFloat32(str.charCodeAt(i));
		}
	}

	writeFlags(flags) {
		if (flags.length > 8) {
			throw "too many flags";
		}
		let byte = 0;
		flags.forEach((flag, i) => {
			if (flag) {
				byte = byte | Math.pow(2, i);
			}
		});
		this.writeUint8(byte);
	}

	writeAngle(angle) {
		angle %= Math.PI * 2;
		if (angle > Math.PI) {
			angle -= Math.PI * 2;
		} else if (angle < -Math.PI) {
			angle += Math.PI * 2;			
		}
		angle = angle * 1280 / Math.PI;
		this.writeInt16(angle);
	}
}

class SoundInstance {
	constructor(soundEngine, source, name, id) {
		this.id = soundEngine.ids++;
		this.source = source;
		this.name = name;
		this.gainNode = soundEngine.context.createGain();
		this.panNode = soundEngine.context.createStereoPanner();
		this.source.connect(this.gainNode);
		this.gainNode.connect(this.panNode);
		this.panNode.connect(soundEngine.mainGainNode);
	}

	play() {
		this.source.start(0);
	}

	stop() {
		this.source.stop();
	}

	setVolume(value) {
		this.gainNode.gain.value=value/100;
	}

	setPan(value) {
		this.panNode.pan.value = value;
	}
	
	setPlaybackRate(value) {
		this.source.playbackRate.value = value;		
	}
}


class Sound {
	constructor(soundName, url) {
		this.soundName = soundName;
		this.url = url;
	}
}

class SoundEngine {
	constructor(assetManager) {
	  	window.AudioContext = window.AudioContext || window.webkitAudioContext;
  		this.context = new AudioContext();
		this.count = 0;
		this.soundList = [];
		this.ids = 1;
		this.instances = [];
		this.mainGainNode = this.context.createGain();
		this.volume = 50;
		this.mainGainNode.value = 1;
		this.soundsEnabled = true;
        this.mainGainNode.connect(this.context.destination);
        this.assetManager = assetManager;
	}

	setVolume(volume) {
		if (volume >= 0 && volume <= 100) {
			this.volume = volume;
			this.mainGainNode.gain.value = volume / 100;
		}
	}

	mute() {
		this.mainGainNode.gain.value = 0;
		this.soundsEnabled = false;
	}

	unmute() {
		this.setVolume(this.volume);
		this.soundsEnabled = true;
	}

	loadAudioBuffer(sound, callback) {
		// Load buffer asynchronously
		var request = new XMLHttpRequest();
		request.open("GET", sound.url, true);
		request.responseType = "arraybuffer";

		request.onload = () => {
			// Asynchronously decode the audio file data in request.response
			this.context.decodeAudioData(
				request.response,
				(buffer) => {
					if (!buffer) {
						alert('error decoding file data: ' + sound.url);
						return;
					}
                    sound.buffer = buffer;
                    if (callback)
                        callback();
				},
				function(error) {
					console.error('decodeAudioData error', error);
				}
			);
		}

		request.onerror = function() {
			alert('BufferLoader: XHR error');
		}

		request.send();
	}


	addSound(soundName, url) {
		this.soundList.push(new Sound(soundName, url));
	}

	removeInstance(id) {
		this.instances = this.instances.filter(s => s.id != id);
	}

	preloadSounds(callback) {
		this.soundList.forEach(s => {
			this.loadAudioBuffer(s, callback);
		})
	}

	playRandomSound(soundName, min, max) {
		var soundNum = getRandomInt(min, max);
		return this.playSound(soundName+soundNum, false, soundName);
	};

	playSound(soundName, loop, origName) {

		let sound = this.soundList.find(s=>s.soundName == soundName)
		if (sound && sound.buffer) {
			var source = this.context.createBufferSource();
			var soundInstance = new SoundInstance(this, source, origName ? origName : soundName);
			source.buffer = sound.buffer;
			source.onended = () => {
				this.removeInstance(soundInstance.id);
			}
			if (loop) {
				source.loop = true;
			}
			source.start(0);
			this.instances.push(soundInstance);
			return soundInstance;
		}
		return null;
	}

	loopSound(soundName) {
		return this.playSound(soundName, true);
	}

	update() {
	}
}

class Sprite {
    constructor() {

    }
}

class AnimatedSprite {
    constructor(spriteFrames) {
        this.frames = spriteFrames;

    }

}


class Player {
	constructor(game_instance, id, client_instance) {
		this.instance = client_instance;
		this.game = game_instance;

		//Set up initial values for our state information
		this.state = 'not-connected';
		
		this.clientId = client_instance ? this.instance.id : 0;
		this.id = id;
		this.playerInfo = new PlayerInfo();

		//Our local history of inputs
		this.resetInput();
		this.target = { x: 0, y: 0 };
        this.chatCooldown = 0;
	}

	resetInput() {
		this.input = this.prevInput = {};
	}
}

var BallTypes = {
	team0: 0,
	team1: 1,
	white: 2,
	puck: 3
};

class Ball {
	constructor(team) {
		this.team = team;
        this.r = this.puck ? 25 : 16;
        this.position = new Coord(0,0);
	}

	get puck() {
		return this.team == BallTypes.puck;
	}

	get white() {
		return this.team == BallTypes.white;
    }
    
    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

	write(dataWriter) {
		dataWriter.writeFloat32(this.body.position[0]);
		dataWriter.writeFloat32(this.body.position[1]);
	}

	read(dataReader) {
		this.position.x = dataReader.readFloat32();
		this.position.y = dataReader.readFloat32();
	}

	init(stage, textures) {
        this.sprites = new PIXI.Container();
        textures.forEach(texture => {
            let sprite = new PIXI.Sprite(game.assetManager.getTexture(texture.texture));
            sprite.anchor.set(0.5, 0.5);
            if (texture.offset) {
                sprite.position.set(texture.offset[0], texture.offset[1]);
            }
            if (texture.keep) {
                sprite.keepColor = true;
            }
            this.sprites.addChild(sprite);
        });
        stage.addChild(this.sprites);
	}

	update() {
        let q = 0;
        if (this.pot) {
            let fadeTime = 160;
            q = (Date.now() - this.pot) / fadeTime;
            q *= q;
            if (q > 1) {
                delete this.pot;
            }
        }

        this.sprites.alpha = 1 - q;
        this.sprites.scale.x = this.sprites.scale.y = 1 - 0.8 * q;
        if (this.sprites.alpha < 0) {
            this.sprites.visible = false;
        }
        this.sprites.x = lerp(this.sprites.x, this.position.x, Config.interpolationRate);;
        this.sprites.y = lerp(this.sprites.y, this.position.y, Config.interpolationRate);
	}

	reset() {
        delete this.pot;
        this.sprites.visible = true;
        this.sprites.alpha = 1;
        this.sprites.scale.x = this.sprites.scale.y = 1;
	}

	get size() {
		return 2*4;
	}
}

var circleLineIntersect = function(p0, angle, c, r) {
	let p = { 
		x: p0.x - c.x,
		y: p0.y - c.y
	};

	let p2 = { 
		x: p.x + Math.cos(angle), 
		y: p.y + Math.sin(angle) 
	};

	let dx = p2.x - p.x;
	let dy = p2.y - p.y;
	let dr = Math.sqrt(dx * dx + dy * dy);
	let D = p.x * p2.y - p2.x * p.y;

	let delta = r * r * dr * dr - D * D;
	if (delta >= 0) {
		let x1 = (D * dy + Math.sign(dy) * dx * Math.sqrt(r * r * dr * dr - D * D)) / (dr * dr);
		let x2 = (D * dy - Math.sign(dy) * dx * Math.sqrt(r * r * dr * dr - D * D)) / (dr * dr);
		let y1 = (-D * dx + Math.abs(dy) * Math.sqrt(r * r * dr * dr - D * D)) / (dr * dr);
		let y2 = (-D * dx - Math.abs(dy) * Math.sqrt(r * r * dr * dr - D * D)) / (dr * dr);

		if ((p.x - x1) * (p.x - x1) + (p.y - y1) * (p.y - y1) < (p.x - x2) * (p.x - x2) + (p.y - y2) * (p.y - y2)) {
			return { x: x1 + c.x, y: y1 + c.y };
		} else {
			return { x: x2 + c.x, y: y2 + c.y };			
		}
	}
};

var circleDirIntersect = function(p, angle, c0, r) {
	let vx = Math.cos(angle);
	let vy = Math.sin(angle);
	
	let a = vx * vx + vy * vy;
	let b = 2 * (p.x * vx + p.y * vy - vx * c0.x - vy * c0.y);
	let c = p.x * p.x + p.y * p.y + c0.x * c0.x + c0.y * c0.y - 2 * (p.x * c0.x + p.y * c0.y) - r * r;

	let D = b * b - 4 * a * c;
	if (D < 0)
		return;

	let sqrtD = Math.sqrt(D);

	let lamdba1 = (-b + sqrtD) / (2 * a);
	let lamdba2 = (-b - sqrtD) / (2 * a);
	let lambda = Math.max(0, Math.min(lamdba1, lamdba2));
	if (!lambda)
		return;

	return { x: p.x + lambda * vx, y: p.y + lambda * vy };
};

class Table {
	constructor() {
		this.balls = [];
		let ballNum = 7 * 2 + 1 + 1;
		for (let i = 0; i < ballNum; i++) {
			let ball = this.createBall(this.getBallType(i));
			this.balls.push(ball);
		}
		this.stickAngle = 0;
		this.stickOffset = 0;
		this.createBall();
	}

	shotStart(target) {
		this.shotPowerStartX = target.x;
		this.shotPowerStartY = target.y;
	}

	aim(target) {
		this.stickAngle = Math.atan2(
			target.y - this.white.sprites.y, 
			target.x - this.white.sprites.x
		);
	}

	moveStick(target) {
		let d = 0;
		let max = 120;
		if (window.mobileAndTabletcheck()) {
			d = target.y - this.shotPowerStartY;
		} else {
			let dx = this.shotPowerStartX - target.x;
			let dy = this.shotPowerStartY - target.y;
			d = Math.sqrt(dx * dx + dy * dy);
			let a = Math.atan2(dy, dx);
			d *= Math.cos(a - this.stickAngle);
			
			if (d < 0) {
				this.shotPowerStartX = target.x;
				this.shotPowerStartY = target.y;					
			} else if (d > max) {
				this.shotPowerStartX = target.x + Math.cos(a) * max;
				this.shotPowerStartY = target.y + Math.sin(a) * max;				
			}
		}
		
		d = Math.max(0, Math.min(max, d));
		this.stickOffset = d;
	}

	setState(state) {
		if (state != MatchStates.penalty && this.state == MatchStates.penalty) {
			this.white.reset();
		} else if (state != MatchStates.puckPenalty && this.state == MatchStates.puckPenalty) {
			this.puck.reset();
		}
		this.state = state;	
	}

	getBallType(i) {
		if (i < 7) {
			return 0;
		}
		if (i < 14) {
			return 1;
		}
		if (i == 14) {
			return BallTypes.white;
		}
		if (i == 15) {
			return BallTypes.puck;
		}
	}
	
	createBall(type) {
		return new Ball(type);		
	}
	
	get puck() {
		return this.balls[15];
	}

	get white() {
		return this.balls[14];
	}

	isWhiteBall(ballIndex) {
		return ballIndex == 14;
	}

	isPuck(ballIndex) {
		return ballIndex > 14;
	}

	write(dataWriter) {
		this.balls.forEach(ball => ball.write(dataWriter));
		dataWriter.writeFloat32(this.stickAngle);
		dataWriter.writeInt16(this.stickOffset);
	}

	read(dataReader) {
		this.balls.forEach(ball => ball.read(dataReader));
		if (this.readStick) {
			this.stickAngle = dataReader.readFloat32();
			this.stickOffset = dataReader.readInt16();
		} else {
			dataReader.step(6);
		}
	}

	get size() {
		return this.balls.reduce((sum, ball) => sum + ball.size, 0) + 4 + 2;
	}

    show() {
        this.container.visible = true;
        this.table.visible = true;
        this.border.visible = true;
        this.centerSprite.visible = true;
        this.goalRight.visible = true;
        this.goalLeft.visible = true;
        this.goalTopRight.visible = true;
        this.goalTopLeft.visible = true;
        this.stick.visible = true;
    }

    showPanic() {
        this.container.visible = true;
        this.table.visible = false;
        this.border.visible = false;
        this.balls.forEach(b => b.sprites.visible = false);
        this.centerSprite.visible = false;
        this.goalRight.visible = false;
        this.goalLeft.visible = false;
        this.goalTopRight.visible = false;
        this.goalTopLeft.visible = false;
        this.stick.visible = false;
    }

    hide(){
        this.container.visible = false;
    }

	init(stage) {
		let container = new PIXI.Container();
        stage.addChild(container);
        
        let bg = new PIXI.Sprite(game.assetManager.getTexture("pockey_bg-01.png"));
        bg.position.set(-430,-240);
        container.addChild(bg);
        
        this.table = new PIXI.Sprite(game.assetManager.getTexture("table-default.png"));
		container.addChild(this.table);
        this.table.position.set(49, 49);
        
        this.border = new PIXI.Sprite(game.assetManager.getTexture("table_border-01.png"));
		container.addChild(this.border);

        this.centerSprite = new PIXI.Sprite(game.assetManager.getTexture("table_graphic-default.png"));
        this.centerSprite.position.set(this.border.width/2 - this.centerSprite.width/2, this.border.height/2 - this.centerSprite.height/2);
        this.centerSprite.alpha = 0.4;
        this.centerSprite.tint = 0x22babc;
		container.addChild(this.centerSprite);
       
		this.balls.forEach((ball, i) => {
			if (i < 14) {
				ball.init(container, [{texture:"ball-shadow.png", offset:[1.5,1.5]},{texture:"ball-colorme.png"}, {texture:"ball-highlight.png", keep: true, offset:[1.5,1.5]}]);
			} else if (i == 14) {
				ball.init(container, [{texture:"ball-shadow.png", offset:[1.5,1.5]},{texture:"ball-scratch.png"}]);
			} else {
				ball.init(container, [{texture:"puck-icon.png", offset:[1.5,1.5]},{texture:"ball-puck.png"}, {texture:"ball-puck-02.png"}]);
            }
            ball.sprites.visible = false;
        });
        
        let color1 = game.getColor(1);
        let color2 = game.getColor(2);
        
        this.colorBalls(0, color1.value);
        this.colorBalls(1, color2.value);
        
        this.goalLeft = new PIXI.Sprite(game.assetManager.getTexture("goal-left.png"));
        this.goalLeft.position.set(0 -37, 0 + 220);
        container.addChild(this.goalLeft);
        this.goalLeft.tint = color1.value;
        
        let colorMatrix = new PIXI.filters.ColorMatrixFilter();
        this.goalLeft.filters = [colorMatrix];
        colorMatrix.saturate(0.0,false);

        this.goalTopLeft = new PIXI.Sprite(game.assetManager.getTexture("goal-top-left.png"));
        this.goalTopLeft.position.set(0 -39, 0 + 259);
        container.addChild(this.goalTopLeft);


        this.goalRight = new PIXI.Sprite(game.assetManager.getTexture("goal-right.png"));
        this.goalRight.position.set(this.border.width - 70, 0 + 218);
        container.addChild(this.goalRight);
        this.goalRight.tint = color2.value;
		
        let colorMatrix2 = new PIXI.filters.ColorMatrixFilter();
        this.goalRight.filters = [colorMatrix2];
        colorMatrix2.saturate(0.0,false);

        this.goalTopRight = new PIXI.Sprite(game.assetManager.getTexture("goal-top-right.png"));
        this.goalTopRight.position.set(this.border.width - 32, 0 + 259);
        container.addChild(this.goalTopRight);

        this.aimFeedback = new PIXI.Graphics();
		container.addChild(this.aimFeedback);
		
        this.stick = new PIXI.spine.Spine(game.assetManager.getAnimation("stick"));
        this.stick.skeleton.setAttachment("stick-default","stick-default");

	//	this.stick.anchor.set(1, 0.5);
		this.stick.position.set(400, 400);
		container.addChild(this.stick);

        this.stickShootingBG = new PIXI.Graphics();
        this.stickShootingBG.lineStyle(5, 0xFFFFFF);
        
        // begin a green fill..
        this.stickShootingBG.beginFill(0xFFFFFF);
// draw a rectangle
        this.stickShootingBG.drawRect(1175, 50, 50, 500);

        this.stickShootingBG.alpha = 0.3;
        // end the fill
        this.stickShootingBG.endFill();    
        container.addChild(this.stickShootingBG);

        
        
        this.stickShooting = new PIXI.spine.Spine(game.assetManager.getAnimation("stick"));
        this.stickShooting.skeleton.setAttachment("stick-default","stick-default");

	//	this.stick.anchor.set(1, 0.5);
		this.stickShooting.rotation = -Math.PI/2;
		this.stickShooting.position.set(1200, 50);
        container.addChild(this.stickShooting);
        if (!window.mobileAndTabletcheck()) {
            this.stickShooting.visible = false;
            this.stickShootingBG.visible = false;
        }

        this.shotPowerFeedback = new PIXI.Graphics();
		this.shotPowerFeedback.pivot.y = -32;
		// container.addChild(this.shotPowerFeedback);

		this.penaltyFeedback = new PIXI.Graphics();
		container.addChild(this.penaltyFeedback);		
		
        this.container = container;
        this.hide();
	}

	updatePenaltyFeedback() {
		this.penaltyFeedback.visible = this.penaltyPos;
		if (!this.penaltyFeedback.visible)
			return;

		let r = this.state == MatchStates.penalty ? this.white.r : this.puck.r;
		this.penaltyFeedback.clear();
		let lineWidth = 4;
		this.penaltyFeedback.lineStyle(lineWidth, 0xffffff, 0.7);
		this.penaltyFeedback.drawCircle(0, 0, r - lineWidth / 2);	

		let x = lerp(this.penaltyFeedback.position.x, this.penaltyPos.x, Config.interpolationRate);
		let y = lerp(this.penaltyFeedback.position.y, this.penaltyPos.y, Config.interpolationRate);
		this.penaltyFeedback.position.set(x, y);
	}

	updateShotPowerFeedback(pos) {
		this.shotPowerFeedback.clear();
		if (this.shotPower) {
			this.shotPowerFeedback.position.copy(pos);		
			this.shotPowerFeedback.lineStyle(2, 0x000000, 1);
			this.shotPowerFeedback.beginFill(0xBBBBBB, 1);
			this.shotPowerFeedback.drawRect(-24, -4, this.shotPower * 48, 8);
		}
	}

	findHitBall(override = false, rotation, position) {
		let dist = Number.POSITIVE_INFINITY;
		let p;
		let b;
        let white = this.white.position;
        let index = 0;
		this.balls.forEach((ball,i) => {
			if (ball.white || !ball.sprites.visible) {
				return;
			}

			let s = circleDirIntersect(white, (override ? rotation : this.stick.rotation), (override ? position : ball.position), this.white.r + ball.r);
			if (s) {
				let dx = s.x - white.x;
				let dy = s.y - white.y;
				let d = Math.sqrt(dx * dx + dy * dy);
				if (d < dist) {
					dist = d;
					p = s;
					b = ball.position;
                    index = i;
				}				
			}
		});

		if (!p) {
			return;
		}

		return { newPosition: p, ballPosition: b, index: index };
	}

	findHitWall() {
		let xMin = 72 + 16;
		let xMax = 1043 - 16;
		let yMin = 72 + 16;
		let yMax = 559 - 16;

		let dirX = Math.cos(this.stick.rotation);
		let dirY = Math.sin(this.stick.rotation);

		let white = this.white.position;
		let lambda = Number.POSITIVE_INFINITY;
		let l;
		if (white.x > xMin) {
			l = (xMin - white.x) / dirX;
			if (l > 0) {
				lambda = Math.min(l, lambda);
			}
		}
		if (white.x < xMax) {
			l = (xMax - white.x) / dirX;
			if (l > 0) {
				lambda = Math.min(l, lambda);
			}
		}
		if (white.y > yMin) {
			l = (yMin - white.y) / dirY;
			if (l > 0) {
				lambda = Math.min(l, lambda);
			}
		}
		if (white.y < yMax) {
			l = (yMax - white.y) / dirY;
			if (l > 0) {
				lambda = Math.min(l, lambda);
			}
		}

		return { x: white.x + lambda * dirX, y: white.y + lambda * dirY };
	}

	drawDirections(hitBall) {
		let p = hitBall.newPosition;
		let b = hitBall.ballPosition;

		let white = this.white.position;
        window.mod = {o:20};
		let dir1 = { x: b.x - p.x+window.mod.o, y: b.y - p.y+window.mod.o };
		let angle1 = Math.atan2(dir1.y, dir1.x);
		let dir2 = { x: white.x - p.x, y: white.y - p.y };
		let angle2 = Math.atan2(dir2.y, dir2.x);
		let angle = angle1 + Math.sign(angle1 - angle2) * Math.PI / 2;

	//	let length = -Math.cos(angle - angle2) * 80;
	//	length += Math.sign(length) * 16;
		//this.aimFeedback.moveTo(p.x + Math.sign(length) * 16 * Math.cos(angle), p.y + Math.sign(length) * 16 * Math.sin(angle));			
		//this.aimFeedback.lineTo(p.x + length * Math.cos(angle), p.y + length * Math.sin(angle));			

		this.aimFeedback.moveTo(p.x + 16 * Math.cos(angle1), p.y + 16 * Math.sin(angle1));			
		let length2 = -Math.cos(angle1 - angle2) * 80 + 1000;
        this.aimFeedback.lineTo(p.x + length2 * Math.cos(angle1), p.y + length2 * Math.sin(angle1));	
        return angle;
	}

	drawTarget(p, invalid, b) {
		let white = this.white.position;
		
		let dir2 = { x: white.x - p.x, y: white.y - p.y };
		let angle2 = Math.atan2(dir2.y, dir2.x);
		
		let lineWidth = 4;
		this.aimFeedback.lineStyle(lineWidth, ( invalid ? 0xff0000 : 0xffffff ), 0.7);
		this.aimFeedback.moveTo(white.x - 16 * Math.cos(angle2), white.y - 16 * Math.sin(angle2));			
		this.aimFeedback.lineTo(p.x + 16 * Math.cos(angle2), p.y + 16 * Math.sin(angle2));			
        this.aimFeedback.drawCircle(p.x, p.y, 16 - lineWidth / 2);
        return {x:b.x, y:b.y};
    }

    validHit(ballIndex) {
        if (game.shooterIndex == 0) {
            return ballIndex >= 7;
        } else if (game.shooterIndex == 1) {
            return (ballIndex < 7 || ballIndex >= 14);
        }
    }

	updateAimFeedback() {
		this.aimFeedback.visible = this.state == MatchStates.aim && !this.shotEnd; 
		if (!this.aimFeedback.visible)
			return;

		this.aimFeedback.clear();

		let hitBall = this.findHitBall();		
		if (hitBall) {
            this.aimFeedback.tint = 0xffffff;
            var ang, pos;
            pos = this.drawTarget(hitBall.newPosition, !this.validHit(hitBall.index), hitBall.ballPosition);
            ang = this.drawDirections(hitBall);
           /* var hit2 = this.findHitBall(true, ang, pos);
            if (hit2) {
                this.drawTarget(hit2.newPosition, !this.validHit(hit2.index), hit2.ballPosition);
                this.drawDirections(hit2);
            }*/
		} else {
            this.aimFeedback.tint = 0xffffff;
			let hitWall = this.findHitWall();
			this.drawTarget(hitWall);
		}
	}

	updateStick() {
		if (this.state == MatchStates.aim) {
			this.stick.position.set(game.table.white.x, game.table.white.y);		

			this.stickAngle %= Math.PI * 2;
			this.stick.rotation %= Math.PI * 2;
			if (this.stickAngle - this.stick.rotation > Math.PI) {
				this.stickAngle -= Math.PI * 2;
			} else if (this.stickAngle - this.stick.rotation < -Math.PI) {
				this.stickAngle += Math.PI * 2;			
			}
			this.stick.rotation = lerp(this.stick.rotation, this.stickAngle, Config.interpolationRate);
		}
		this.stick.pivot.x = lerp(this.stick.pivot.x, this.stickOffset, Config.interpolationRate);
	}

	update() {
		if (window.mobileAndTabletcheck()) {
			let padding = 30;
			this.scale = Math.min((game.viewport.width - padding * 2) / 1112, 
								(game.viewport.height) / 626);
			this.container.scale.set(this.scale, this.scale);
			this.container.position.set(-1112 * this.scale / 2 - padding, -626 * this.scale / 2);			
		} else {
			this.scale = Math.max(game.viewport.width / 1920, game.viewport.height / 1080); 
			this.container.scale.set(this.scale, this.scale);
			this.container.position.set(-1112 * this.scale / 2, -626 * this.scale / 2);
		}
		
		this.balls.forEach((ball, i) => { 
			ball.update();
			//if (ball.puck) {
			//	let x = ball.sprites[0].position.x;
			//	ball.sprite.visible = x > 72 - ball.r && x < 1043 + ball.r;
			//}
		});
		this.updateStick();
		this.updateAimFeedback();
		this.updateShotPowerFeedback(this.white.position);
        this.updatePenaltyFeedback();
    }

	onBall(ballIndex) {
		let ball = this.balls[ballIndex];
		ball.pot = Date.now();
    }
    
    resetSprites() {
        this.balls.forEach(b =>b.reset());
    }

    colorBalls(playerIndex, color) {
        this.balls.forEach((b,i) => {
            if ((playerIndex == 0 && i < 7) || (playerIndex == 1 && i < 14 && i >= 7)) {
                b.sprites.children.forEach(s=> {
                    if (!s.keepColor) {
                        s.tint = color
                    }
                }
                );
            }
        })
    }
}

class Screen {
	constructor (container) {
		this.container = container;
		this.shown = false;
	}

	show () {
		this.container.style.display = "flex";
		this.shown = true;
	}

	hide () {
		this.container.style.display = "none";
		this.shown = false;
	}
	
}

class MatchStateScreen extends Screen {
    constructor(container) {
        super(container)
        this.stateText = document.getElementById('matchstatetext');
        this.stateText2 = document.getElementById('matchstatetext2');
        this.opponent = document.getElementById('opponent');
        this.endMatchContainer = document.getElementById('endmatch');
		this.rematchButton = document.getElementById('rematch');
        this.stateTextContainer = document.getElementById('matchstatetextcontainer');
        this.roundComplete = document.getElementById("roundcomplete");
    }

    rematchRequested() {
        this.setStateText("Rematch requested","Waiting for opponent...");
        this.opponent.style.display = "none";
        this.endMatchContainer.style.display = "none";
        this.roundComplete.style.display = "none";        
    }

    rematch() {
        this.setStateText("Revenga!", "Starting rematch...");
        this.refreshOpponent();
        this.opponent.style.display = "flex";
        $('#matchstatescreen').delay(3000).fadeOut(400);
    }

    refreshOpponent() {
        let win = this.invite ? 0 : game.playerInfos[game.selfIndex].getScoreChange(game.playerInfos[this.opponentIndex].rank, true);
		let lose = this.invite ? 0 : game.playerInfos[game.selfIndex].getScoreChange(game.playerInfos[this.opponentIndex].rank, false);
		let name = document.getElementById('opponentname');
		name.innerHTML = game.playerInfos[this.opponentIndex].userName;
		name.style.color = game.getColor(game.playerInfos[this.opponentIndex].color).text;
		let rank = document.getElementById('opponentrank');
		rank.innerHTML = RankType[game.playerInfos[this.opponentIndex].rank].name;
        rank.color = getRankColor(game.playerInfos[this.opponentIndex].rank);
        
        $("#opponentrankimg").attr('src','assets/ranks/color/rank-tier'+game.playerInfos[this.opponentIndex].rank+'.svg');
        
        $("#opponentavatarimg").attr('src','assets/avatars/'+game.getAvatar(game.playerInfos[this.opponentIndex].avatar).fileName);
		document.getElementById('opponentscore').innerHTML = '(' + game.playerInfos[this.opponentIndex].score + ')';
        // if (this.invite) {
        //     this.opponent.innerHTML += '<div>Friendly match';
        // } else {
			document.getElementById('opponentwin').innerHTML = win;
			document.getElementById('opponentlose').innerHTML = lose;
		// }                                 
    }

    searchMatch() {
        this.setStateText("Searching for opponent...");
        game.startSearchAnimation();
        this.endMatchContainer.style.display = "none";
        this.roundComplete.style.display = "none";        
    }

    startMatch(opponentIndex, invite) {
        this.setStateText("Opponent found!", "Starting match...");
        this.opponentIndex = opponentIndex;
        this.invite = invite
        this.refreshOpponent();
        this.opponent.style.display = "flex";
        $('#matchstatescreen').delay(4000).fadeOut(400);
    }

    endRound(winnerIndex, end, disconnect) {
        aiptag.cmd.display.push(function() { aipDisplayTag.refresh('pockey-io_300x250'); })

		game.playerInfos.forEach((playerInfo, i) => {
			document.getElementById('endavatar' + i).src = 'assets/avatars/' + game.getAvatar(playerInfo.avatar).fileName;
			document.getElementById('endname' + i).innerHTML = playerInfo.userName;
			document.getElementById('endname' + i).style.color= game.getColor(playerInfo.color).text;
			document.getElementById('endrank' + i).innerHTML = RankType[playerInfo.rank].name;
			//document.getElementById('player1rankscore').innerHTML = game.playerInfos[0].score;
            document.getElementById('endrankimg' + i).src = 'assets/ranks/color/rank-tier' + playerInfo.rank + '.svg';
            if (!disconnect) {
                document.getElementById('endwinnertext' + i).innerHTML = i == winnerIndex ? "Winner!" : "";
            } else if (i != winnerIndex) {
                document.getElementById('endwinnertext' + i).innerHTML = "disconnected";
            }
            game.playerStates.forEach((p,i) => {
                document.getElementById("streak" + i).innerHTML = p.maxStreak;
                document.getElementById("trick" + i).innerHTML = p.maxTrickshot;
                document.getElementById("fouls" + i).innerHTML = p.fouls;
                document.getElementById("acc" + i).innerHTML = p.accuracy +"%";
            })
		});
        this.roundComplete.style.display = "flex";

		this.endMatchContainer.style.display = "flex";
        this.opponent.style.display = "none";
        this.stateTextContainer.style.display = "none";

        if (end && !disconnect) {
            document.getElementById('returntxt').innerHTML = game.selfIndex == winnerIndex ? "You have won!" : "Your opponent has won!";
            document.getElementById('endmatchbtns').style.display = "flex";
            document.getElementById('rematch').style.display = "flex";
            this.roundComplete.innerHTML = "MATCH COMPLETE";
            $('#matchstatescreen').fadeIn(400);
        } else if (disconnect) {
            this.roundComplete.innerHTML = "MATCH COMPLETE";
            document.getElementById('returntxt').innerHTML = "Your opponent has left the game!";
            document.getElementById('endmatchbtns').style.display = "flex";
            $('#matchstatescreen').fadeIn(400);
            document.getElementById('rematch').style.display = "none";
        } else {
            document.getElementById('returntxt').innerHTML = "New round will begin shortly..."        
            document.getElementById('returntxt').style.display = "flex";
            document.getElementById('endmatchbtns').style.display = "none";
            this.roundComplete.innerHTML = "ROUND COMPLETE";
            $('#matchstatescreen').fadeIn(400).delay(8500).fadeOut(400);
        }
        // if (winnerIndex == game.selfIndex) {
        //     this.setStateText("You have won the round! New round will begin shortly.");
        // } else {
        //     this.setStateText(winnerInfo.userName +" has won the round! New round will begin shortly.");
        // }

        
    }

    endMatch(winnerIndex, disconnected) {
		this.endRound(winnerIndex, true, disconnected);
		return;

        let winnerInfo = game.playerInfos[winnerIndex];
        
        this.opponent.style.display = "none";
        if (winnerIndex == game.selfIndex) {
            if (disconnected) {
                this.setStateText("Opponent has left!");
            } else {
                this.setStateText("You have won the game!");
            }
        } else {
            this.setStateText(winnerInfo.userName +" has won the game!");
        }
        if (disconnected) {
            this.rematchButton.style.display = "none";
        } else {
            this.rematchButton.style.display = "flex";
        }
        this.endMatchContainer.style.display = "flex";
    }    

    setStateText(text, text2) {
		this.stateTextContainer.style.display = "flex";
        this.stateText.innerHTML = text;
        if (text2) {
            this.stateText2.innerHTML = text2;
            this.stateText2.style.display = "flex";
        } else {
            this.stateText2.style.display = "none";
        }
    }
}

class MatchDisplayScreen extends Screen {
    constructor(container) {
        super(container)
    }

	setClock(time, player) {
		if (time > 0) {
			document.getElementById('clock0').style.display = "flex";			
			document.getElementById('clock1').style.display = "flex";
			document.getElementById('clock' + (1 - player)).style.visibility = "hidden";
			document.getElementById('clock' + player).style.visibility = "visible";
			
			if (time < 10) {
				document.getElementById("clock" + player).innerHTML = "0:0" + time;
			} else {
				document.getElementById("clock" + player).innerHTML = "0:" + time;				
            }
            if (time <= 5) {
				document.getElementById("clock" + player).style.color = "red";				
            }
		} else {
			document.getElementById('clock0').style.visibility = "hidden";			
			document.getElementById('clock1').style.visibility = "hidden";
			document.getElementById('clock0').style.color = "white";			
			document.getElementById('clock1').style.color = "white";
		}
	}

    rematch() {
    }

    searchMatch() {
        this.container.style.display = "none";
    }


    startMatch(player1Info, player2Info) {
        this.refreshPlayerInfos();
        $('#matchdisplayscreen').delay(3000).fadeIn(400);
    }

    endRound() {
    }

    
    refreshPlayerInfos() {
        document.getElementById('player1username').innerHTML = game.playerInfos[0].userName;
        document.getElementById('player2username').innerHTML = game.playerInfos[1].userName;
        document.getElementById('player1rankscore').innerHTML = game.playerInfos[0].score;
        document.getElementById('player2rankscore').innerHTML = game.playerInfos[1].score;

        $("#player1rankimg").attr('src','assets/ranks/shadowcolor/rank-tier'+game.playerInfos[0].rank+'.svg');
        $("#player2rankimg").attr('src','assets/ranks/shadowcolor/rank-tier'+game.playerInfos[1].rank+'.svg');

        $("#player1avatarimg").attr('src','assets/avatars/'+game.getAvatar(game.playerInfos[0].avatar).fileName);
        $("#player2avatarimg").attr('src','assets/avatars/'+game.getAvatar(game.playerInfos[1].avatar).fileName);

    }

}

class MatchDisplay {
    
    constructor(statecontainer) { 
        this.matchStateScreen = new MatchStateScreen(document.getElementById("matchstatescreen"))
        this.matchDisplayScreen = new MatchDisplayScreen(document.getElementById("matchdisplayscreen"));
    }

    rematchRequested() {
        this.matchStateScreen.rematchRequested();
    }

    searchMatch() {
        this.matchDisplayScreen.searchMatch();
        this.matchStateScreen.searchMatch();
    }

    rematch() {
        this.matchStateScreen.rematch();
        this.matchDisplayScreen.rematch();
    }

    startMatch(invite) {
        let opponentIndex = 1 - game.selfIndex;
        this.matchStateScreen.startMatch(opponentIndex, invite);
        this.matchDisplayScreen.startMatch();
        game.table.resetSprites();
    }

    endRound(winnerIndex) {
        this.matchDisplayScreen.endRound();
        

        let endMatch = game.playerStates[winnerIndex].score >= 2;
        if (endMatch) {
            this.matchStateScreen.endMatch(winnerIndex);
        } else {
            this.matchStateScreen.endRound(winnerIndex);
        }
    }

    refreshPlayerInfos() {
        this.matchDisplayScreen.refreshPlayerInfos();
    }

    opponentDisconnected() {
        this.matchStateScreen.endMatch(game.selfIndex, true);
    }

    setStateText(text) {
        this.matchStateScreen.setStateText(text);
    }

    show() {
        this.matchStateScreen.show();
    }

    hide() {
        this.matchStateScreen.hide();
        this.matchDisplayScreen.hide();
    }
}

class GUI {
	constructor (game) {
		this.matchDisplay = new MatchDisplay();
		this.settings = document.getElementById("settings");
		this.settingsVisible = false;
		if (readCookie("cookiesAccepted")) {
        }
        
        this.leftMenuItems = [];
        this.leftMenuItems.push({arrow: document.getElementById("playgamearrow"),
                                 item: document.getElementById("playgame"),
                                 highlight: document.getElementById("playgamehighlight")});
        this.leftMenuItems.push({arrow: document.getElementById("invitearrow"),
                                 item: document.getElementById("invite"),
                                 highlight: document.getElementById("invitehighlight")});
        this.leftMenuItems.push({arrow: document.getElementById("allstarsarrow"),
                                 item: document.getElementById("allstars"),
                                 highlight: document.getElementById("allstarshighlight")});

       // $('.leftmenubutton').hover(
       // function(){
       //     $(this).css('color','white');
       // },
       // function(){
       //     $(this).css('color','#20d7e7');
       // });
        this.highscores = document.getElementById("highscores");
        this.loginContainer = document.getElementById("logincontainer");
        this.howTo = document.getElementById("howto");
        this.invite = document.getElementById("invitescreen");
        this.main = document.getElementById("main");
        this.leftMenu = document.getElementById("leftmenu");
        this.verticalMain = document.getElementById("verticalMain");
        this.mainLeft = document.getElementById("mainleft");
        this.mainRight = document.getElementById("mainright");

        this.invitelink = document.getElementById("invitelink");
        this.invitebtn = document.getElementById("invitebtn");
        this.copybtn = document.getElementById("copybtn");
        this.copymsg = document.getElementById("copymsg");
    }
    
    setupInviteScreen(inviteId) {
        this.invitelink.innerHTML="https://pockey.io?i="+inviteId;
        this.invitelink.style.display = "flex";
        this.invitebtn.style.display = "none";
        this.copybtn.style.display = "flex";
        this.copymsg.style.display = "flex";
    }

	hidePrivacyContainer() {
		document.getElementById("privacycontainer").style.display = "none";
    }
    
    hideMainAll() {
        this.hidePrivacyContainer();
		this.main.style.display = 'none';		
		this.leftMenu.style.display = 'none';		
//        this.loginContainer.style.display = 'none';
//        this.highscores.style.display = 'none';	
//        this.howTo.style.display = 'none';	
        
		//document.getElementById("teamball").style.display = 'none';		
		//document.getElementById("account").style.display = 'none';		
    }

	hideMainScreen(){
        this.loginContainer.style.display = 'none';
        this.highscores.style.display = 'none';	
        this.howTo.style.display = 'none';
        this.invite.style.display = 'none';
        
		//document.getElementById("teamball").style.display = 'none';		
		//document.getElementById("account").style.display = 'none';		
    }
    
    deselectLeftMenuItems() {
        this.leftMenuItems.forEach(i => {
            i.arrow.style.display = "none";
            i.highlight.style.visibility = "hidden";
            i.item.className = "leftmenubutton";
        });
    }


    selectLeftMenuItem(index) {
        this.deselectLeftMenuItems();
        this.leftMenuItems[index].arrow.style.display = "flex";
        this.leftMenuItems[index].highlight.style.visibility = "visible";
        this.leftMenuItems[index].item.className = "leftmenubuttonselected";
    }

    selectPlayGame() {
        this.selectLeftMenuItem(0);
        this.hideMainScreen();
        this.loginContainer.style.display = "flex";
        this.verticalMain.style.display = "flex";
        this.mainLeft.style.display = "flex";
        this.mainRight.style.display = "flex";
        this.howTo.style.display = 'flex';
    }

    selectInvite() {
        this.selectLeftMenuItem(1);
        this.hideMainScreen();
        this.loginContainer.style.display = "flex";
        this.verticalMain.style.display = "flex";
        this.mainLeft.style.display = "flex";
        this.mainRight.style.display = "flex";
        this.invite.style.display = 'flex';
    }

    selectAllStars() {
        this.selectLeftMenuItem(2);
        this.hideMainScreen();
        this.highscores.style.display = "flex";
        this.verticalMain.style.display = "none";
        this.mainLeft.style.display = "none";
        this.mainRight.style.display = "none";
    }

	settingsShown() {
		return this.settingsVisible;
	}

	hideSettings() {
		this.settingsVisible = false;
		this.settings.style.display = "none";
	}

	showSettings() {
		this.settingsVisible = true;
		this.settings.style.display = "flex";
	}

	hideAllScreens() {
		this.screens.forEach(s => {
			s.hide();
		})
	}

	acceptCookies() {
		createCookie("cookiesAccepted");
	}

    showMatchDisplay() {
        this.matchDisplay.show();
    }

    update(self, game) {
	}
}


class Customizer {
    constructor() {
        this.prevColor = document.getElementById("prevcolor");
        this.nextColor = document.getElementById("nextcolor");
        this.color = document.getElementById("color");

        this.prevAvatar = document.getElementById("prevavatar");
        this.nextAvatar = document.getElementById("nextavatar");
        this.avatar = document.getElementById("playeravatar");
        
        this.avatarIndex = 0;
        this.colorIndex = 0;

        this.colors = [1,2];
        this.avatars = [0];

        this.prevColor.addEventListener("click", (e) => {
            this.colorIndex -= 1;
            if (this.colorIndex < 0) {
                this.colorIndex = this.colors.length - 1;
            }
            game.self.playerInfo.color = this.colors[this.colorIndex];
            this.refreshColor();
            return false;
        });

        this.nextColor.addEventListener("click", (e) => {
            this.colorIndex = (this.colorIndex + 1) % this.colors.length;
            game.self.playerInfo.color = this.colors[this.colorIndex];
            this.refreshColor();
            return false;
        });

        this.prevAvatar.addEventListener("click", (e) => {
            this.avatarIndex -= 1;
            if (this.avatarIndex < 0) {
                this.avatarIndex = this.avatars.length - 1;
            }
            game.self.playerInfo.avatar = this.avatars[this.avatarIndex];
            this.refreshAvatar();
            return false;
        });

        this.nextAvatar.addEventListener("click", (e) => {
            this.avatarIndex = (this.avatarIndex + 1) % this.avatars.length;
            game.self.playerInfo.avatar = this.avatars[this.avatarIndex];
            this.refreshAvatar();
            return false;
        });
    }

    refreshAvatar() {
        $('#'+this.avatar.id).attr('src','assets/avatars/'+game.getAvatar(this.avatars[this.avatarIndex]).fileName);
    }

    refreshColor() {
        this.color.style.backgroundColor = game.getColor(this.colors[this.colorIndex]).text;        
    }

    refreshCustomizer() {
        this.refreshAvatar();
        this.refreshColor();
    }

    setupCustomizer() {
        this.colors = [];
        this.avatars = [];

        game.inventory.forEach(i => {
            let item = game.items.find(it => it.itemGuid == i);
            if (item) {
                if (item.type == "color") {
                    this.colors.push(item.id);
                } else if (item.type == "avatar") {
                    this.avatars.push(item.id);
                }
            }
        })
    }

    playerInfoUpdated() {
        if (game.self.playerInfo && game.inventory && game.items) {
            this.setupCustomizer();
            this.avatarIndex = this.avatars.findIndex((a) => { return a == game.self.playerInfo.avatar});
            if (this.avatarIndex < 0) {
                this.avatarIndex = 0;
            }
            this.colorIndex = this.colors.findIndex((c) => { return c == game.self.playerInfo.color} );
            if (this.colorIndex < 0) {
                this.colorIndex = 0;
            }
            this.refreshCustomizer();
        }
    }
}


class MouseHandler {
	constructor(game) {
		this.mouseDown = false;
		this.rightMouseDown = false;
		this.lastRecievedPos = null;
		this.lastRecievedTime = 0;
		this.pos = new Coord(0, 0);
		this.wheeledDown = false;
		this.wheeledUp = false;
		this.game = game;

		game.viewport.addEventListener("mouseleave", (e) => {
			this.lastRecievedPos = null;
		});

		game.viewport.addEventListener("mousemove", (event) => {
			event.preventDefault();
			this.moveTarget(event.offsetX, event.offsetY);
        });

        game.viewport.addEventListener("touchmove", (event) => {
            let touch = event.changedTouches[0]; 
            if (touch) {
                event.preventDefault();
				this.moveTarget(touch.clientX, touch.clientY);
            }
        });

        game.viewport.addEventListener("touchend", (event) => {
            game.touchShoot = false;
        });
   
		game.viewport.addEventListener("click", (event) => {
        });

        game.viewport.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
        
		game.viewport.addEventListener("mousedown", (event) => {
			event.preventDefault();
			if (event.buttons & 1) {
				this.mouseDown = true;
			}
			if (event.buttons & 2) {
				this.rightMouseDown = true;
			}
 
			var screenPos = new Coord(event.offsetX, event.offsetY);
		});

		game.viewport.addEventListener("mouseup", (event) => {
			if (!(event.buttons & 1)) {
				this.mouseDown = false;
			}
			if (!(event.buttons & 2)) {
				this.rightMouseDown = false;
			}
		});
		
		game.viewport.addEventListener("wheel", (event) => {
			this.wheeledDown = event.deltaY > 0.0;
			this.wheeledUp = event.deltaY < 0.0;
		});
	}

	moveTarget(x, y) {
		this.lastRecievedPos = new Coord(x * Config.canvasRes, y * Config.canvasRes);
		this.moved = true;
		this.lastRecievedTime = Date.now();
	}

	resetWheel() {
		this.wheeledDown = false;
		this.wheeledUp = false;
	}

	getData() {
		if (!this.lastRecievedPos || !this.moved) {
			return null;
		}

		return {
			pos: this.pos.copy(),
			down: this.mouseDown,
			rightDown: this.rightMouseDown
		};
	}

	update() {
		if (!this.game.client_logged_in) {
			return;
		}

		if (this.game.camera && this.lastRecievedPos) {
			// this.pos = this.game.camera.screenToModel(this.lastRecievedPos);
			// this.pos = this.lastRecievedPos;
			let x = this.lastRecievedPos.x - game.viewport.width / 2 + game.table.scale * 1112 / 2;
			let y = this.lastRecievedPos.y - game.viewport.height / 2 + game.table.scale * 626 / 2;
			this.pos = new Coord(x / game.table.scale, y / game.table.scale);
		}
	}
}

var MatchEventTypes = {
    NewMatch:1,
    HealthUpdate:2,
    ShooterIndex:3,
    BallEvent:4,
    ShotEvent:5,
    RoundEvent: 6,
    Rematch: 7,
    Message: 8,
    PlayerInfos: 9,
	BallHit: 10,
	WallHit: 11,
	Timer: 12,
    PuckEvent:13,
    Disconnect:14
}

class MatchEvent {
	constructor(eventType) {
        this.type = MatchEvent.type;
        this.eventType = eventType;
	}

    static read(dataReader) {
        this.eventType = dataReader.readUint8();
        let event = new MatchEvent(this.eventType);
        switch(this.eventType) {
            case MatchEventTypes.NewMatch: event.readNewMatch(dataReader); break;
            case MatchEventTypes.HealthUpdate: event.readHealthUpdate(dataReader); break;
            case MatchEventTypes.ShooterIndex: event.readShooterIndex(dataReader); break;
            case MatchEventTypes.BallEvent: event.readBallEvent(dataReader); break;
            case MatchEventTypes.ShotEvent: event.readShotEvent(dataReader); break;
            case MatchEventTypes.RoundEvent: event.readRoundEvent(dataReader); break;
            case MatchEventTypes.Rematch: event.readRematch(dataReader); break;
            case MatchEventTypes.Message: event.readMessage(dataReader); break;
            case MatchEventTypes.PlayerInfos: event.readPlayerInfos(dataReader); break;
            case MatchEventTypes.BallHit: event.readBallHit(dataReader); break;
            case MatchEventTypes.WallHit: event.readWallHit(dataReader); break;
            case MatchEventTypes.Timer: event.readTimer(dataReader); break;
            case MatchEventTypes.PuckEvent: event.readPuckEvent(dataReader); break;
            case MatchEventTypes.Disconnect: event.readDisconnect(dataReader); break;
        }
        return event;
    };
    
	write(dataWriter) {
        dataWriter.writeUint8(this.eventType);
        switch(this.eventType) {
            case MatchEventTypes.NewMatch: this.writeNewMatch(dataWriter); break;
            case MatchEventTypes.HealthUpdate: this.writeHealthUpdate(dataWriter); break;
            case MatchEventTypes.ShooterIndex: this.writeShooterIndex(dataWriter); break;
            case MatchEventTypes.BallEvent: this.writeBallEvent(dataWriter); break;
            case MatchEventTypes.ShotEvent: this.writeShotEvent(dataWriter); break;
            case MatchEventTypes.RoundEvent: this.writeRoundEvent(dataWriter); break;
            case MatchEventTypes.Rematch: this.writeRematch(dataWriter); break;
            case MatchEventTypes.Message: this.writeMessage(dataWriter); break;
            case MatchEventTypes.PlayerInfos: this.writePlayerInfos(dataWriter); break;
            case MatchEventTypes.BallHit: this.writeBallHit(dataWriter); break;
            case MatchEventTypes.WallHit: this.writeWallHit(dataWriter); break;
            case MatchEventTypes.Timer: this.writeTimer(dataWriter); break;
            case MatchEventTypes.PuckEvent: this.writePuckEvent(dataWriter); break;
            case MatchEventTypes.Disconnect: this.writeDisconnect(dataWriter); break;
        }
    };
    
	get size() {
        let size = 1;
        switch(this.eventType) {
            case MatchEventTypes.NewMatch: size += this.sizeNewMatch(); break;//data.playerInfo1.size + data.playerInfo2.size;
            case MatchEventTypes.HealthUpdate: size += this.sizeHealthUpdate(); break;
            case MatchEventTypes.ShooterIndex: size += this.sizeShooterIndex(); break;
            case MatchEventTypes.BallEvent: size += this.sizeBallEvent(); break;
            case MatchEventTypes.ShotEvent: size += this.sizeShotEvent(); break;
            case MatchEventTypes.RoundEvent: size += this.sizeRoundEvent(); break;
            case MatchEventTypes.Rematch: size += this.sizeRematch(); break;
            case MatchEventTypes.Message: size += this.sizeMessage(); break;
            case MatchEventTypes.PlayerInfos: size += this.sizePlayerInfos(); break;
            case MatchEventTypes.BallHit: size += this.sizeBallHit(); break;
            case MatchEventTypes.WallHit: size += this.sizeWallHit(); break;
            case MatchEventTypes.Timer: size += this.sizeTimer(); break;
            case MatchEventTypes.PuckEvent: size += this.sizePuckEvent(); break;
            case MatchEventTypes.Disconnect: size += this.sizeDisconnect(); break;
        }
        return size;
	}

	handle() {
        switch(this.eventType) {
            case MatchEventTypes.NewMatch: this.handleNewMatch(); break;
            case MatchEventTypes.HealthUpdate: this.handleHealthUpdate(); break;
            case MatchEventTypes.ShooterIndex: this.handleShooterIndex(); break;
            case MatchEventTypes.BallEvent: this.handleBallEvent(); break;
            case MatchEventTypes.ShotEvent: this.handleShotEvent(); break;
            case MatchEventTypes.RoundEvent: this.handleRoundEvent(); break;
            case MatchEventTypes.Rematch: this.handleRematch(); break;
            case MatchEventTypes.Message: this.handleMessage(); break;
            case MatchEventTypes.PlayerInfos: this.handlePlayerInfos(); break;
            case MatchEventTypes.BallHit: this.handleBallHit(); break;
            case MatchEventTypes.WallHit: this.handleWallHit(); break;
            case MatchEventTypes.Timer: this.handleTimer(); break;
            case MatchEventTypes.PuckEvent: this.handlePuckEvent(); break;
            case MatchEventTypes.Disconnect: this.handleDisconnect(); break;
        }
    }


    static NewMatch(playerInfo1, playerInfo2, invite) {
        let event = new MatchEvent(MatchEventTypes.NewMatch);
        event.playerInfo1 = playerInfo1;
        event.playerInfo2 = playerInfo2;
        event.invite = invite;
        return event;
    }

    sizeNewMatch() {
        return this.playerInfo1.size + this.playerInfo2.size + 1;
    }

    readNewMatch(dataReader) {
        this.playerInfo1 = new PlayerInfo();
        this.playerInfo1.read(dataReader);
        this.playerInfo2 = new PlayerInfo();
        this.playerInfo2.read(dataReader);
        this.invite = dataReader.readUint8();
    };

    writeNewMatch(dataWriter) {
        this.playerInfo1.write(dataWriter);
        this.playerInfo2.write(dataWriter);
        dataWriter.writeUint8(this.invite);
    }

    handleNewMatch() {
        game.playerInfos = [];
        game.playerInfos.push(this.playerInfo1);
        game.playerInfos.push(this.playerInfo2);

        game.selfIndex = this.playerInfo1.guid == game.self.playerInfo.guid ? 0 : 1;

        if (game.playerInfos[game.selfIndex].color == game.playerInfos[1-game.selfIndex].color) {
            let color = game.colors.find(c => c.id != game.playerInfos[1-game.selfIndex].color);
            if (color) {
                game.playerInfos[1-game.selfIndex].color = color.id;
            }
        }

        game.playerStates = [];
        game.playerStates.push({hp:7, score: 0});
        game.playerStates.push({hp:7, score: 0});
        game.setScoreBars();
        game.setHpBars();        
        game.gui.matchDisplay.startMatch(this.invite);
        game.recolorAll();
        game.soundEngine.playSound("start");
        game.stopSearchAnimation();
    }


    static HealthUpdate(player1hp, player2hp) {
        let event = new MatchEvent(MatchEventTypes.HealthUpdate);
        event.player1hp = player1hp;
        event.player2hp = player2hp;
        return event;
    }

    sizeHealthUpdate() {
        return 2;
    }

    readHealthUpdate(dataReader) {
        this.player1hp = dataReader.readUint8();
        this.player2hp = dataReader.readUint8();
	};

    writeHealthUpdate(dataWriter) {
        dataWriter.writeUint8(this.player1hp);
        dataWriter.writeUint8(this.player2hp);
    }

    handleHealthUpdate() {
        game.playerStates[0].hp = this.player1hp;
        game.playerStates[1].hp = this.player2hp;
        game.setHpBars();
    }


    static ShooterIndex(shooterIndex) {
        let event = new MatchEvent(MatchEventTypes.ShooterIndex);
        event.shooterIndex = shooterIndex;
        return event;
    }

    sizeShooterIndex() {
        return 1;
    }

    readShooterIndex(dataReader) {
        this.shooterIndex = dataReader.readInt8();
    };
    
    writeShooterIndex(dataWriter) {
        dataWriter.writeInt8(this.shooterIndex);
	}
	
    handleShooterIndex() {
        if (this.shooterIndex == 0) {
            game.table.stick.skeleton.setAttachment("stick-default", RankType[game.playerInfos[this.shooterIndex].rank].stick);
            game.table.stickShooting.skeleton.setAttachment("stick-default", RankType[game.playerInfos[this.shooterIndex].rank].stick);
            $("#player1avatar").removeClass("avatar");            
            $("#player1avatar").addClass("avatarshoot");            
            $("#player2avatar").removeClass("avatarshoot");            
            $("#player2avatar").addClass("avatar");    
                    
        } else if (this.shooterIndex == 1) {
            game.table.stick.skeleton.setAttachment("stick-default", RankType[game.playerInfos[this.shooterIndex].rank].stick);            
            game.table.stickShooting.skeleton.setAttachment("stick-default", RankType[game.playerInfos[this.shooterIndex].rank].stick);            
            $("#player2avatar").removeClass("avatar");            
            $("#player2avatar").addClass("avatarshoot");            
            $("#player1avatar").removeClass("avatarshoot");            
            $("#player1avatar").addClass("avatar");            
        } else {
            $("#player1avatar").removeClass("avatarshoot");            
            $("#player1avatar").addClass("avatar");            
            $("#player2avatar").removeClass("avatarshoot");            
            $("#player2avatar").addClass("avatar");            
        }
        if (this.shooterIndex == game.selfIndex) {
            game.chatSystem.addSystemMessage("Your turn!");
            game.soundEngine.playSound("shooter");
        } else if (this.shooterIndex == (1 - game.selfIndex)) {
            game.chatSystem.addSystemMessage(game.playerInfos[this.shooterIndex].userName+"'s turn!");
        }
        game.shooterIndex = this.shooterIndex;
    };
    

    static BallEvent(ballIndex, v) {
        let event = new MatchEvent(MatchEventTypes.BallEvent);
        event.ballIndex = ballIndex;
        event.v = v / 10;
        return event;
    }

    sizeBallEvent() {
        return 2;
    }

    readBallEvent(dataReader) {
        this.ballIndex = dataReader.readUint8();
        this.v = dataReader.readUint8();
    };
    
    writeBallEvent(dataWriter) {
        dataWriter.writeUint8(this.ballIndex);
        dataWriter.writeUint8(this.v);
    }

    handleBallEvent() {
        game.table.onBall(this.ballIndex);
        game.soundEngine.playRandomSound("score",1,3).setVolume(Math.max(30, this.v * 0.8));
    }


    static ShotEvent(force) {
        let event = new MatchEvent(MatchEventTypes.ShotEvent);
        event.force = force;
        return event;
    }

    sizeShotEvent() {
        return 1;
    }

    readShotEvent(dataReader) {
        this.force = dataReader.readUint8();
    }
    
    writeShotEvent(dataWriter) {
        dataWriter.writeUint8(this.force);
    }

    handleShotEvent() {
        game.soundEngine.playSound("shot").setVolume(this.force);
    }


    static RoundEvent(winnerIndex, player1, player2) {
        let event = new MatchEvent(MatchEventTypes.RoundEvent);
        event.winnerIndex = winnerIndex;
        event.player1 = player1;
        event.player2 = player2;
        return event;
    }

    sizeRoundEvent() {
        return 11;
    }

    readRoundEvent(dataReader) {
        this.winnerIndex = dataReader.readUint8();
        this.player1Score = dataReader.readUint8();
        this.player1Fouls = dataReader.readUint8();
        this.player1MaxTrickshot = dataReader.readUint8();
        this.player1MaxStreak = dataReader.readUint8();
        this.player1Accuracy = dataReader.readUint8();
        
        this.player2Score = dataReader.readUint8();
        this.player2Fouls = dataReader.readUint8();
        this.player2MaxTrickshot = dataReader.readUint8();
        this.player2MaxStreak = dataReader.readUint8();
        this.player2Accuracy = dataReader.readUint8();
    }
    
    writeRoundEvent(dataWriter) {
        dataWriter.writeUint8(this.winnerIndex);
        dataWriter.writeUint8(this.player1.score);
        dataWriter.writeUint8(this.player1.fouls);
        dataWriter.writeUint8(this.player1.maxTrickshot);
        dataWriter.writeUint8(this.player1.maxStreak);
        dataWriter.writeUint8(this.player1.shots ? Math.round((this.player1.shotsScored/this.player1.shots)*100) : 0);
        
        dataWriter.writeUint8(this.player2.score);
        dataWriter.writeUint8(this.player2.fouls);
        dataWriter.writeUint8(this.player2.maxTrickshot);
        dataWriter.writeUint8(this.player2.maxStreak);
        dataWriter.writeUint8(this.player2.shots ? Math.round((this.player2.shotsScored/this.player2.shots)*100) : 0);
    }

    handleRoundEvent() {
        setTimeout(()=>{
            game.table.resetSprites();
        }, 3000);
        game.playerStates[0].score = this.player1Score;
        game.playerStates[0].fouls = this.player1Fouls;
        game.playerStates[0].maxTrickshot = this.player1MaxTrickshot;
        game.playerStates[0].maxStreak = this.player1MaxStreak;
        game.playerStates[0].accuracy = this.player1Accuracy;
        
        game.playerStates[1].score = this.player2Score;
        game.playerStates[1].fouls = this.player2Fouls;
        game.playerStates[1].maxTrickshot = this.player2MaxTrickshot;
        game.playerStates[1].maxStreak = this.player2MaxStreak;
        game.playerStates[1].accuracy = this.player2Accuracy;

        game.gui.matchDisplay.endRound(this.winnerIndex);
        game.setScoreBars();
    }  
    
    
    static Rematch() {
        let event = new MatchEvent(MatchEventTypes.Rematch);
        return event;
    }

    sizeRematch() {
        return 0;
    }

    readRematch(dataReader) {
    }
    
    writeRematch(dataWriter) {
    }

    handleRematch() {
        game.playerStates[0].score = 0;
        game.playerStates[1].score = 0;
        game.playerStates[0].hp = 7;
        game.playerStates[1].hp = 7;
        game.gui.matchDisplay.rematch();
        game.setScoreBars();
        game.setHpBars();        
        game.soundEngine.playSound("start");     
    }
    

    static Message(playerIndex, message) {
        let event = new MatchEvent(MatchEventTypes.Message);
        event.playerIndex = playerIndex;
        event.message = message;        
        return event;
    }

    sizeMessage() {
        return 1 + this.message.length*4 + 4;
    }

    readMessage(dataReader) {
        this.playerIndex = dataReader.readUint8();
        this.message = dataReader.readString();
    }
    
    writeMessage(dataWriter) {
        dataWriter.writeUint8(this.playerIndex);
        dataWriter.writeString(this.message);
    }

    handleMessage() {
        if (this.playerIndex <= 1) {
            game.chatSystem.addMessage(this.playerIndex, this.message);
        } else if (this.playerIndex == 2) {
            game.chatSystem.addSystemMessage(this.message);
        }
    }
    

    static PlayerInfos(playerInfo1, playerInfo2) {
        let event = new MatchEvent(MatchEventTypes.PlayerInfos);
        event.playerInfo1 = playerInfo1;
        event.playerInfo2 = playerInfo2;
        return event;
    }

    sizePlayerInfos() {
        return this.playerInfo1.size + this.playerInfo2.size;
    }

    readPlayerInfos(dataReader) {
        this.playerInfo1 = new PlayerInfo();
        this.playerInfo1.read(dataReader);
        this.playerInfo2 = new PlayerInfo();
        this.playerInfo2.read(dataReader);
    };

    writePlayerInfos(dataWriter) {
        this.playerInfo1.write(dataWriter);
        this.playerInfo2.write(dataWriter);
       // console.log("writing playerinfos");
    }

    handlePlayerInfos() {
        game.playerInfos = [];
        game.playerInfos.push(this.playerInfo1);
        game.playerInfos.push(this.playerInfo2);
        game.self.playerInfo = game.playerInfos[game.selfIndex];

        if (game.playerInfos[game.selfIndex].color == game.playerInfos[1-game.selfIndex].color) {
            let color = game.colors.find(c => c.id != game.playerInfos[1-game.selfIndex].color);
            if (color) {
                game.playerInfos[1-game.selfIndex].color = color.id;
            }
        }

        if (game.shooterIndex >=0 && game.shooterIndex <= 1) {
            game.table.stick.skeleton.setAttachment("stick-default", RankType[game.playerInfos[game.shooterIndex].rank].stick);                    
        }
        game.gui.matchDisplay.refreshPlayerInfos();
    }
    

    static BallHit(force) {
        let event = new MatchEvent(MatchEventTypes.BallHit);
        event.force = force;
        return event;
    }

    sizeBallHit() {
        return 1;
    }

    readBallHit(dataReader) {
        this.force = dataReader.readUint8();
    };
    
    writeBallHit(dataWriter) {
        dataWriter.writeUint8(this.force);
    }

    handleBallHit() {
        game.soundEngine.playRandomSound("hit",1,4).setVolume(this.force);
    }    


    static WallHit(force) {
        let event = new MatchEvent(MatchEventTypes.WallHit);
        event.force = force;
        return event;
    }

    sizeWallHit() {
        return 1;
    }

    readWallHit(dataReader) {
        this.force = dataReader.readUint8();
    };
    
    writeWallHit(dataWriter) {
        dataWriter.writeUint8(this.force);
    }

    handleWallHit() {
        game.soundEngine.playRandomSound("wall",1,4).setVolume(this.force);
    } 


    static Timer(time, player) {
        let event = new MatchEvent(MatchEventTypes.Timer);
		event.time = time;
		event.player = player;
        return event;
    }

    sizeTimer() {
        return 2;
    }

    readTimer(dataReader) {
        this.time = dataReader.readUint8();
        this.player = dataReader.readUint8();
    };
    
    writeTimer(dataWriter) {
        dataWriter.writeUint8(this.time);
        dataWriter.writeUint8(this.player);
    }

    handleTimer() {
        game.gui.matchDisplay.matchDisplayScreen.setClock(this.time, this.player);
        if (game.selfIndex == game.shooterIndex && this.time == 5) {
            game.soundEngine.playSound("5sec");
            game.chatSystem.addSystemMessage("You have 5 seconds left to shoot! Hurry up!");
        }
    } 
    

    static PuckEvent() {
        let event = new MatchEvent(MatchEventTypes.PuckEvent);
        return event;
    }

    sizePuckEvent() {
        return 0;
    }

    readPuckEvent(dataReader) {
    };
    
    writePuckEvent(dataWriter) {
    }

    handlePuckEvent() {
        game.soundEngine.playSound("puck").setVolume(50);
    }
    
    static Disconnect(player1, player2) {
        let event = new MatchEvent(MatchEventTypes.Disconnect);
        event.player1 = player1;
        event.player2 = player2;
        return event;
    }

    sizeDisconnect() {
        return 10;
    }

    readDisconnect(dataReader) {
        this.player1Score = dataReader.readUint8();
        this.player1Fouls = dataReader.readUint8();
        this.player1MaxTrickshot = dataReader.readUint8();
        this.player1MaxStreak = dataReader.readUint8();
        this.player1Accuracy = dataReader.readUint8();
        
        this.player2Score = dataReader.readUint8();
        this.player2Fouls = dataReader.readUint8();
        this.player2MaxTrickshot = dataReader.readUint8();
        this.player2MaxStreak = dataReader.readUint8();
        this.player2Accuracy = dataReader.readUint8();        
    };
    
    writeDisconnect(dataWriter) {
        dataWriter.writeUint8(this.player1.score);
        dataWriter.writeUint8(this.player1.fouls);
        dataWriter.writeUint8(this.player1.maxTrickshot);
        dataWriter.writeUint8(this.player1.maxStreak);
        dataWriter.writeUint8(this.player1.shots ? Math.round((this.player1.shotsScored/this.player1.shots)*100) : 0);
        
        dataWriter.writeUint8(this.player2.score);
        dataWriter.writeUint8(this.player2.fouls);
        dataWriter.writeUint8(this.player2.maxTrickshot);
        dataWriter.writeUint8(this.player2.maxStreak);
        dataWriter.writeUint8(this.player2.shots ? Math.round((this.player2.shotsScored/this.player2.shots)*100) : 0);
	}
	
    handleDisconnect() {
        game.playerStates[0].score = this.player1Score;
        game.playerStates[0].fouls = this.player1Fouls;
        game.playerStates[0].maxTrickshot = this.player1MaxTrickshot;
        game.playerStates[0].maxStreak = this.player1MaxStreak;
        game.playerStates[0].accuracy = this.player1Accuracy;
        
        game.playerStates[1].score = this.player2Score;
        game.playerStates[1].fouls = this.player2Fouls;
        game.playerStates[1].maxTrickshot = this.player2MaxTrickshot;
        game.playerStates[1].maxStreak = this.player2MaxStreak;
        game.playerStates[1].accuracy = this.player2Accuracy;

        game.chatSystem.addSystemMessage(game.playerInfos[1-game.selfIndex].userName + " has left the game.");
        game.gui.matchDisplay.opponentDisconnected(); 
    };    
}


var fromRGB = function(r, g, b) {
	return "rgb(" + r + "," + g + "," + b + ")";
};

var fromRGBA = function(r, g, b, a) {
	return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

var MatchStates = {
	waiting: 0, 
	idle: 1,
	end: 2,
	shooting: 3,
	penalty: 4,
	puckPenalty: 5,
	aim: 6,
	simulation: 7
};

class game_core {
	constructor(game_instance) {
		game = this;
		this.instance = game_instance;
		this.server = this.instance !== undefined;
		this.players = [];
		this.border = [];

		this.projectiles = [];
		this.collectibles = [];
		this.events = [];
		this.eventTypes = [];
		this.collectibleTypes = [];

		if (!this.server) {
			this.pixiContainer = new PIXI.Container();
			this.stage = new PIXI.Container();
			this.pixiContainer.addChild(this.stage);	
        }
        
		this.registerEvent(MatchEvent);
        //	this.initBorders();
	}

	registerEvent(EventClass) {
		this.eventTypes.push(EventClass);
		EventClass.type = this.eventTypes.length - 1;
	}

	registerCollectible(CollectibleClass) {
		this.collectibleTypes.push(CollectibleClass);
		return this.collectibleTypes.length - 1;
	}

	create_physics_simulation() {
		setInterval(function () {
			this.update_physics();
		}.bind(this), this.server ? Config.serverFrameTime : Config.clientFrameTime);
	}

	remove_player(clientId) {
		if (this.server) {
			var player = this.get_player_by_user(clientId);
			if (player && player.body) {
				this.removeAllBody(player);
			}
		}
		this.players = this.players.filter(p => p.clientId != clientId);
	}
    
	get_player_by_user(clientId) {
		return this.players.find(p => p.clientId == clientId);
	}

	get_player(id, includeDisconnected) {
		if (!id) {
			return;
		}
		var player = this.players.find(p => p.id == id);
		if (includeDisconnected && !player) {
			player = this.disconnectedPlayers.find(p => p.id == id);
		}
		return player;
    }
}


class AssetManager {
	constructor(assetsToLoad, soundEngine) {
        this.assetsToLoad = assetsToLoad;
        this.loadedCount = 0;
        this.images =[];
        this.texts = [];
        this.textures = [];
        this.spritesheets = [];
        this.animations = [];
        this.totalCount = assetsToLoad.texts.length +
                          assetsToLoad.images.length +
                          assetsToLoad.spritesheets.length * 2 +
                          assetsToLoad.animations.length * 3+
                          assetsToLoad.sounds.length;
        this.completedCount = 0;
        this.materialsLoaded = 0;
        this.soundEngine = soundEngine;
	}

 

    preloadAssets(onFinished) {
		this.onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		this.onError = function ( xhr ) {
            console.error( "Error during preload!" );
        };
        this.onFinished = onFinished;
        this.preloadTexts();
      //  this.preloadImages();

        this.preloadPIXI();

        this.preloadSounds();
        if (this.completedCount == this.totalCount) {
            this.onFinished();
        }
    }

    preloadPIXI() {
        this.assetsToLoad.spritesheets.forEach(spritesheet => {
            PIXI.loader
            .add(spritesheet.name, 'assets/textures/'+spritesheet.name+'.json')
            this.spritesheets.push({name:spritesheet.name})
        })
        
        this.assetsToLoad.animations.forEach(animation => {
            PIXI.loader
            .add(animation.name, 'assets/animations/'+animation.name+'.json')
            this.animations.push({name:animation.name})
        })

        PIXI.loader.onLoad.add((loader, resource) => {
            this.assetLoaded();
        });
        PIXI.loader.load();
    }

    preloadTexts() {
        this.assetsToLoad.texts.forEach(text => {
        	var request = new XMLHttpRequest();
			request.onreadystatechange =() => {
				if (request.readyState == XMLHttpRequest.DONE) {
					if (request.status >= 200 && request.status < 300) {
                        this.texts.push({name: text.name, text: request.responseText});
                        this.assetLoaded();
					}
					else {
						_this.errors[path] = "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText;
						if (error)
							error(path, "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText);
					}
				}
			};
			request.open("GET", text.path, true);
			request.send();
        });        
    }

    preloadSounds() {
        this.assetsToLoad.sounds.forEach(s => {
            this.soundEngine.addSound(s.name, s.path);
        })
        this.soundEngine.preloadSounds(this.assetLoaded.bind(this));
    }

    assetLoaded() {
        ++this.completedCount;
        
		//var progress= Math.round((this.completedCount / this.totalCount) * 100);
   		//document.getElementById("preloadProgress").innerHTML = progress + "%"; 
        if (this.completedCount == this.totalCount) {
            this.onFinished();
        }
    }

	getImage(name) {
		for (let asset of this.images) {
			if (asset.name == name) {
				return asset.image;
			}
		}
		return ;
	}

    getText(name) {
		for (let asset of this.texts) {
			if (asset.name == name) {
				return asset.text;
			}
		}
		return null;
    }

    getTexture(name) {
		for (let asset of this.textures) {
			if (asset.name == name) {
				return asset.texture;
			}
		}
		return null;
    }

    getAnimation(name) {
		for (let asset of this.animations) {
			if (asset.name == name) {
				return asset.animation;
			}
		}
		return null;
    }
}

class Camera {
	constructor (player, viewport) {
		this.player = player;
		this.viewport = viewport;

		this.offset = new Coord(0, 0);
		this.smoothing = 10;
		this.smoothingEnabled = true;

		this.jumpX = 0;
		this.jumpY = 0;

		currentZoom = this.scale = 1;
		this.targetScale = this.prevTargetScale = this.scale;
		this.fullZoomOut = true;

		this.windowInModel = {};

/*		viewport.addEventListener("wheel", (event) => {
			var newScale = this.prevTargetScale * (Math.pow(0.9, event.deltaY / 100));
			this.prevTargetScale = this.targetScale;
			this.targetScale = newScale;
		});
*/
		this.windowInModel.leftBottom = this.screenToModel(new Coord (0, 0));
		this.windowInModel.rightTop = this.screenToModel(new Coord (0, 0));
	}

	updateZoom() {
		let q = Math.max(this.viewport.width, this.viewport.height) / 1200; 
		this.targetScale = 0.8 - this.player.velocity / 80;	
		// this.targetScale *= q;

		this.targetScale = Math.max(this.targetScale, Config.minZoom);
		this.targetScale = Math.min(this.targetScale, Config.maxZoom);			
		this.targetScale *= 0.6;
	}

	windowResized() {
		this.updateZoom();
	}

	setScale(newScale) {
		// newScale = Math.round(newScale * 512) / 512;
		var c = new Coord (this.viewport.width / 2, this.viewport.height / 2);
	
		var newOffsetX = - newScale * (c.x - this.offset.x) / this.scale + c.x;
		var newOffsetY = - newScale * (c.y - this.offset.y) / this.scale + c.y;
		
		this.scale = newScale;
		if (this.scale != currentZoom) {
			this.lastZoom = Date.now();
		}
		currentZoom = this.scale;
		
		this.offset = new Coord(newOffsetX, newOffsetY);
	}

	update() {
		this.updateZoom();

		if (Math.abs(this.scale - this.targetScale) > 0.01) {
			this.setScale(lerp(this.scale, this.targetScale, Config.clientFrameTime * 0.001));
		}

	/*	var targ = this.getTargetTranslation(window.innerWidth, window.innerHeight);

		this.offset = this.offset.lerp(targ, Config.clientFrameTime * 0.004 / this.scale);
		// this.offset.x = Math.round(this.offset.x);
		// this.offset.y = Math.round(this.offset.y);

		this.windowInModel.leftBottom = this.screenToModel(new Coord (0,0));
		this.windowInModel.rightTop = this.screenToModel(new Coord (window.innerWidth, window.innerHeight));*/
	}

	jump() {
		var smoothingSaved = this.smoothingEnabled;
		this.smoothingEnabled = false;
		this.update();
		this.smoothingEnabled = smoothingSaved;
	}

	screenToModel(coord) {
		return coord.sub(this.offset).mul_scalar(1/this.scale);
	}

	modelToScreen(coord) {
		return coord.mul_scalar(this.scale).add(this.offset);
	}
/*
	isRectVisible(x, y, width, height) {
		return (
			x * this.scale + this.offset.x <= this.viewport.width &&
			(x + width) * this.scale + this.offset.x >= 0 &&
			y * this.scale + this.offset.y <= this.viewport.height &&
			(y + height) * this.scale + this.offset.y >= 0
		);
	}

	getTargetTranslation(windowWidth, windowHeight) {
		let target = this.getTarget();
		return new Coord(
			windowWidth/2 / this.scale - target.x,
			windowHeight/2 / this.scale - target.y
		).mul_scalar(this.scale);
	}

	getTarget() {
		if (this.player.velocity) {
			let a = this.player.localState.angle;
			let offset = this.player.velocity * 0.3;
			let x = this.player.getPosX() + Math.cos(a) * offset; 
			let y = this.player.getPosY() + Math.sin(a) * offset; 
			return new Coord(x, y);			
		} else {
			return new Coord(this.player.getPosX(), this.player.getPosY());
		}
	}
*/
	setTransformation() {
	/*	game.stage.position.set(this.offset.x, this.offset.y);
		game.stage.scale.set(this.scale, this.scale);*/
	}
}

class ChatSystem {
	constructor() {
        this.chatContainer = document.getElementById("chatcontainer");
        this.chatInput = document.getElementById("chatinput");
        this.chatInputContainer = document.getElementById("chatinputcontainer");
        this.chatEnter = document.getElementById("chatenter");
        this.chatMessages = document.getElementById("chatmessages");
        this.enabled = false;
        this.shown = false;

        document.getElementById("chatinputform").addEventListener("submit", (e) => {
            e.preventDefault();
           this.storeChatMessage();
            return false;
        });

        this.chatEnter.addEventListener("click", (e) => {
            this.enableChat()
            return false;
        });

        this.messages = [];
	}

    show() {
        this.chatContainer.style.display = "flex";
        this.shown = true;
    }

    hide() {
        this.chatContainer.style.display = "none";
        this.shown = false;
    }

	disableChat() {
		this.chatInput.blur();
		this.chatInputContainer.style.display = 'none';
		this.chatEnter.style.display = 'flex';
        this.chatMessages.style.backgroundColor= "rgba(6,22,26,0)";
        this.chatMessages.style.overflowY = "hidden";
        this.chatMessages.style.pointerEvents ="none";
        this.enabled = false;
	}

	enableChat() {
		if (game.lastSentMessage && Date.now() - game.lastSentMessage < 1000) {
			return;
		}
		
		this.chatEnter.style.display = 'none';
        this.chatInputContainer.style.display = 'flex';
		this.chatInput.focus();

        this.chatMessages.style.overflowY = "auto";
        this.chatMessages.style.backgroundColor= "rgba(6,22,26,0.5)";
        this.chatMessages.style.pointerEvents ="visible";

        this.enabled = true;
	}	
    
    toggleChat() {
        if (this.enabled) {
            this.disableChat();
        } else {
            this.enableChat();
        }
    }

    storeChatMessage() {
		var message = this.chatInput.value;
		if (message !== '') {
			this.chatInput.value = '';
			if ((message !== this.lastChatMessage) && 
				(!this.lastSentMessage || Date.now() - this.lastSentMessage  > 500)) {
                    if (message[0] == '!') {
                        game.portalsocket.emit('srvcmd', message);
                    } else {
                        this.messages.push(message);
                        if (message[0] != '!' && message[0] != '\\'){
                            this.lastChatMessage = message;
                            this.lastSentMessage = Date.now();                    
                        }
                    }
            }
        }
    }

    clearChat() {
        this.chatMessages.innerHTML = "";
    }

    addSystemMessage(message) {
        var div = document.createElement('div');
        div.className = "chatmessage systemmessage";
        div.innerHTML = message;
        this.chatMessages.appendChild(div);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addAnnouncement(message) {
        var div = document.createElement('div');
        div.className = "chatmessage announcement";
        div.innerHTML = message;
        this.chatMessages.appendChild(div);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addMessage(playerIndex, message) {
        let playerInfo = game.playerInfos[playerIndex];
        let color = game.getColor(playerInfo.color).text;
        //color = "#31cfdd";
        if (this.shown) {
            if (playerIndex == game.selfIndex) {
                game.soundEngine.playSound("chat");
            } else {
                game.soundEngine.playSound("chatOther");
            }
        }

        let rankText = playerInfo.rank ? "LV"+playerInfo.rank : "";
        var div = document.createElement('div');
        div.className = "chatmessage";
        div.innerHTML = rankText+'[<span style="font-weight:bold;color:'+color+'">'+playerInfo.userName+'</span>]: '+message;
        this.chatMessages.appendChild(div);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    getMessagesLength() {
		var length = 1;
		this.messages.forEach(message => {
			length += (message.length + 1)*4;
		});
		return length;
    }

    serializeMessages(dataWriter) {
        dataWriter.writeUint8(this.messages.length);
		this.messages.forEach(message => {
            dataWriter.writeString(message);
        });
    }

    clearMessages() {
        this.messages = [];
    }
}



// KeyboardState

class KeyboardState	 {
	constructor() {
		this.keyCodes	= {};
		this.modifiers	= {};
		this.wasPressedKeys = {};
		
		var self	= this;
		this._onKeyDown	= function(event){ self._onKeyChange(event, true); };
		this._onKeyUp	= function(event){ self._onKeyChange(event, false);};

		document.addEventListener("keydown", this._onKeyDown, false);
		document.addEventListener("keyup", this._onKeyUp, false);

		KeyboardState.MODIFIERS_	= ['shift', 'ctrl', 'alt', 'meta'];
		KeyboardState.ALIAS_	= {
			'left'		: 37,
			'up'		: 38,
			'right'		: 39,
			'down'		: 40,
			'space'		: 32,
			'pageup'	: 33,
			'pagedown'	: 34,
			'tab'		: 9,
			'enter'		: 13
		};
	}

	destroy() {
		document.removeEventListener("keydown", this._onKeyDown, false);
		document.removeEventListener("keyup", this._onKeyUp, false);
	}

	_onKeyChange(event, pressed) {
		var keyCode		= event.keyCode;
		this.keyCodes[keyCode]	= pressed;
		if (pressed) {
			this.wasPressedKeys = {};
		}

		this.modifiers['shift']= event.shiftKey;
		this.modifiers['ctrl']	= event.ctrlKey;
		this.modifiers['alt']	= event.altKey;
		this.modifiers['meta']	= event.metaKey;
	}

	pressed(keyDesc) {
		var keys	= keyDesc.split("+");
		for(var i = 0; i < keys.length; i++){
			var key		= keys[i];
			var pressed;
			if( KeyboardState.MODIFIERS_.indexOf( key ) !== -1 ){
				pressed	= this.modifiers[key];
			}else if( Object.keys(KeyboardState.ALIAS_).indexOf( key ) != -1 ){
				pressed	= this.keyCodes[KeyboardState.ALIAS_[key] ];
			}else {
				pressed	= this.keyCodes[key.toUpperCase().charCodeAt(0)]
			}
			if( !pressed)	return false;
		};
		return true;
	}

	wasPressed(key) {
		if (this.pressed(key) && !this.wasPressedKeys[key]) {
			this.wasPressedKeys[key] = true;
			return true;
		}
		return false;
	}
}

var createArray2D = function(n, m) {
	let arr = new Array(n);
	for (let i = 0; i < n; i++) {
		arr[i] = new Array(m);
	}
	return arr;
}

class game_core_client extends game_core {
	constructor() {
		super();

        //Create the renderer
        this.renderer = PIXI.autoDetectRenderer({ 
			width: window.innerWidth * Config.canvasRes, 
			height: window.innerHeight * Config.canvasRes,
			antialias: true
		});

		//Add the canvas to the HTML document
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.left = 0;
        this.renderer.view.style.top = 0;
        this.renderer.backgroundColor = 0x0f404b;
        document.body.appendChild(this.renderer.view);

        //Create a container object called the `stage`
        this.stage = new PIXI.Container();

        //Tell the `renderer` to `render` the `stage`
		this.renderer.render(this.stage);
		this.viewport = this.renderer.view;
		
        this.stats = new Stats();
        document.getElementById("controls-container").appendChild(this.stats.domElement);

		this.disconnectedPlayers = [];
		this.keyboard = new KeyboardState();
		this.client_create_configuration();
		//A list of recent server updates we interpolate across
		//This is the buffer that is the driving factor for our networking
		this.client_logged_in = false;
		this.client_connect_to_portal();
		this.client_create_ping_timer();
		this.preloadCompleted = false;
		this.client_typing = false;

		this.leaderboard=[];
		this.maxLeaderboardNum = 10;

		this.showDebug = false;
		this.showChat = false;

        this.gui = new GUI (this);
        this.chatSystem = new ChatSystem();
		this.showIds = false;
		this.items = [];
		this.uploads = [];

		this.adplayer = 0;
		setInterval(() => this.client_handle_input(), Config.clientInputRate);

		this.initAds();
	}

	windowResized() {
		this.viewport.width = window.innerWidth * Config.canvasRes;
        this.viewport.height = window.innerHeight * Config.canvasRes;
		
		let w = this.viewport.width;
		let h = this.viewport.height;
		this.renderer.resize(w, h);

		this.stage.position.set(w / 2, h / 2);
	}

    initListeners() {

        if (!window.googleScript) {
            var head= document.getElementsByTagName('head')[0];
            window.googleScript = document.createElement("script");
            window.googleScript.type = "text/javascript";
            window.googleScript.async = true;
            window.googleScript.defer = true;
            window.googleScript.src = "https://apis.google.com/js/platform.js";
            window.googleScript.addEventListener("load", () => { onLoadGAPI(); });
            head.appendChild(window.googleScript);
        } 
        
        $(".hoverimg").hover(function(){
                $('#'+this.id).attr('src','assets/'+this.alt+'.svg');
            }, function(){
                $('#'+this.id).attr('src','assets/'+this.alt+'-roll.svg');
        });

        $(".btn").hover(function(){
                $('#'+this.id).removeClass("btnnormal");
                $('#'+this.id).addClass("btnhover");
            }, function(){
                $('#'+this.id).removeClass("btnhover");
                $('#'+this.id).addClass("btnnormal");
        });


        var checkSize = function () {
            if (window.innerHeight < 490 || window.innerWidth < 320) {
//                $("#adcontainer").hide();
            }
        };
    
        checkSize();
    
        window.addEventListener("resize", () => {
			this.windowResized();
			checkSize();
  //          this.camera.windowResized();
        });
        document.getElementById("loginscreen").addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.portalsocket && this.portalsocket.connected) {
                this.client_enterAttempt();
            }
            return false;
        });
    
        document.getElementById("serverlist").addEventListener("change", (e) => {
           // this.client_connect_to_server();
            document.getElementById('login_name').focus();
            return false;
        });
        
   
        document.getElementById("fbBtn").addEventListener("click", (e) => {
            handleFBLogin();
            return false;
        });
    
        document.getElementById("googleBtn").addEventListener("click", (e) => {
            handleGoogleLogin();
            return false;
        });
        
        document.getElementById("logoutBtn").addEventListener("click", (e) => {
            logout();
            return false;
        });

        document.getElementById("rematch").addEventListener("click", (e) => {
            this.requestRematch();
            this.gui.matchDisplay.rematchRequested();
            return false;
        });
        
        document.getElementById("newmatch").addEventListener("click", (e) => {
            this.requestNewMatch();
            this.gui.matchDisplay.searchMatch();
            return false;
        });

        document.getElementById("playgame").addEventListener("click", (e) => {
            this.gui.selectPlayGame();
            return false;
        });

        document.getElementById("invite").addEventListener("click", (e) => {
            this.gui.selectInvite();
            return false;
        });

        document.getElementById("allstars").addEventListener("click", (e) => {
            this.gui.selectAllStars();
            return false;
        });

        document.getElementById("invitebtn").addEventListener("click", (e) => {
            this.getInviteLink();
            return false;
        });

        document.getElementById("copybtn").addEventListener("click", function() {
            copyToClipboardMsg(document.getElementById("invitelink"), "copymsg");
            return false
        });
    }

    initColors() {
        this.colors = [];
        this.items.forEach(item => {
            if (item.type == "color") {
                this.colors.push(item);
            }
        });
    }

    getColor(id) {
        return this.colors.find(c => c.id == id);
    }

    initAvatars() {
        this.avatars = [];
        this.items.forEach(item => {
            if (item.type == "avatar") {
                let avatar = item;
                avatar.fileName = "avatar"+ item.id + ".png";
                this.avatars.push(item);
            }
        });
    }

    getAvatar(id) {
        return this.avatars.find(a => a.id == id);
    }
    
    initGame() {
		this.self = new Player(this);
		this.camera = new Camera(this.self, this.viewport);

        this.initListeners();
        this.initPIXIResources();
        this.initColors();
        this.initAvatars();

		this.mouse = new MouseHandler(game);
		
        this.windowResized();
        
        this.customizer = new Customizer();

        //this.client_connect_to_server();
		this.create_physics_simulation();
        
        
		this.table = new Table();
        this.table.init(this.stage);
        this.table.stickShootingBG.interactive = true;
        this.table.stickShootingBG.on('pointerdown', (event) => {
            this.touchShoot = true;
        });
        this.table.stickShootingBG.on('pointerup', (event) => {
            this.touchShoot = false;
        });
        this.menuBG = new PIXI.Container();
        this.menuBGPic = new PIXI.Sprite(game.assetManager.getTexture("bg_pockey.png"));
        this.menuBG.position.set(-960,-540);
        this.menuBG.alpha = 0;
        this.menuBG.visible = false;
        this.menuBG.addChild(this.menuBGPic);

        this.menuBGCue = new PIXI.Sprite(game.assetManager.getTexture("menu_sprite-cue.png"));
        this.menuBGCue.position.set(0,800);
        this.menuBG.addChild(this.menuBGCue);

        this.menuBGBall;
        if (Math.random() < 0.5) {
            this.menuBGBall = new PIXI.Sprite(game.assetManager.getTexture("menu_sprite-e.png"));
        } else {
            this.menuBGBall = new PIXI.Sprite(game.assetManager.getTexture("menu_sprite-sevn.png"));
        }
        this.menuBGBall.position.set(1400,600);
        this.menuBG.addChild(this.menuBGBall);

        this.stage.addChild(this.menuBG);
        
        this.inited = true;
        window.requestAnimationFrame(this.renderFrame.bind(this));

        this.initTop10List();
        this.initHpBars();
        this.initScoreBars();
        this.inviteId = GetURLParameter('i');
    }

    initPIXIResources() {
        var resources = PIXI.loader.resources;
        this.assetManager.spritesheets.forEach(spritesheet => {
            for (let texture in resources[spritesheet.name].textures) {
                this.assetManager.textures.push({name: texture, texture: resources[spritesheet.name].textures[texture]})
            }
        });

        this.assetManager.animations.forEach(animation => {
            animation.animation = resources[animation.name].spineData;
        });
    }

    requestRematch() {
        this.socket.emit("requestrematch");
    }

    requestNewMatch() {
        if (this.socket.connected)
            this.socket.disconnect();
        delete this.socket;
        this.players = [];
        this.portalsocket.emit("requestnewmatch");
    }

    /*   
    initEffects() {

        this.animSpriteManager = new AnimatedSpriteManager(this);

        var effects = [];
        this.assetManager.texts.forEach(file => {
            if (file.name.startsWith('effects') && file.name.endsWith('json')) {
                let data = JSON.parse(file.text);
                for (let path in data.frames) {
                    let parts = path.split('/');
                    let frame = data.frames[path];
                    let name = parts[0];
                    frame.index = parts[1].substring(name.length + 1, name.length + 1 + 2);
                    var effect = effects.find(e => e.name == name);
                    if (!effect) {
                        effect = {};
                        effect.frames = [];
                        effect.texture = this.assetManager.getTexture(file.name.replace('json', 'png'));
                        effect.width = frame.frame.w;
                        effect.height = frame.frame.h;
                        effect.name = name;
                        effects.push(effect);
                    }
                    frame.uvX0 = frame.frame.x/2048.0;
                    frame.uvY0 = frame.frame.y/2048.0;
                    frame.uvX1 = (frame.frame.x+effect.width)/2048.0;
                    frame.uvY1 = (frame.frame.y+effect.height)/2048.0;
                    effect.frames.push(frame);
                }
                //this.effects[name].push({ frame: data.frames[path], index: index, path: path });
            }            
        });

        effects.forEach(effect =>{
            this.animSpriteManager.addSprite(effect);
        });
    }
  */
	renderFrame() {
		var time = Date.now();
		// Recommendation from Opera devs: calling the RAF shim at the beginning of your
		// render loop improves framerate on browsers that fall back to setTimeout

		if(this.stats) { this.stats.begin(); }
			this.renderer.render(this.stage);
				
		if(this.stats) { this.stats.end(); }
		window.requestAnimationFrame(this.renderFrame.bind(this));
	}

	showAd() {
		if (window.innerHeight < 490 || window.innerWidth < 320) {
			return;
		}
//		$("#adcontainer" ).fadeIn( "slow");		
	}

	interpolateObject(obj) {
		if (obj.jumped || obj.hiddenPrev) {
			obj.jumped = false;
			obj.x = obj.targetX;
			obj.y = obj.targetY;
			if (obj.targetAngle) {
				obj.angle = obj.targetAngle;
			}
			return;
		}
		
		let dx = obj.targetX - obj.x;
		let dy = obj.targetY - obj.y;
		if (Math.abs(dx) > world.width / 2) {
			obj.x += dx;
		}
		if (Math.abs(dy) > world.height / 2) {
			obj.y += dy;
		}
		
		if (Math.abs(dx) > 0.1) {
			obj.x = lerp(obj.x, obj.targetX, Config.interpolationRate);
		}
		if (Math.abs(dy) > 0.1) {
			obj.y = lerp(obj.y, obj.targetY, Config.interpolationRate);
		}
		if (obj.targetAngle) {
			obj.angle = lerp(obj.angle, obj.targetAngle, Config.interpolationRate);
		}
	}

	update_physics() {
		this.mouse.update();
        this.camera.setTransformation();
        
/*  
        this.players.forEach(obj => obj.updateClient(delta));
        if (this.animSpriteManager) {
            this.animSpriteManager.update(delta);
        }
*/

		this.table.update();

		if (this.camera && this.viewport) {
			this.camera.update();
        }

        this.updateClient();
    }
    
    updateClient() {
        if (this.menuFading) {
           if (this.menuBG.alpha >= 1.0) {
               this.menuBG.alpha = 1.0;
            } else {
                this.menuBG.alpha += 0.005;
           }
        } 
    }

	initAipPreroll() {
		if(typeof aipPlayer != "undefined") {
			this.adplayer = new aipPlayer({
				AD_WIDTH: 960,
				AD_HEIGHT: 540,
				AD_FULLSCREEN: false,
				AD_CENTERPLAYER: false,
				LOADING_TEXT: 'loading advertisement',
				PREROLL_ELEM: document.getElementById('mainAdContainer'),
				AIP_COMPLETE: () =>  {
					/*******************
					 ***** WARNING *****
					 *******************
					 Please do not remove the PREROLL_ELEM
					 from the page, it will be hidden automaticly.
					 If you do want to remove it use the AIP_REMOVE callback below
					*/
					this.prerolling = false;
				},
				AIP_REMOVE: function ()  {
					// Here it's save to remove the PREROLL_ELEM from the page
					// But it's not necessary
				}
			});
		} else {
			// Failed to load the adslib ads are probably blocked
			// don't call the startPreRoll function.
			// it will result in an error.
		}
	}

	initAds() {
		getScript('https://api.adinplay.com/display/pub/PCK/pockey.io/display.min.js', this.initAipPreroll.bind(this));
	}


	client_loginAttempt() {
		if (this.client_logged_in || !googleAuth2)
			return;

		if (this.portalsocket && this.portalsocket.connected) {
			var loginType = readCookie("logintype");
			if (!loginType || loginType == "") {
				game.refreshLoginScreen();
				return;
			} else if (loginType == "fb") {
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						var fbToken = response.authResponse.accessToken;
						var loginData = {
							fbToken: fbToken
						};

						FB.api('/me', { locale: 'en_US', fields: 'name, email' },
							function(response2) {
								loginData.name = response2.name;
								loginData.email = response2.email;
								this.portalsocket.emit("loginAttempt", loginData);
							}.bind(this)
						);
					} else {
						eraseCookie("logintype");
						game.refreshLoginScreen();
					}
				}.bind(this));
			} else if (loginType == "google") {
				if (googleAuth2.isSignedIn.get()) {
					var googleUser = googleAuth2.currentUser.get();
					var email = googleUser.getBasicProfile().getEmail();
					var loginData = {
						googleToken: googleUser.getAuthResponse().id_token,
						email: googleUser.getBasicProfile().getEmail(),
						name: googleUser.getBasicProfile().getName() 
					};
					this.portalsocket.emit("loginAttempt", loginData);
				} else {
					eraseCookie("logintype");
					game.refreshLoginScreen();
				}
			}
		}
	}

	client_loginSuccess(data) {
		document.getElementById("login_name").value = data.playerInfo.userName;
        this.self.playerInfo = PlayerInfo.fromData(data.playerInfo);
        this.inventory = data.inventory;
        this.customizer.playerInfoUpdated();        
        this.refreshLoginScreen();
        this.refreshStats();
        this.initTop10List();                
	}

	client_logout() {
		delete this.sessionId;
		if (this.portalsocket && this.portalsocket.connected) {
			this.portalsocket.emit("logout");
		}
	}

	client_logoutFinished() {
        if (this.socket) {
			if (this.socket.connected)
				this.socket.disconnect();
			delete this.socket;
			this.players = [];
        }
        this.client_logged_in = false;
		eraseCookie("logintype");
		document.getElementById("login_name").value = '';
		this.refreshLoginScreen();
        this.self.playerInfo = new PlayerInfo();
        this.inventory = this.guestInventory;
        this.customizer.playerInfoUpdated();
        this.initTop10List();
	}

	client_loginFailed() {
		eraseCookie("logintype");
		this.refreshLoginScreen();
	}

	client_alert(message) {
		window.alert(message);
	}

	client_enterAttempt() {
		var userName = document.getElementById("login_name").value.trim();
		if (this.client_logged_in)
			return;

		//temporary hack :(((
		if (this.keyboard.wasPressed('enter'))
			this.keyboard.wasPressedKeys[13] = false;

        let data = {
            userName: userName,
            color: game.self.playerInfo.color,
            avatar: game.self.playerInfo.avatar
        }
        if (this.inviteId) {
            data.inviteId = this.inviteId;
        }
		if (this.portalsocket && this.portalsocket.connected)
			this.portalsocket.emit("enterAttempt", data);
    }
    

	client_enterSuccess(data) {
        this.menuBG.visible = false;
        this.table.show();
		this.client_logged_in = true;

		this.gui.hideMainAll();
        this.gui.showMatchDisplay();
		
		// soundManager.fadeTo('music', 3500, 0, function () { soundManager.stop('music'); soundManager.setVolume('music', 100); });
        this.camera.player = this.self;
        this.self.playerInfo = PlayerInfo.fromData(data.playerInfo);
        
		this.sessionId = data.sessionId;
        
		//this.self.spawn();
		this.camera.jump();
        this.ambientSound = this.soundEngine.loopSound("ambient");
        this.ambientSound.setVolume(50);
        createCookie("userName", document.getElementById("login_name").value);
        if (window.mobileAndTabletcheck()) {
			document.getElementById("gui").style.display = "none";

			let scale = this.viewport.width / 1022;
			document.getElementById("matchdisplayscreen").style.margin = 0;
			document.getElementById("matchdisplayscreen").style.transformOrigin = "top";
			document.getElementById("matchdisplayscreen").style.transform = "scale(" + scale + "," + scale + ")";
			// document.getElementById("matchdisplayscreen").style.width = this.viewport.width + "px";
			// document.getElementById("matchdisplayscreen").style.height *= this.viewport.width / 1000 + "px";
			// document.getElementById("gui").style.display = "none";
		} else {
            this.chatSystem.show();            
            this.chatSystem.clearChat();
            this.chatSystem.addSystemMessage("Welcome to Pockey.io!");
            if (data.inviteId){
                delete this.inviteId;
                this.chatSystem.addSystemMessage("Waiting for invite");
                this.gui.matchDisplay.setStateText("Waiting for invite");
            } else {
                this.chatSystem.addSystemMessage("Searching for opponent");
            }
		}
        this.startSearchAnimation();
	}
	
    startSearchAnimation() {
        document.getElementById("searching").style.display = "flex";
        if (!this.searchTo) {
            this.searchTo = TweenMax.staggerFrom(".search",2,{x:0,backgroundColor:'#36edc9',opacity:0,scale:0.2,repeat:-1,ease:SlowMo.ease.config(0.5,0.4,true)},0.4);
        } else {
            this.searchTo.forEach(t => t.resume());
        }

        if (!this.searchFrom) {
            this.searchFrom = TweenMax.staggerTo(".search",2,{x:310,backgroundColor:'#43f9f3',repeat:-1,ease:SlowMo.ease.config(0.5,0.4,false)},0.4);
        } else {
            this.searchFrom.forEach(t => t.resume());
        }
    }

    stopSearchAnimation() {
        this.searchFrom.forEach(t => t.pause());
        this.searchTo.forEach(t => t.pause());
//        TweenMax.killTweensOf(this.searchIcons);
        document.getElementById("searching").style.display = "none";
    }

    refreshStats() {
        if (this.self.playerInfo && this.self.playerInfo.rank) {
            document.getElementById("winstatval").innerHTML = this.self.playerInfo.wins;
            document.getElementById("lossstatval").innerHTML = this.self.playerInfo.losses;
            document.getElementById("streakstatval").innerHTML = this.self.playerInfo.maxWinStreak;
            document.getElementById("foulstattval").innerHTML = this.self.playerInfo.fouls;
        }
    }

	refreshLoginScreen(){
        var loginContainer = document.getElementById("logincontainer");
		var loadingContainer = document.getElementById("loadingcontainer");
        var statsContainer = document.getElementById("playerstatcontainer");
		var loginButton = document.getElementById("login"); 
		var logoutButton = document.getElementById("logoutBtn");
		var googleButton = document.getElementById("googleBtn");
		var fbButton = document.getElementById("fbBtn");
	//document.getElementById("loginscreen").style.display = 'flex';
	//document.getElementById("login_name").focus();
        game.gui.matchDisplay.hide();
    
		if (!this.preloadCompleted) {
            loginContainer.style.display = "none";
            loadingContainer.style.display = "flex";
 		} else if (!this.portalsocket || !this.portalsocket.connected) {
            game.gui.hideMainAll();
            game.menuBG.visible = false;
            game.table.showPanic();
		} else {

		//	loginContainer.style.display = "inline-block";

			loginButton.disabled = false;

			logoutButton.style.display = "none";
			googleButton.style.display = "none";
			fbButton.style.display = "none";
			
			var loginType = readCookie("logintype");
			 if (!loginType || loginType == "") {
			 		logoutButton.style.display = "none";
			 		googleButton.style.display = "flex";
                    fbButton.style.display = "flex"
                    statsContainer.style.display = "none";
			} else if (loginType == "google") {
				if (googleAuth2 && googleAuth2.isSignedIn.get()) {
			 		logoutButton.style.display = "flex"
			 		googleButton.style.display = "none"
			 		fbButton.style.display = "none"
                    statsContainer.style.display = "flex";
			} else {
			 		logoutButton.style.display = "none"
			 		googleButton.style.display = "flex"
			 		fbButton.style.display = "flex";
                    statsContainer.style.display = "none";
				}
			} else if (loginType == "fb") {
			 	FB.getLoginStatus(function(response) {
			 		if (response.status == 'connected') {
			 			logoutButton.style.display = "flex";
			 			googleButton.style.display = "none";
			 			fbButton.style.display = "none";
                        statsContainer.style.display = "flex";
			 		} else {
			 			logoutButton.style.display = "none";
			 			googleButton.style.display = "flex";
			 			fbButton.style.display = "flex";
	                    statsContainer.style.display = "none";
		 		}
			 	});
            }
         //   loginContainer.style.display = "flex";
            $('#logo-svg').fadeOut(500, () => {
                loadingContainer.style.display = "none";
                $("#main" ).fadeIn( "slow", () => {
                    loginButton.style.pointerEvents = "visible";
                });
                $("#leftmenu").fadeIn("slow");
                $("#privacycontainer" ).fadeIn( "slow");
                if (!readCookie("cookiesAccepted")) {
                    $("#kuki" ).fadeIn( "slow");
                }
                if (!game.menuBG.visible) {
                    game.menuBG.visible = true;
                    game.menuBG.alpha = 0;
                    game.menuFading = true;
                    game.table.hide();
                }
            });
		}
	}

	processMouseInput(player, input) {
		var minDist = Config.mouseControlMinDist;
		var maxDist = Config.mouseControlMaxDist;
		var dir = input.sub(player.localState.pos);
		var dist = dir.length();
		if (dist <= minDist) {
			dir = new Coord(0,0);
		} else if (dist >= maxDist) {
			dir = dir.normal();
		} else {
		 	dir = dir.normal().mul_scalar((dist - minDist) / (maxDist - minDist));
		}

		return dir;
	}


	client_handle_input() {
		if (!this.client_logged_in) {
			return;
		}

		let chatMessageToSend = 0;
		let input = {};
		if (!this.client_typing) {
			if (this.keyboard.wasPressed('U')) {
				this.showDebug = !this.showDebug;
			}

			if (this.mouse.mouseDown || this.touchShoot) {
				input.shot = true;
			}
        }
 
        if (this.keyboard.wasPressed('enter')) {
            this.chatSystem.toggleChat();
        }

		let length = 1 + this.chatSystem.getMessagesLength(); 

		let mouse = this.mouse.getData();
		if (this.table.state == MatchStates.aim && this.shooter && mouse && !this.shotEnd) {
			if (input.shot && !this.prevInput.shot) {
                this.table.shotStart(mouse.pos);
			} else if (input.shot && this.prevInput.shot) {
				this.table.moveStick(mouse.pos, this.touchShoot);
			} else if (!input.shot && this.prevInput.shot && this.table.stickOffset) {
				this.shotEnd = true;
			} else {
				this.table.aim(mouse.pos);
			}		
		}

		length += 4 * 2;
		if (mouse) {
			input.mx = mouse.pos.x;
			input.my = mouse.pos.y;
			length += 4;
		}

        let arrayBuffer = new ArrayBuffer(length); 
		let dataWriter = new DataWriter(arrayBuffer);

		dataWriter.writeFlags([
			mouse ? 1 : 0,
			input.shot,
			this.keyboard.wasPressed('K'),
			this.shotEnd
		]);
		if (mouse) {
			dataWriter.writeInt16(input.mx);
			dataWriter.writeInt16(input.my);		
		}
		dataWriter.writeFloat32(this.table.stickAngle);
		dataWriter.writeFloat32(this.table.stickOffset);

		this.mouse.resetWheel();

		this.chatSystem.serializeMessages(dataWriter);

		if (this.socket && this.socket.connected && 
			(!this.prevInput ||
			 this.keyboard.wasPressed('K') ||
			 this.prevInput.shot != input.shot ||
			 this.prevInput.mx != input.mx ||
			 this.prevInput.my != input.my ||			 
             this.chatSystem.messages.length > 0))
		{
			this.prevInput = input;
			this.socket.emit('input', arrayBuffer);
		}

        this.chatSystem.clearMessages();
	}

	client_process_net_updates() {
		if (!this.server_updates)
			return;
/*
		let target = this.server_updates;
		target.playerStates.forEach((v, i) => {
			let player = target.playerStates[i].player;
			if (!player)
				return;

			let state = target.playerStates[i];
			let targetState = target.playerStates[i].state;

			if (target.playerStates[i].jumped || player.jumped || player.hiddenPrev) {
				target.playerStates[i].jumped = false;
				player.jumped = false;
				player.localState = targetState.copy();
				return;
			}
			
			let dx = targetState.pos.x - player.localState.pos.x;
			let dy = targetState.pos.y - player.localState.pos.y;
			if (Math.abs(dx) > world.width / 2) {
				player.localState.pos.x += dx;
			}
			if (Math.abs(dy) > world.height / 2) {
				player.localState.pos.y += dy;
			}
			
			player.localState = player.localState.interpolate(targetState, Config.interpolationRate);
			player.rpm = lerp(player.rpm, state.rpm, Config.interpolationRate);
		});*/
	}

	readObject(objects, type, dataReader) {
		let obj = type.read(dataReader);
		if (!obj.id || !objects.find(o => o.id == obj.id)) {
			objects.push(obj);
		}	
	}

	readObjects(objects, type, dataReader) {
		var objectNum = dataReader.readFloat32();
		for (let i = 0; i < objectNum; i++) {
			this.readObject(objects, type, dataReader);
		}	
	}

	gameStateRecieved(buffer) {
		this.collectibles = [];

		let dataReader = new DataReader(buffer);
		this.readObjects(this.collectibles, Collectible, dataReader);
    }

    readEvent(dataReader) {
		let type = dataReader.readUint32();
		let event = this.eventTypes[type].read(dataReader);
		if (!event) {
			console.log("Unknown event type received.");
		}
		event.handle();
	}

	readMultiple(dataReader, reader) {
		var num = dataReader.readFloat32();
		for (let i = 0; i < num; i++) {
			reader(dataReader);
		}	
	}

	readPlayerState(dataReader) {
	}

	client_onserverupdate_received(buffer) {
		let dataReader = new DataReader(buffer);

		let flags = dataReader.readFlags();		
		let state = dataReader.readUint8();
		if (flags[0]) {
			this.table.penaltyPos = {
				x: dataReader.readInt16(),
				y: dataReader.readInt16()
			};
		} else {
			delete this.table.penaltyPos;
		}
		this.shooter = flags[1];
		this.table.setState(state);

		if (state != MatchStates.aim) {
			this.shotEnd = false;
		}
		this.table.readStick = this.shotEnd || state != MatchStates.aim || !this.shooter;
		this.table.read(dataReader);
        this.readMultiple(dataReader, this.readEvent.bind(this));
	}

	client_create_ping_timer() {
		setInterval(function () {

			this.last_ping_time = Date.now() - this.fake_lag;
			if (this.socket && this.socket.connected)
				this.socket.send('p.' + (this.last_ping_time));

		}.bind(this), 1000);
	}

	client_create_configuration() {
		this.show_help = false;             //Whether or not to draw the help text
		this.show_server_pos = false;       //Whether or not to show the server position
		this.show_dest_pos = false;         //Whether or not to show the interpolation goal
		this.input_seq = 0;                 //When predicting client inputs, we store the last input as a sequence number
		this.client_smooth = 0.01;            //amount of smoothing to apply to client update dest
		this.ball_smooth = 25;            //amount of smoothing to apply to client update dest

		this.net_latency = 0.001;           //the latency between the client and the server (ping/2)
		this.net_ping = 0.001;              //The round trip time from here to the server,and back
		this.last_ping_time = 0.001;        //The time we last sent a ping
		this.fake_lag = 0;                //If we are simulating lag, this applies only to the input client (not others)
		this.fake_lag_time = 0;

		this.net_offset = 1;              //100 ms latency between server and client interpolation for other clients
		this.buffer_size = 2;               //The size of the server history to keep for rewinding/interpolating.
		this.target_time = 0.01;            //the time where we want to be in the server timeline
		this.oldest_tick = 0.01;            //the last time tick we have available in the buffer

		this.client_time = 0.01;            //Our local 'clock' based on server time - client interpolation(net_offset).
		this.server_time = 0.01;            //The time the server reported it was at, last we heard from it

		this.dt = 0.016;                    //The time that the last frame took to run
		this.fps = 0;                       //The current instantaneous fps (1/this.dt)
		this.fps_avg_count = 0;             //The number of samples we have taken for fps_avg
		this.fps_avg = 0;                   //The current average fps displayed in the debug UI
		this.fps_avg_acc = 0;               //The accumulation of the last avgcount fps samples

		this.lit = 0;
		this.llt = Date.now();
	}

	client_create_debug_gui() {
		this.gui = new dat.GUI();

		var _camerasettings = this.gui.addFolder('Camera');
		_camerasettings.add(this.camera, 'smoothingEnabled').listen();
		_camerasettings.add(this.camera, 'smoothing').listen();

		var _playersettings = this.gui.addFolder('Player appearance');
		_playersettings.add(Config, 'ringWidth').listen();
		_playersettings.add(Config, 'shirtSize').listen();
		_playersettings.open();

		var _othersettings = this.gui.addFolder('Network smoohing');
		_othersettings.add(this, 'client_smooth').listen();
		_othersettings.add(this, 'ball_smooth').listen();

		var _debugsettings = this.gui.addFolder('Debug view');
		_debugsettings.add(this, 'show_help').listen();
		_debugsettings.add(this, 'fps_avg').listen();
		_debugsettings.add(this, 'show_server_pos').listen();
		_debugsettings.add(this, 'show_dest_pos').listen();

		var _consettings = this.gui.addFolder('Connection');
		_consettings.add(this, 'net_latency').step(0.001).listen();
		_consettings.add(this, 'net_ping').step(0.001).listen();
		//When adding fake lag, we need to tell the server about it.
		var lag_control = _consettings.add(this, 'fake_lag').step(0.001).listen();
		lag_control.onChange(function (value) {
			if (this.socket && this.socket.connected)
				this.socket.send('l.' + value);
		}.bind(this));

		var _netsettings = this.gui.addFolder('Networking');
		_netsettings.add(this, 'net_offset').min(0.01).step(0.001).listen();
		_netsettings.add(this, 'server_time').step(0.001).listen();
		_netsettings.add(this, 'client_time').step(0.001).listen();
	}


	client_preload_files() {
		if (this.preloadCompleted) {
			this.client_preload_completed();
			return;
		}

        this.preloadTimeLine = new TimelineMax({
            repeat: -1
          });
          
        this.preloadTimeLine.add( 
            TweenMax.from(".logo-svg", 2, {
              scale: 2,
              rotation: 360,
              ease: Elastic.easeInOut
              
            })
        );
        document.getElementById("logo-svg").style.display = "flex";

        this.preloadTimeLine.add(
            TweenMax.to(".logo-svg", 2, {
              scale: 2,
              rotation: 360,
              ease: Elastic.easeInOut
              
            })
        );
          
        this.assetManager.preloadAssets(this.client_preload_completed.bind(this));
        /*		for (let i = 1; i <= this.soundPlayer.maxTrack; ++i) {
			let soundId = 'music'+i;
			let url = '\\music\\'+soundId+'.mp3';
			var mySound = soundManager.createSound({
				id: soundId,
				url: url
			});		
		}*/
	}

	client_preload_completed() {
		this.preloadCompleted = true;
		var userName = readCookie("userName");
		if (userName && userName.length) {
			document.getElementById("login_name").value = userName;
        }
        this.initGame();
        let logo = document.getElementById('logo-svg');
        TweenMax.killTweensOf(logo);
        this.searchIcons = [];
        this.searchIcons.push(document.getElementById('s1'));
        this.searchIcons.push(document.getElementById('s2'));
        this.searchIcons.push(document.getElementById('s3'));
        this.searchIcons.push(document.getElementById('s4'));
        this.searchIcons.push(document.getElementById('s5'));
        
        this.gui.selectLeftMenuItem(0);
		this.refreshLoginScreen();
	}

	client_ondisconnect(data) {
		this.self.online = false;
		this.self.alive = false;
		this.client_logged_in = false;

		//this.gui.respawnScreen.hide();
		this.refreshLoginScreen();
		this.players = [];
		if (this.socket) {
			if (this.socket.connected)
				this.socket.disconnect();
			delete this.socket;
			this.players = [];
		}		
//		document.getElementById("chatcontainer").style.display = 'none';
	}

	client_onping(data) {
		this.net_ping = Date.now() - parseFloat(data);
		this.net_latency = this.net_ping / 2;
	}

	client_onnetmessage(data) {
		var commands = data.split('.', 3);
		var command = commands[0];
		var subcommand = commands[1] || null;
		var commanddata = commands[2] || null;
		switch (command) {
			case 's': //server message
				switch (subcommand) {
					case 'e': //end game requested
						this.client_ondisconnect(commanddata); break;
					case 'p': //server ping
						this.client_onping(commanddata); break;
				} //subcommand
				break; //'s'
		} //command            
	}

	client_connect_to_portal() {
		this.portalsocket = io.connect();
		this.portalsocket.on('onConnectedPortal', this.client_onConnectedPortal.bind(this));
		this.portalsocket.on('disconnect', this.client_ondisconnect.bind(this));
        this.portalsocket.on('itemsUpdated', this.client_itemsUpdated.bind(this));
        this.portalsocket.on('globalInfoResp', this.client_globalInfoResp.bind(this));
        this.portalsocket.on('inviteResp', this.client_inviteResp.bind(this));
        this.portalsocket.on('sysMessages', this.client_sysMessages.bind(this));
        this.portalsocket.on('announcement', this.client_announcement.bind(this));
        
		
		this.portalsocket.on('loginSuccess', this.client_loginSuccess.bind(this));
		this.portalsocket.on('logoutFinished', this.client_logoutFinished.bind(this));
        this.portalsocket.on('loginFailed', this.client_loginFailed.bind(this));
        this.portalsocket.on('enterSuccess', this.client_enterSuccess.bind(this));
        this.portalsocket.on('matchStarted', this.client_matchStarted.bind(this));
        
		this.portalsocket.on('alert', this.client_alert.bind(this));

    }
    
    client_sysMessages(messages) {
        messages.forEach(m => {
            game.chatSystem.addSystemMessage(m);
        });
    }

    client_announcement(message) {
        game.chatSystem.addAnnouncement(message);
    } 

    client_connect_to_server(addr) {
		if (this.socket) {
			if (this.socket.connected)
				this.socket.disconnect();
			delete this.socket;
			this.players = [];
		}
		this.socket = io.connect("wss://"+addr, {transports:['websocket', 'polling'], httpCompression:false, perMessageDeflate:false});
		this.socket.on('connect', function () {
			this.self.state = 'connecting';
		}.bind(this));
		//this.socket.on('disconnect', this.client_ondisconnect.bind(this));
		this.socket.on('onserverupdate', this.client_onserverupdate_received.bind(this));
		this.socket.on('gamestate', this.gameStateRecieved.bind(this));
		this.socket.on('onconnected', this.client_onconnected.bind(this));
		//this.socket.on('error', this.client_ondisconnect.bind(this));
		this.socket.on('message', this.client_onnetmessage.bind(this));
		this.socket.on('alert', this.client_alert.bind(this));
	}

	client_onConnectedPortal(infos) {
        if (!document[hidden]) {
            this.client_loginAttempt();
        }

        this.soundEngine = new SoundEngine();
        this.assetManager = new AssetManager(infos.assetFiles, this.soundEngine);
        
		this.region = infos.region;
		this.country = infos.country;
		if (!infos.country) {
			this.country = "us";
		}
		this.serverInfos = infos.serverList;
	
		var serverlist = document.getElementById('serverlist');
		for(var i = serverlist.options.length - 1 ; i >= 0 ; --i)
			serverlist.remove(i);
		var selectOption = document.createElement("Option");
		selectOption.text = 'Select a server';
		selectOption.disabled = true;
		if (infos.serverList.length == 0)
			selectOption.selected = true;
		serverlist.add(selectOption);
		
		infos.serverList.forEach(serverInfo => {
			var option = document.createElement("option");
			option.text = serverInfo.name + " [" + serverInfo.players + "/" + serverInfo.maxPlayers + "]";
			option.value = serverInfo.address;
			serverlist.add(option);
			if (serverInfo.preferred) {
				option.selected = true;
			}
		});

        this.top10 = infos.top10;
        this.leaderboard = [];
        this.client_preload_files();
        
        this.items = infos.items;
        this.guestInventory = infos.guestInventory;
	}

	
	client_itemsUpdated(items) {
		this.items = items;
    }
    
    client_globalInfoResp(data) {
        if (this.globalInfoRespFunc) {
            this.globalInfoRespFunc(data);
        }
    }
    
    client_inviteResp(inviteId) {
        this.inviteId = inviteId;
        this.gui.setupInviteScreen(inviteId);
    }

    client_matchStarted(data) {
        this.startingMatchData = data;
        this.client_connect_to_server(data.address);
    }

    
	client_onconnected(data) {
		this.self.clientId = data.clientId;
		this.self.state = 'connected';
        this.self.online = true;
        if (this.startingMatchData) {
            let data = {
                matchId: this.startingMatchData.matchId,
                sessionId: this.sessionId
            }
            this.socket.emit('joinMatch', data);
            delete this.startingMatchData; 
        }
    }
    
    
	client_refresh_fps() {
		this.fps = 1 / this.dt;
		this.fps_avg_acc += this.fps;
		this.fps_avg_count++;
		//When we reach 10 frames we work out the average fps
		if (this.fps_avg_count >= 10) {
			this.fps_avg = this.fps_avg_acc / 10;
			this.fps_avg_count = 1;
			this.fps_avg_acc = this.fps;
			this.fpsText.text = this.fps_avg;
		} //reached 10 frames
	}

	updateInfoCanvas() {
		if (!this.infoCanvas) {
			return;
		}
		
		var context = this.infoCanvas.getContext('2d');
		
		context.clearRect(0,0,this.infoCanvas.width, this.infoCanvas.height);

		context.save();
		context.textBaseline="top";
		context.fillStyle = 'rgba(18,47,54,1.0)';
		context.fillText(this.net_ping + ' ms', 0, 0);
		context.fillText(this.fps.toFixed(0) + ' fps', 0, 10);
		context.restore();
	}


    createLeaderboardRow(placement, playerInfo, self, placementId) {
        let row = document.createElement("div");
        if (self) {
            row.className = "leaderboardrowself";
        } else {
            row.className = "leaderboardrow";
        }

        let place = document.createElement("div");
        if (self) {
            place.className = "top10placeself";
        } else {
            place.className = "top10place";
        }
        if (placementId) {
            place.id = placementId;
        }
        place.innerHTML = ordinalSuffix(placement);
        row.appendChild(place);

        let name = document.createElement("div");
        name.className = "top10name";
        name.innerHTML = playerInfo.userName;
        row.appendChild(name);
        
        let score = document.createElement("div");
        score.className = "top10score";
        score.innerHTML = playerInfo.score;
        row.appendChild(score);
        
        let rank = document.createElement("div");
        rank.className = "top10rank";
        if (!self) {
            rank.style.color = getRankColor(playerInfo.rank);
        }
        rank.innerHTML = RankType[playerInfo.rank].name;
        row.appendChild(rank);
        
        let playtime = document.createElement("div");
        playtime.className = "top10playtime";
        playtime.innerHTML = millisToPlayTime(playerInfo.playTime);
        row.appendChild(playtime);

        return row;
    }

    requestGlobalInfo(guid, globalInfoRespFunc) {
        game.globalInfoRespFunc = globalInfoRespFunc;
        game.portalsocket.emit('globalInfoReq', guid);
    }

	initTop10List() {
        let list = document.getElementById("top10list");
        list.innerHTML = "";
        let wasSelf = false;
		game.top10.forEach((playerInfo, i) => {
            let self = game.self.playerInfo && playerInfo.guid == game.self.playerInfo.guid;
            if (self) {
                wasSelf = true;
            }
            let row = this.createLeaderboardRow(i+1, playerInfo, self);                
            list.appendChild(row);
        });


        if (game.self.playerInfo && game.self.playerInfo.rank && !wasSelf) {
            let row = this.createLeaderboardRow(127, game.self.playerInfo, true, "placement");
            list.appendChild(row);
            row.style.marginTop = "10px";      
            game.requestGlobalInfo(game.self.playerInfo.guid,  (data) => {
                document.getElementById("placement").innerHTML = ordinalSuffix(data.globalPlacement);     
            });
        } else if (game.self.playerInfo && game.self.playerInfo.rank == 0)  {
            let row = document.createElement("div");
            row.className = "leaderboardrowself";
            row.innerHTML = "Please sign-in to get placement!"
            row.style.marginTop = "10px";
            row.style.justifyContent = "center";
            list.appendChild(row);
        }   
    }
    
    initHpBars() {
        this.hpBars = [];
        this.hpBars.push([]);
        this.hpBars.push([]);
        
        for (let j = 0; j<2; ++j) {
            for (let i = 1; i <= 7; ++i) {
                let hpBar = document.getElementById('player'+(j+1)+'hp'+i);
                hpBar.style.opacity = "1";
                this.hpBars[j].push(hpBar);
            }
        }
    }

    setHpBars() {
        this.playerStates.forEach((p,i) => {
            let hp = p.hp;
            for (let j = 0; j < 7; ++j) {
                if (j <= hp-1) {
                    this.hpBars[i][j].style.opacity = "1";
                } else {
                    this.hpBars[i][j].style.opacity = "0.5";
                }
            }
        });
    }

    initScoreBars() {
        this.scoreBars = [];
        this.scoreBars.push([]);
        this.scoreBars.push([]);
        
        for (let j = 0; j < 2; ++j) {
            for (let i = 1; i <= 2; ++i) {
                let scoreBar = document.getElementById('player'+(j+1)+'score'+i);
                this.scoreBars[j].push(scoreBar);
            }
        }
    }

    setScoreBars() {
        this.playerStates.forEach((p,i) => {
            let score = p.score;
            for (let j = 0; j < 2; ++j) {
                if (j <= score-1) {
                    $("#"+this.scoreBars[i][j].id).addClass("playerscore");
                    $("#"+this.scoreBars[i][j].id).removeClass("playerscoregrey");
                    this.scoreBars[i][j].style.backgroundColor = this.getColor(this.playerInfos[i].color).text;                    
                } else {
                    $("#"+this.scoreBars[i][j].id).removeClass("playerscore");
                    $("#"+this.scoreBars[i][j].id).addClass("playerscoregrey");
                    this.scoreBars[i][j].style.backgroundColor = "#2d899d";
                }
            }
        });
    }

    recolorAll() {
        let color1 = this.getColor(this.playerInfos[0].color);
        let color2 = this.getColor(this.playerInfos[1].color);
        this.table.colorBalls(0, color1.value);
        this.table.colorBalls(1, color2.value);
        for (let i = 1; i <= 7; ++i) {
            document.getElementById('player1hp'+i).style.backgroundColor = color1.text;
            document.getElementById('player2hp'+i).style.backgroundColor = color2.text;
            document.getElementById('player1username').style.color = color1.text;            
            document.getElementById('player2username').style.color = color2.text;            

        }
        this.table.goalLeft.tint = color1.value;
        this.table.goalRight.tint = color2.value;
    }

    getInviteLink() {
        this.portalsocket.emit('inviteRequest');
    }
}


//server side we set the 'game_core' class to a global type, so that it can use it anywhere.
if ('undefined' != typeof global) {
	global.game_core = game_core;
	global.Coord = Coord;
	global.RankType = RankType;
	global.Config = Config;
    global.Player = Player;
    global.PlayerInfo = PlayerInfo;
    global.Table = Table;
    global.MatchEvent = MatchEvent;
    global.MatchEventTypes = MatchEventTypes;
	global.UserPriviliges = UserPriviliges;
	global.DataReader = DataReader;
	global.DataWriter = DataWriter;
	global.getAngleDiff = getAngleDiff;
	global.createArray2D = createArray2D;
	global.Ball = Ball;
	global.MatchStates = MatchStates;
	module.exports = { MatchStates, Ball, createArray2D, getAngleDiff, DataReader, DataWriter, Player, PlayerInfo, Table, MatchEvent, MatchEventTypes, Config, game_core, Coord, RankType, UserPriviliges };
}


// client

function fbLogin(){
	createCookie("logintype", "fb");
	game.client_loginAttempt();
}

function googleLogin(googleToken){
	createCookie("logintype", "google");
	game.client_loginAttempt();
}

function logout(){
	game.client_logout();
}

function handleFBLogin(){
	FB.login(function(response) {
		if (response.status == 'connected')
			fbLogin();
		else
			window.alert('Facebook login failed.');
	}, {scope: 'email,public_profile'});
}

function handleGoogleLogin(){
	googleAuth2.signIn().then( res => {
		googleLogin();
	});
}

window.onLoadGAPI = function(){
	gapi.load('auth2', function(){
		gapi.auth2.init({
			client_id: '307542460385-84ssgnvnpe8t92pok3qsednm8i4cmqnp.apps.googleusercontent.com'
		}).then(() =>  {
			googleAuth2 = gapi.auth2.getAuthInstance();
			game.client_loginAttempt();
		});
	}); 
}

var animationFrames = [];
function loadAnimationFrames(resources, renderer) {
	for (let resource in resources) {
		if (resource.startsWith('assets/images/effects') && resource.endsWith('json')) {
			let data = resources[resource].data;
			for (let path in data.frames) {
				let parts = path.split('/');
				let name = parts[0];
				let index = parts[1].substring(name.length + 1, name.length + 1 + 2);
				if (!animationFrames[name]) {
					animationFrames[name] = [];
				}
				animationFrames[name].push({ frame: data.frames[path], index: index, path: path });
			}
		}
	}
	for (let name in animationFrames) {
		let frames = animationFrames[name];
		frames.sort((a, b) => a.index - b.index);
		frames.forEach((frame, i) => {
			frames[i] = PIXI.Texture.fromFrame(frame.path);
			// renderer.plugins.prepare.upload(frames[i]);
		});
		console.log("Animation name: " + name + ", Length: " + frames.length);
	}
}

window.onload = function() {
	$(document).ready(function(){
		$(document).keydown(function(event) {
			if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
				event.preventDefault();
			}
		});

		$(window).bind('mousewheel DOMMouseScroll', function (event) {
			if (event.ctrlKey == true) {
				event.preventDefault();
            }
		});
	});

    createGameCore();
}

function createGameCore() {
	game = new game_core_client();

    window.mobileAndTabletcheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
	//game.camera.windowResized();

	//Make this only if requested
	// if (String(window.location).indexOf('debug') != -1) {
	// 	game.client_create_debug_gui();
	// }
};

};

var frame_time = 60 / 1000;
var UUID;

var SERVER = 'undefined' != typeof (global);
if (SERVER) {
	frame_time = 45;
	UUID = require('node-uuid');
	main();	
} else {
    var hidden, visibilityChange; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    require([
		"lib/Stats.js"
	], main);
}
