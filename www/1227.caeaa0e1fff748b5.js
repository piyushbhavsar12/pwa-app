"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1227],{1227:(u,r,e)=>{e.r(r),e.d(r,{ShareWeb:()=>l});var t=e(467),n=e(5083);class l extends n.E_{canShare(){return(0,t.A)(function*(){return typeof navigator>"u"||!navigator.share?{value:!1}:{value:!0}})()}share(a){var s=this;return(0,t.A)(function*(){if(typeof navigator>"u"||!navigator.share)throw s.unavailable("Share API not available in this browser");return yield navigator.share({title:a.title,text:a.text,url:a.url}),{}})()}}}}]);