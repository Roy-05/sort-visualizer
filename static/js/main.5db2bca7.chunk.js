(this["webpackJsonpsort-visualizer"]=this["webpackJsonpsort-visualizer"]||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(7),l=n.n(a),s=(n(13),n(1)),c=n(2),i=n(4),u=n(3),g=n(5),h=(n(14),n(15),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={array:[]},n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setArray()}},{key:"getArraySize",value:function(){return window.screen.width<400?50:100}},{key:"setArray",value:function(){for(var e=[],t=0;t<this.getArraySize();t++)e.push(this.getRandomInt(1,500));this.setState({array:e})}},{key:"resetArray",value:function(){for(var e=[],t=0;t<this.getArraySize();t++)e.push(this.getRandomInt(1,500));this.setState({array:e});for(var n=document.getElementsByClassName("array-elem"),r=0;r<e.length;r++)n[r].style.backgroundColor="lightblue"}},{key:"bubbleSort",value:function(){for(var e=this.state.array,t=document.getElementsByClassName("array-elem"),n=function(n){setTimeout((function(){0===n?setTimeout((function(){t[e.length-n-1].style.backgroundColor="green"}),400):t[e.length-n].style.backgroundColor="green";for(var r=function(r){setTimeout((function(){t[r+1].style.backgroundColor="red",t[r].style.backgroundColor="red",setTimeout((function(){if(e[r]>e[r+1]){var o=e[r],a=e[r],l=e[r+1];e[r]=e[r+1],e[r+1]=o,t[r].style.height="".concat(l,"px"),t[r+1].style.height="".concat(a,"px"),t[r+1].style.backgroundColor="green",t[r].style.backgroundColor="lightblue"}else t[r+1].style.backgroundColor="lightblue",t[r].style.backgroundColor="lightblue";n===e.length-2&&(t[r+1].style.backgroundColor="green",setTimeout((function(){t[r].style.backgroundColor="green"}),4))}),4)}),4*r)},o=0;o<e.length-n-1;o++)r(o)}),400*n)},r=0;r<e.length-1;r++)n(r)}},{key:"selectionSort",value:function(){for(var e=this.state.array,t=document.getElementsByClassName("array-elem"),n=function(n){setTimeout((function(){for(var r=n,o=function(n){setTimeout((function(){t[n].style.backgroundColor="red",t[r].style.backgroundColor="blue",setTimeout((function(){e[n]<e[r]?(t[r].style.backgroundColor="lightblue",r=n):t[n].style.backgroundColor="lightblue"}),5)}),5*(n-1))},a=n+1;a<e.length;a++)o(a);setTimeout((function(){var o=e[n],a=e[r],l=e[n];e[n]=e[r],e[r]=o,t[n].style.height="".concat(a,"px"),t[r].style.height="".concat(l,"px"),t[n].style.backgroundColor="green",n!==r&&(t[r].style.backgroundColor="lightblue")}),500),n===e.length-2&&setTimeout((function(){t[n+1].style.backgroundColor="green"}),1e3)}),500*n)},r=0;r<e.length-1;r++)n(r)}},{key:"render",value:function(){var e=this,t=this.state.array;return o.a.createElement(o.a.Fragment,null,o.a.createElement("nav",{className:"navbar"},o.a.createElement("button",{className:"gen-new-arr",onClick:function(){e.resetArray()}},"Generate New Array"),o.a.createElement("button",{className:"sort bubble-sort",onClick:function(){e.bubbleSort()}},"Bubble Sort"),o.a.createElement("button",{className:"sort selection-sort",onClick:function(){e.selectionSort()}},"Selection Sort"),o.a.createElement("button",{className:"test-algs",onClick:function(){e.testAlgorithms()}},"Test!")),o.a.createElement("div",{className:"array-container"},t.map((function(e,t){return o.a.createElement("div",{className:"array-elem",key:t,style:{height:"".concat(e,"px")}})}))))}},{key:"getRandomInt",value:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}},{key:"testAlgorithms",value:function(){for(var e=0;e<100;e++){for(var t=[],n=0;n<this.getRandomInt(1,1e3);n++)t.push(this.getRandomInt(-1e3,1e3));var r=t.slice().sort((function(e,t){return e-t})),o=this.selectionSort(t);console.log(this.arraysAreEqual(r,o))}}},{key:"arraysAreEqual",value:function(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return console.log(e[n],t[n]),!1;return!0}}]),t}(o.a.Component)),m=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"App"},o.a.createElement(h,null)))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[8,1,2]]]);
//# sourceMappingURL=main.5db2bca7.chunk.js.map