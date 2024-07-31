(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,function(e,t,a){e.exports=a(11)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(2),o=a.n(l);a(8),a(9),a(10);const c=()=>r.a.createElement("div",{style:{width:"100%",padding:"2%",backgroundColor:"red",color:"white",textAlign:"center"}},r.a.createElement("h1",null,"React With NodeJS")),m=e=>{let{numberOfMovies:t,getAllMovies:a}=e;return r.a.createElement("div",{style:{backgroundColor:"green"},className:"display-board"},r.a.createElement("h4",{style:{color:"white"}},"Movies Created"),r.a.createElement("div",{className:"number"},t),r.a.createElement("div",{className:"btn"},r.a.createElement("button",{type:"button",onClick:e=>a(),className:"btn btn-warning"},"Get all Movies")))},s=e=>{let{movies:t}=e;if(console.log("movies length:::",t.length),0===t.length)return null;const a=t.map((e,t)=>((e,t)=>r.a.createElement("tr",{key:t,className:t%2===0?"odd":"even"},r.a.createElement("td",null,t+1),r.a.createElement("td",null,e.title),r.a.createElement("td",null,e.genre),r.a.createElement("td",null,e.director),r.a.createElement("td",null,e.release_year)))(e,t));return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Movies"),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Movie Id"),r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Genre"),r.a.createElement("th",null,"Director"),r.a.createElement("th",null,"Release"))),r.a.createElement("tbody",null,a)))};var i=e=>{let{onChangeForm:t,createMovie:a}=e;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-7 mrgnbtm"},r.a.createElement("h2",null,"Create Movie"),r.a.createElement("form",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-md-6"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Title"),r.a.createElement("input",{type:"text",onChange:e=>t(e),className:"form-control",name:"title",id:"title",placeholder:"Title"})),r.a.createElement("div",{className:"form-group col-md-6"},r.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Genre"),r.a.createElement("input",{type:"text",onChange:e=>t(e),className:"form-control",name:"genre",id:"genre",placeholder:"Genre"}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-md-6"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Director"),r.a.createElement("input",{type:"text",onChange:e=>t(e),className:"form-control",name:"director",id:"director",placeholder:"Director"})),r.a.createElement("div",{className:"form-group col-md-6"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Release"),r.a.createElement("input",{type:"text",onChange:e=>t(e),className:"form-control",name:"release_year",id:"release_year",placeholder:"Release"}))),r.a.createElement("button",{type:"button",onClick:e=>a(),className:"btn btn-danger"},"Create")))))};var d=e=>{let{onChangeForm:t,searchMovie:a}=e;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-7 mrgnbtm"},r.a.createElement("h2",null,"Search Movie"),r.a.createElement("form",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-md-6"},r.a.createElement("input",{type:"text",onChange:e=>t(e),className:"form-control",name:"director",id:"director",placeholder:"Director"}))),r.a.createElement("button",{type:"button",onClick:e=>a(),className:"btn btn-danger"},"Search")))))};async function u(){try{const e=await fetch("http://localhost:3001/api/movie/all");return await e.json()}catch(e){return[]}}var h=function(){const[e,t]=Object(n.useState)({}),[a,l]=Object(n.useState)({}),[o,h]=Object(n.useState)([]),[E,g]=Object(n.useState)(0),v=()=>{u().then(e=>{console.log(e),h(e),g(e.length)})};Object(n.useEffect)(()=>{u().then(e=>{console.log(e),h(e),g(e.length)})},[]);const p=e=>{"title"===e.target.name?a.title=e.target.value:"genre"===e.target.name?a.genre=e.target.value:"director"===e.target.name?a.director=e.target.value:"release_year"===e.target.name&&(a.release_year=e.target.value),l(a)};return r.a.createElement("div",{className:"App"},r.a.createElement(c,null),r.a.createElement("div",{className:"container mrgnbtm"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement(i,{movie:a,onChangeForm:p,createMovie:e=>{(async function(e){const t=await fetch("/api/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:e})});return await t.json()})(a).then(e=>{console.log(e),g(E+1)}),v()}})),r.a.createElement("div",{className:"col-md-4"},r.a.createElement(m,{numberOfMovies:E,getAllMovies:v})))),r.a.createElement("div",{className:"row mrgnbtm"},r.a.createElement(d,{movie:a,onChangeForm:p,searchMovie:t=>{console.log(e.search_text),async function(e){try{console.log("search_data: "+e);const t=await fetch("http://localhost:3001/api/movie/search?search_text="+e);return await t.json()}catch(t){return[]}}("jok").then(e=>{console.log(e.data),h(e.data),g(e.data.length)})}})),r.a.createElement("div",{className:"row mrgnbtm"},r.a.createElement(s,{movies:o})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));const E=()=>r.a.createElement("h1",null,"Something went wrong");class g extends r.a.Component{constructor(){super(...arguments),this.state={hasError:!1},this.componentDidCatch=(e,t)=>{this.setState({error:e,info:t})}}render(){const{hasError:e}=this.state,{children:t}=this.props;return e?r.a.createElement(E,null):t}}g.getDerivedStateFromError=e=>({hasError:!0}),o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null,r.a.createElement(h,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})}],[[3,1,2]]]);
//# sourceMappingURL=main.55efe543.chunk.js.map