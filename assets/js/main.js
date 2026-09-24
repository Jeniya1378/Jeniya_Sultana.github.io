(function(){
  // mobile menu
  var nav = document.getElementById('sitenav');
  var menuBtn = document.querySelector('.menu-btn');
  if(menuBtn) menuBtn.addEventListener('click', function(){
    var o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o ? 'true' : 'false');
  });

  // biosignal trace (PPG-like pulses) on the home page
  var path = document.getElementById('tracePath');
  if(path){
    var d = 'M0 80', x = 0, beat = 0;
    while(x < 1200){
      var w = 96 + Math.sin(beat*1.7)*10;
      var amp = 58 + Math.sin(beat*0.9)*8;
      var pts = [[0,0],[0.12,-0.05],[0.24,-1],[0.36,-0.55],[0.44,-0.42],[0.50,-0.5],[0.62,-0.22],[0.80,-0.06],[1,0]];
      for(var i=1;i<pts.length;i++){
        var px = x + pts[i][0]*w, py = 80 + pts[i][1]*amp;
        var cx = x + (pts[i-1][0]+pts[i][0])/2*w;
        d += ' Q' + cx.toFixed(1) + ' ' + (80 + pts[i-1][1]*amp).toFixed(1) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1);
      }
      x += w; beat++;
    }
    path.setAttribute('d', d);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce){
      var len = path.getTotalLength();
      path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset 2.6s ease-out';
      path.style.strokeDashoffset = '0';
    }
  }

  // publication filters
  var fbtns = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  fbtns.forEach(function(b){
    b.addEventListener('click', function(){
      var f = b.getAttribute('data-f');
      fbtns.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      document.querySelectorAll('#publist .pub').forEach(function(p){
        p.style.display = (f === 'all' || p.getAttribute('data-t') === f) ? '' : 'none';
      });
    });
  });

  // hide photos gracefully if the image file is missing
  document.querySelectorAll('.portrait, .about-photo').forEach(function(img){
    img.addEventListener('error', function(){ img.style.display = 'none'; });
  });

  // theme toggle
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  if(btn) btn.addEventListener('click', function(){
    var cur = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('js-theme', next); }catch(e){}
  });

  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();
})();
