'use strict';
document.body.style.backgroundColor="#2F2F2F";
winit.path="/";//"/pi/0.1/";
winit.loadJS(winit.domains, winit.path+'app/boot/init.js?'+Math.random(), "utf8", winit.initFail, "load init error");
winit.loadJS(winit.domains, winit.path+'app/boot/next.js?'+Math.random(), "utf8", winit.initFail, "load next error");
winit.loadJS([ "http://192.168.33.122" ], winit.path+'wallet/.depend?'+Math.random(), "utf8", winit.initFail, "load list error");
winit.loadJS(winit.domains, winit.path+"pi/polyfill/babel_polyfill.js", "utf8", winit.initFail, "load babel_polyfill error");
//winit.debug=false; 