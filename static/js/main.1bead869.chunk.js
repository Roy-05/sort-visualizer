(this["webpackJsonpsort-visualizer"]=this["webpackJsonpsort-visualizer"]||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(7),l=n.n(a),s=(n(13),n(1)),i=n(2),c=n(4),u=n(3),g=n(5),h=(n(14),n(15),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={array:[],sorted:!1},n}return Object(g.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("accessed"),this.setArray()}},{key:"componentDidUpdate",value:function(e,t){t.sorted!==this.state.sorted&&(console.log("handle refresh stuff here!!"),this.resetArray())}},{key:"getArraySize",value:function(){return window.screen.width<400?50:75}},{key:"setArray",value:function(){for(var e=[],t=0;t<this.getArraySize();t++)e.push(this.getRandomInt(1,500));this.setState({array:e})}},{key:"resetArray",value:function(){for(var e=[],t=0;t<this.getArraySize();t++)e.push(this.getRandomInt(1,500));this.setState({array:e});for(var n=document.getElementsByClassName("array-elem"),o=0;o<e.length;o++)n[o].style.backgroundColor="lightblue"}},{key:"bubbleSort",value:function(){for(var e=this,t=this.state.array,n=document.getElementsByClassName("array-elem"),o=function(e){setTimeout((function(){0===e?setTimeout((function(){n[t.length-e-1].style.backgroundColor="green"}),400):n[t.length-e].style.backgroundColor="green";for(var o=function(o){setTimeout((function(){n[o+1].style.backgroundColor="red",n[o].style.backgroundColor="red",setTimeout((function(){if(t[o]>t[o+1]){var r=t[o],a=t[o],l=t[o+1];t[o]=t[o+1],t[o+1]=r,n[o].style.height="".concat(l,"px"),n[o+1].style.height="".concat(a,"px"),n[o+1].style.backgroundColor="green",n[o].style.backgroundColor="lightblue"}else n[o+1].style.backgroundColor="lightblue",n[o].style.backgroundColor="lightblue";e===t.length-2&&(n[o+1].style.backgroundColor="green",setTimeout((function(){n[o].style.backgroundColor="green"}),4))}),4)}),4*o)},r=0;r<t.length-e-1;r++)o(r)}),400*e)},r=0;r<t.length-1;r++)o(r);setTimeout((function(){e.setState({sorted:!0})}),400*t.length+800)}},{key:"selectionSort",value:function(){for(var e=this,t=this.state.array,n=document.getElementsByClassName("array-elem"),o=function(e){setTimeout((function(){for(var o=e,r=function(e){setTimeout((function(){n[e].style.backgroundColor="red",n[o].style.backgroundColor="blue",setTimeout((function(){t[e]<t[o]?(n[o].style.backgroundColor="lightblue",o=e):n[e].style.backgroundColor="lightblue"}),4)}),4*(e-1))},a=e+1;a<t.length;a++)r(a);setTimeout((function(){var r=t[e],a=t[o],l=t[e];t[e]=t[o],t[o]=r,n[e].style.height="".concat(a,"px"),n[o].style.height="".concat(l,"px"),n[e].style.backgroundColor="green",e!==o&&(n[o].style.backgroundColor="lightblue")}),400),e===t.length-2&&setTimeout((function(){n[e+1].style.backgroundColor="green"}),800)}),400*e)},r=0;r<t.length-1;r++)o(r);setTimeout((function(){e.setState({sorted:!0})}),400*t.length+800)}},{key:"render",value:function(){var e=this,t=this.state.array;return r.a.createElement(r.a.Fragment,null,r.a.createElement("nav",{className:"navbar"},r.a.createElement("button",{className:"gen-new-arr",onClick:function(){e.resetArray()}},"Generate New Array"),r.a.createElement("button",{className:"sort bubble-sort",onClick:function(){e.bubbleSort()}},"Bubble Sort"),r.a.createElement("button",{className:"sort selection-sort",onClick:function(){e.selectionSort()}},"Selection Sort"),r.a.createElement("button",{className:"test-algs",onClick:function(){e.testAlgorithms()}},"Test!")),r.a.createElement("div",{className:"array-container"},t.map((function(e,t){return r.a.createElement("div",{className:"array-elem",key:t,style:{height:"".concat(e,"px")}})}))))}},{key:"getRandomInt",value:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}},{key:"testAlgorithms",value:function(){for(var e=0;e<100;e++){for(var t=[],n=0;n<this.getRandomInt(1,1e3);n++)t.push(this.getRandomInt(-1e3,1e3));var o=t.slice().sort((function(e,t){return e-t})),r=this.selectionSort(t);console.log(this.arraysAreEqual(o,r))}}},{key:"arraysAreEqual",value:function(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return console.log(e[n],t[n]),!1;return!0}}]),t}(r.a.Component)),m=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement(h,null)))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[8,1,2]]]);
//# sourceMappingURL=main.1bead869.chunk.js.map