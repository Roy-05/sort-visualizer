(this["webpackJsonpsort-visualizer"]=this["webpackJsonpsort-visualizer"]||[]).push([[0],[,,,,,,,,,function(t,e,o){t.exports=o(17)},,,,,function(t,e,o){},function(t,e,o){},function(t,e,o){},function(t,e,o){"use strict";o.r(e);var n=o(0),r=o.n(n),a=o(8),i=o.n(a),s=(o(14),o(2)),u=o(3),l=o(5),c=o(4),h=o(6),m=(o(15),o(1)),g=(o(16),function(t){function e(t){var o;return Object(s.a)(this,e),(o=Object(l.a)(this,Object(c.a)(e).call(this,t))).state={array:[],width:window.innerWidth,startedSort:!1,isSorted:!1,TIME:500},o}return Object(h.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions.bind(this))}},{key:"componentDidUpdate",value:function(t,e){var o=document.getElementsByClassName("nav-btn");this.state.startedSort&&Object(m.a)(o).forEach((function(t){t.disabled=!0})),this.state.isSorted&&(Object(m.a)(o).forEach((function(t){t.disabled=!1})),this.setState({startedSort:!1,isSorted:!1}),this.setArray())}},{key:"updateDimensions",value:function(){this.setState({width:window.innerWidth}),this.setArray()}},{key:"getArraySize",value:function(){var t=this.state.width,e=Math.floor((t-100)/12);return e>=75?75:e}},{key:"setArray",value:function(){for(var t=[],e=0;e<this.getArraySize();e++)t.push(this.getRandomInt(1,500));this.setState({array:t})}},{key:"sortCompleteAnimation",value:function(t){var e=this,o=document.getElementsByClassName("array-elem"),n=this.getArraySize(),r=this.state.TIME;setTimeout((function(){for(var t=function(t){setTimeout((function(){o[t].style.backgroundColor="green"}),30*t)},e=0;e<n;e++)t(e)}),(t+1)*r),setTimeout((function(){Object(m.a)(o).forEach((function(t){setTimeout((function(){t.style.backgroundColor="lightblue"}),350),setTimeout((function(){t.style.backgroundColor="green"}),700),setTimeout((function(){t.style.backgroundColor="lightblue"}),1e3)}))}),t*r+30*n+200),setTimeout((function(){e.setState({isSorted:!0})}),t*r+30*n+1200+500)}},{key:"swap",value:function(t,e,o){var n=t[e];t[e]=t[o],t[o]=n}},{key:"bubbleSort",value:function(){var t=this;this.setState({startedSort:!0});for(var e=this.state.array,o=document.getElementsByClassName("array-elem"),n=this.state.TIME,r=function(r){setTimeout((function(){for(var a=function(a){setTimeout((function(){o[a+1].style.backgroundColor="blue",o[a].style.backgroundColor="red",setTimeout((function(){e[a]>e[a+1]?(t.swap(e,a,a+1),o[a].style.height="".concat(e[a],"px"),o[a+1].style.height="".concat(e[a+1],"px"),o[a+1].style.backgroundColor="lightblue",o[a].style.backgroundColor="lightblue"):(o[a+1].style.backgroundColor="lightblue",o[a].style.backgroundColor="lightblue")}),n/(e.length-r-1))}),a*n/(e.length-r-1))},i=0;i<e.length-r-1;i++)a(i)}),r*n)},a=0;a<e.length;a++)r(a);this.sortCompleteAnimation(e.length)}},{key:"selectionSort",value:function(){var t=this;this.setState({startedSort:!0});for(var e=this.state.array,o=document.getElementsByClassName("array-elem"),n=this.state.TIME,r=function(r){setTimeout((function(){for(var a=r,i=function(t){setTimeout((function(){o[t].style.backgroundColor="red",o[a].style.backgroundColor="blue",setTimeout((function(){e[t]<e[a]?(o[a].style.backgroundColor="lightblue",a=t):o[t].style.backgroundColor="lightblue"}),4)}),4*t)},s=r+1;s<e.length;s++)i(s);setTimeout((function(){t.swap(e,r,a),o[r].style.height="".concat(e[r],"px"),o[a].style.height="".concat(e[a],"px"),o[a].style.backgroundColor="lightblue"}),n)}),r*n)},a=0;a<e.length-1;a++)r(a);this.sortCompleteAnimation(e.length)}},{key:"insertionSort",value:function(){var t=this;this.setState({startedSort:!0});for(var e=this.state.array,o=document.getElementsByClassName("array-elem"),n=this.state.TIME,r=function(r){setTimeout((function(){var a=r,i=t.insertionSortHelper(e.slice(0,r+1),a);if(i!==a){e.splice(i,0,e[a]),e.splice(a+1,1);for(var s=function(t,r){setTimeout((function(){o[t-1].style.backgroundColor="red",o[t].style.backgroundColor="blue",setTimeout((function(){o[t].style.height="".concat(e[t],"px"),o[t-1].style.height="".concat(e[i],"px")}),n/(2*(a-i))),setTimeout((function(){o[t].style.backgroundColor="lightblue",t===i+1&&(o[i].style.backgroundColor="lightblue")}),n/(a-i))}),r*(n/(a-i)))},u=a,l=0;u>i;u--,l++)s(u,l)}else o[r].style.backgroundColor="red",setTimeout((function(){o[r].style.backgroundColor="lightblue"}),150),setTimeout((function(){o[r].style.backgroundColor="red"}),300),setTimeout((function(){o[r].style.backgroundColor="lightblue"}),450)}),r*n)},a=0;a<e.length;a++)r(a);this.sortCompleteAnimation(e.length)}},{key:"insertionSortHelper",value:function(t,e){for(var o=e;e>0&&t[o]<t[e-1];)e--;return e}},{key:"quickSort",value:function(){this.setState({startedSort:!0});var t=Object(m.a)(this.state.array),e=t.length-1,o={pos:[],pivot:[],counter:[0]};this.quickSortRecursive(t,0,e,o),this.animateQSort(o)}},{key:"quickSortRecursive",value:function(t,e,o,n){if(!(e>=o)){var r=this.partition(t,e,o,n);this.quickSortRecursive(t,e,r-1,n),this.quickSortRecursive(t,r+1,o,n)}}},{key:"partition",value:function(t,e,o,n){for(var r=t[o],a=e,i=e;i<o;i++)t[i]<r&&(n.pos.push([i,a]),this.swap(t,i,a),a++);return n.pos.push([a,o]),n.pivot.push([a,o]),n.counter.push(n.pos.length),this.swap(t,a,o),a}},{key:"animateQSort",value:function(t){for(var e=this,o=document.getElementsByClassName("array-elem"),n=this.state.array,r=this.state.TIME,a=function(a){setTimeout((function(){for(var i=function(i,s){setTimeout((function(){var s=t.pos[i][0],u=t.pos[i][1],l=t.pivot[a][1];o[s].style.backgroundColor="red",o[u].style.backgroundColor="blue",o[l].style.backgroundColor="green",e.swap(n,s,u),setTimeout((function(){o[s].style.height="".concat(n[s],"px"),o[u].style.height="".concat(n[u],"px")}),r/(2*(t.counter[a+1]-t.counter[a]))),setTimeout((function(){o[s].style.backgroundColor="lightblue",o[u].style.backgroundColor="lightblue"}),r/(t.counter[a+1]-t.counter[a]))}),s*r/(t.counter[a+1]-t.counter[a]))},s=t.counter[a],u=0;s<t.counter[a+1];s++,u++)i(s,u)}),a*r)},i=0;i<t.counter.length-1;i++)a(i);this.sortCompleteAnimation(t.counter.length-1)}},{key:"mergeSort",value:function(){this.setState({startedSort:!0});var t=Object(m.a)(this.state.array),e=t.length-1,o={startPos:[],values:[],endPos:[],midPos:[],comparisons:[]};this.mergeSortRecursive(t,0,e,o),this.animateMSort(o)}},{key:"mergeSortRecursive",value:function(t,e,o,n){if(!(e>=o)){var r=Math.floor((e+o)/2);this.mergeSortRecursive(t,e,r,n),this.mergeSortRecursive(t,r+1,o,n),this.merge(t,e,r,o,n)}}},{key:"merge",value:function(t,e,o,n,r){for(var a=e,i=o+1,s=[],u=0,l=[],c=e;c<=n;c++)a>o?(l.push([a,o]),s[u]=t[i],u++,i++):i>n?(l.push([i,n]),s[u]=t[a],u++,a++):t[a]<t[i]?(l.push([a,i]),s[u]=t[a],u++,a++):(l.push([i,a]),s[u]=t[i],u++,i++);r.startPos.push(e),r.values.push(s),r.midPos.push(o),r.endPos.push(n),r.comparisons.push(l);for(var h=0;h<u;h++)t[e]=s[h],e++}},{key:"animateMSort",value:function(t){for(var e=this.state.array,o=document.getElementsByClassName("array-elem"),n=this.state.TIME,r=function(r){setTimeout((function(){for(var a=t.startPos[r],i=t.values[r].length,s=function(s,u){setTimeout((function(){var l=t.midPos[r],c=t.endPos[r];o[a].style.backgroundColor="red",o[l].style.backgroundColor="green",o[c].style.backgroundColor="blue",setTimeout((function(){e[s]=t.values[r][u],o[s].style.height="".concat(e[s],"px")}),u*(n/(2*i))),setTimeout((function(){o[a].style.backgroundColor="lightblue",o[l].style.backgroundColor="lightblue",o[c].style.backgroundColor="lightblue"}),n)}),u*(n/i))},u=a,l=0;u<a+i;u++,l++)s(u,l)}),r*n)},a=0;a<t.startPos.length;a++)r(a);this.sortCompleteAnimation(t.startPos.length-1)}},{key:"numberToBead",value:function(t){}},{key:"render",value:function(){var t=this,e=this.state.array;return r.a.createElement(r.a.Fragment,null,r.a.createElement("nav",{className:"navbar"},r.a.createElement("button",{className:"nav-btn",id:"gen-new-arr",onClick:function(){t.setArray()}},"Generate New Array"),r.a.createElement("button",{className:"nav-btn",id:"bubble-sort",onClick:function(){t.bubbleSort()}},"Bubble Sort"),r.a.createElement("button",{className:"nav-btn",id:"selection-sort",onClick:function(){t.selectionSort()}},"Selection Sort"),r.a.createElement("button",{className:"nav-btn",id:"insertion-sort",onClick:function(){t.insertionSort()}},"Insertion Sort"),r.a.createElement("button",{className:"nav-btn",id:"quick-sort",onClick:function(){t.quickSort()}},"Quick Sort"),r.a.createElement("button",{className:"nav-btn",id:"merge-sort",onClick:function(){t.mergeSort()}},"Merge Sort")),r.a.createElement("div",{className:"array-container"},e.map((function(t,e){return r.a.createElement("div",{className:"array-elem",key:e,style:{height:"".concat(t,"px")}})}))))}},{key:"getRandomInt",value:function(t,e){return Math.floor(Math.random()*(e-t+1))+t}},{key:"testAlgorithms",value:function(){for(var t=0;t<100;t++){for(var e=[],o=0;o<this.getRandomInt(1,20);o++)e.push(this.getRandomInt(-1e3,1e3));var n=e.slice().sort((function(t,e){return t-e})),r=this.mergeSort(e);console.log(this.arraysAreEqual(n,r))}}},{key:"arraysAreEqual",value:function(t,e){if(t.length!==e.length)return!1;for(var o=0;o<t.length;o++)if(t[o]!==e[o])return console.log(t[o],e[o]),!1;return!0}}]),e}(r.a.Component)),f=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement(g,null)))}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.f6082010.chunk.js.map