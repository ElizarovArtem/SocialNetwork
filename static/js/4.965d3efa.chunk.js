(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{290:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__tivBQ",dialog:"Dialogs_dialog__1Aayz",dialogsItems:"Dialogs_dialogsItems__2RL6q",active:"Dialogs_active__35EX-",messages:"Dialogs_messages__3Lt26",message:"Dialogs_message__1UZ-O",messageItem1:"Dialogs_messageItem1__2qjG7",messageItem2:"Dialogs_messageItem2__3PJwk",newMessageArea:"Dialogs_newMessageArea__3Ihyf",messageArea:"Dialogs_messageArea__BNQPo",submitButton:"Dialogs_submitButton__qCfEj"}},291:function(e,a,t){"use strict";t.d(a,"a",(function(){return u}));var s=t(33),n=t(34),i=t(36),m=t(35),r=t(0),o=t.n(r),c=t(9),l=t(13),g=function(e){return{isAuth:e.auth.isAuth}},u=function(e){var a=function(a){Object(i.a)(r,a);var t=Object(m.a)(r);function r(){return Object(s.a)(this,r),t.apply(this,arguments)}return Object(n.a)(r,[{key:"render",value:function(){return this.props.isAuth?o.a.createElement(e,this.props):o.a.createElement(c.a,{to:"/login"})}}]),r}(o.a.Component);return Object(l.b)(g)(a)}},296:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),i=t(290),m=t.n(i),r=t(14);function o(e){return n.a.createElement("div",{className:m.a.dialog},n.a.createElement(r.b,{to:"/dialogs/"+e.id,activeClassName:m.a.active},e.name))}var c=t(96),l=t.n(c);function g(e){return"first"===e.owner?n.a.createElement("div",{className:m.a.messageItem1},n.a.createElement("img",{src:l.a}),n.a.createElement("div",{className:m.a.message},e.message)):n.a.createElement("div",{className:m.a.messageItem2},n.a.createElement("div",{className:m.a.message},e.message),n.a.createElement("img",{src:l.a}))}var u=t(88),d=t(128),_=t(40),f=t(66);var b=Object(f.a)(50),E=Object(d.a)({form:"messageArea"})((function(e){return n.a.createElement("form",{onSubmit:e.handleSubmit},n.a.createElement(u.a,{className:m.a.messageArea,component:_.b,validate:[f.b,b],name:"newMessageBody",placeholder:"Add new message"}),n.a.createElement("button",{className:m.a.submitButton},"Submit"))})),v=t(13),p=t(291),h=t(8),A=Object(h.d)(Object(v.b)((function(e){return{dialogsState:e.messagesPage,isAuth:e.auth.isAuth}}),(function(e){return{onSendMessage:function(a){e({type:"ADD-NEW-MESSAGE",newMessage:a})}}})),p.a)((function(e){var a=e.dialogsState.dialogs.map((function(e){return n.a.createElement(o,{name:e.name,id:e.id})})),t=e.dialogsState.messages.map((function(e){return n.a.createElement(g,{id:e.id,owner:e.owner,message:e.message})}));return n.a.createElement("div",{className:m.a.dialogs},n.a.createElement("div",{className:m.a.dialogsItems},a),n.a.createElement("div",{className:m.a.messages},t,n.a.createElement(E,{onSubmit:function(a){e.onSendMessage(a.newMessageBody)}})))}));a.default=A}}]);
//# sourceMappingURL=4.965d3efa.chunk.js.map