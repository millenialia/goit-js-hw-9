!function(){var e=document.querySelector(".form");function t(e,t){var n=Math.random()>.3;return new Promise((function(o,a){setTimeout((function(){n?o({position:e,delay:t}):a({position:e,delay:t})}),t)}))}e.addEventListener("submit",(function(n){n.preventDefault();var o=n.target.delay,a=n.target.step,i=n.target.amount,r=parseInt(o.value),c=parseInt(a.value),l=parseInt(i.value);if(r>0||c>0||l>0)for(var s=0;s<i.value;s++)t(s+1,r).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),r+=c;else alert("Please put positive value");e.reset()}))}();
//# sourceMappingURL=03-promises.27fb96c6.js.map
