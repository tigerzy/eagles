!function(v,k){"use strict";var J="ht",R=J+".layout.",s=v[J]||module.parent.exports.ht,I=s.List,d=s.DataModel,w=s.Node,G=s.Edge,C=s.Group,D=Math,S=D.sqrt,K=D.random,h=D.max,H=D.min,X=function(g){return g*g};s.Default.getInternal().addMSMap({ms_force:function(i){i._interval=50,i._stepCount=10,i._motionLimit=.01,i._edgeRepulsion=.65,i._nodeRepulsion=.65,i._damper=1,i._maxMotion=0,i._motionRatio=0,i.init=function(T){var B=this;T instanceof d?B.dm=T:B.gv=T,B._nodeMap={},B._nodes=new I,B._edges=new I},i.start=function(){var l=this,i=l.gv;if(!l._timer){var C=l.cdm=i?i.dm():l.dm;C.mm(l.handleDataModelChange,l),C.md(l.handleDataPropertyChange,l),i&&i.mp(l.handleGV,l),C.each(function($){if(l.isVisible($)&&l.isLayoutable($)&&$ instanceof w)if(l instanceof Y){var W=$.p3();$.p3([W[0]+K(),W[1]+K(),W[2]+K()])}else W=$.p(),$.p(W.x+K(),W.y+K())}),l._timer=setInterval(function(){l.relax()},l._interval),l._damper=1}},i.stop=function(){var G=this;G._timer&&(G.cdm.umm(G.handleDataModelChange,G),G.cdm.umd(G.handleDataPropertyChange,G),G.gv&&G.gv.ump(G.handleGV,G),clearInterval(G._timer),delete G._timer,delete G.cdm)},i.handleGV=function(D){var V=this;if("dataModel"===D.property){var i=D.oldValue,q=D.newValue;i&&(i.umm(V.handleDataModelChange,V),i.umd(V.handleDataPropertyChange,V)),this.cdm=q,q.mm(V.handleDataModelChange,V),q.md(V.handleDataPropertyChange,V)}},i.relax=function(){var R=this;if(!(R._damper<.1&&R._maxMotion<R._motionLimit)){this.cdm.each(function(I){R.isVisible(I)&&(I instanceof G?R.addEdge(I):I instanceof w&&R.addNode(I))});for(var i,Q,L=0,P=R._edges,C=R._nodes,h=C.size();L<R._stepCount;L++){for(P.each(R.relaxEdge,R),i=0;h>i;i++)for(Q=0;h>Q;Q++)R.relaxNode(C.get(i),C.get(Q));R.moveNode()}R._isAdjusting=1,C.each(function(Y){Y.fix||(Y.p?Y.v.p3(Y.p):Y.v.p(Y.x,Y.y))}),delete R._isAdjusting,R._nodeMap={},C.clear(),P.clear(),R.onRelaxed()}},i.onRelaxed=function(){},i.isRunning=function(){return!!this._timer},i.isVisible=function(l){return l.s("layoutable")===!1?!1:this.gv?this.gv.isVisible(l):!0},i.isLayoutable=function(F){if(F.s("layoutable")===!1)return!1;if(F instanceof C)return!1;var E=this;return E.gv?E.gv.isMovable(F)&&!E.gv.isSelected(F):!(E.cdm||E.dm).sm().co(F)},i.getNodeRepulsion=function(){return this._nodeRepulsion},i.setNodeRepulsion=function(r){this._nodeRepulsion=r,this._damper=1},i.getEdgeRepulsion=function(){return this._edgeRepulsion},i.setEdgeRepulsion=function(Q){this._edgeRepulsion=Q,this._damper=1},i.getStepCount=function(){return this._stepCount},i.setStepCount=function(C){this._stepCount=C,this._damper=1},i.getInterval=function(){return this._interval},i.setInterval=function(W){var T=this;T._interval!==W&&(T._interval=W,T._timer&&(clearInterval(T._timer),T._timer=setInterval(function(){T.relax()},W)))},i.handleDataPropertyChange=function(_){!this._isAdjusting&&this.isVisible(_.data)&&(this._damper=1)},i.handleDataModelChange=function(){this._damper=1},i.damp=function(){var c=this._maxMotion,h=this._damper;this._motionRatio<=.001&&((.2>c||c>1&&.9>h)&&h>.01?this._damper-=.01:.4>c&&h>.003?this._damper-=.003:h>1e-4&&(this._damper-=1e-4)),c<this._motionLimit&&(this._damper=0)}}}),s.layout.ForceLayout=function(e){this.init(e)},s.Default.def(R+"ForceLayout",k,{ms_force:1,getLimitBounds:function(){return this._limitBounds},setLimitBounds:function($){this._limitBounds=$,this._damper=1},getNodeSize:function(B){var r=this.gv;return r&&r.getDataUIBounds?r.getDataUIBounds(B):B.getRect()},addNode:function(A){var R=this,x=R._nodeMap[A._id];if(x)return x;var D=A.p();x={v:A,x:D.x,y:D.y,dx:0,dy:0,fix:!R.isLayoutable(A),s:R.getNodeSize(A)};var o=x.s,u=S(X(o.width)+X(o.height))*R._nodeRepulsion;return x.r=1>u?100:u,R._nodeMap[A._id]=x,R._nodes.add(x),x},addEdge:function(z){if(z._40I&&z._41I){var x=this,e=x.addNode(z._40I),I=x.addNode(z._41I),v={s:e,t:I};I=I.s,e=e.s;var b=I.width+e.width,k=I.height+e.height;v.length=S(b*b+k*k)*x._edgeRepulsion,v.length<=0&&(v.length=100),x._edges.add(v)}},relaxEdge:function(q){var N=q.t,l=q.s,n=N.x-l.x,R=N.y-l.y,B=S(n*n+R*R),M=100*q.length,u=.25*n/M*B,p=.25*R/M*B;N.dx=N.dx-u,N.dy=N.dy-p,l.dx=l.dx+u,l.dy=l.dy+p},relaxNode:function(f,Z){if(f!==Z){var u=0,t=0,j=f.x-Z.x,z=f.y-Z.y,X=j*j+z*z;0===X?(u=K(),t=K()):36e4>X&&(u=j/X,t=z/X);var $=f.r*Z.r/400;u*=$,t*=$,f.dx+=u,f.dy+=t,Z.dx-=u,Z.dy-=t}},moveNode:function(){var U=this,M=U._limitBounds,T=U._maxMotion,a=0,i=U._damper;U._nodes.each(function(f){if(!f.fix){var u=f.dx*i,A=f.dy*i;if(f.dx=u/2,f.dy=A/2,a=h(S(u*u+A*A),a),f.x+=h(-40,H(40,u)),f.y+=h(-40,H(40,A)),M){f.x<M.x&&(f.x=M.x,U.adjust(1,0)),f.y<M.y&&(f.y=M.y,U.adjust(0,1));var e=f.s;f.x+e.width>M.x+M.width&&(f.x=M.x+M.width-e.width,U.adjust(-1,0)),f.y+e.height>M.y+M.height&&(f.y=M.y+M.height-e.height,U.adjust(0,-1))}}}),U._maxMotion=a,U._motionRatio=a>0?T/a-1:0,U.damp()},adjust:function(c,F){var a=this._limitBounds;this._nodes.each(function(U){c>0?(!a||U.x+U.s.width+c<a.x+a.width)&&(U.x+=c):(!a||U.x+c>a.x)&&(U.x+=c),F>0?(!a||U.y+U.s.height+F<a.y+a.height)&&(U.y+=F):(!a||U.y+F>a.y)&&(U.y+=F)})}});var Y=s.layout.Force3dLayout=function(m){this.init(m)};s.Default.def(R+"Force3dLayout",k,{ms_force:1,getNodeSize3d:function(z){return z.s3()},addNode:function(Q){var B=this,o=B._nodeMap[Q._id];if(o)return o;o={v:Q,p:Q.p3(),d:[0,0,0],fix:!B.isLayoutable(Q),s:B.getNodeSize3d(Q)};var D=o.s,E=s.Default.getDistance(D)*B._nodeRepulsion;return o.r=1>E?100:E,B._nodeMap[Q._id]=o,B._nodes.add(o),o},addEdge:function(t){if(t._40I&&t._41I){var G=this,U=G.addNode(t._40I),Q=G.addNode(t._41I),P={s:U,t:Q};Q=Q.s,U=U.s,P.length=S(X(Q[0]+U[0])+X(Q[1]+U[1])+X(Q[2]+U[2]))*G._edgeRepulsion,P.length<=0&&(P.length=100),G._edges.add(P)}},relaxEdge:function(f){var Q=f.t.p,c=f.s.p,v=f.t.d,j=f.s.d,D=Q[0]-c[0],x=Q[1]-c[1],z=Q[2]-c[2],p=S(D*D+x*x+z*z),R=100*f.length,d=.25*D/R*p,Z=.25*x/R*p,g=.25*z/R*p;v[0]-=d,v[1]-=Z,v[2]-=g,j[0]+=d,j[1]+=Z,j[2]+=g},relaxNode:function(S,j){if(S!==j){var z=S.p,l=j.p,Q=0,X=0,Y=0,t=z[0]-l[0],Z=z[1]-l[1],v=z[2]-l[2],_=t*t+Z*Z+v*v;0===_?(Q=K(),X=K(),Y=K()):216e6>_&&(Q=t/_,X=Z/_,Y=v/_);var W=S.r*j.r/400,s=S.d,E=j.d;Q*=W,X*=W,Y*=W,s[0]+=Q,s[1]+=X,s[2]+=Y,E[0]-=Q,E[1]-=X,E[2]-=Y}},moveNode:function(){var q=this,W=q._maxMotion,E=0,s=q._damper;q._nodes.each(function(z){if(!z.fix){var q=z.p,V=z.d,X=V[0]*s,G=V[1]*s,N=V[2]*s;V[0]=X/2,V[1]=G/2,V[2]=N/2,E=h(S(X*X+G*G+N*N),E),q[0]+=h(-40,H(40,X)),q[1]+=h(-40,H(40,G)),q[2]+=h(-40,H(40,N))}}),q._maxMotion=E,q._motionRatio=E>0?W/E-1:0,q.damp()}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:this,Object);