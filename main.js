/* ===== LOADER ===== */
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader')?.classList.add('hidden'),1400);
});

/* ===== AOS INIT ===== */
AOS.init({duration:900,once:true,offset:80});

/* ===== SCROLL PROGRESS + NAV ===== */
const progress=document.getElementById('progress');
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  if(progress)progress.style.width=scrolled+'%';
  if(nav)nav.classList.toggle('scrolled',h.scrollTop>40);
});

/* ===== MOBILE MENU ===== */
const burger=document.querySelector('.burger');
const menu=document.querySelector('nav ul');
burger?.addEventListener('click',()=>menu.classList.toggle('open'));
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

/* ===== CUSTOM CURSOR ===== */
const dot=document.querySelector('.cursor-dot');
const ring=document.querySelector('.cursor-ring');
if(dot&&window.matchMedia('(min-width:769px)').matches){
  let rx=0,ry=0,dx=0,dy=0;
  window.addEventListener('mousemove',e=>{
    dx=e.clientX;dy=e.clientY;
    dot.style.left=dx+'px';dot.style.top=dy+'px';
  });
  (function loop(){
    rx+=(dx-rx)*.18;ry+=(dy-ry)*.18;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.glass-btn,.proj-card,.hire-btn,.lg-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  });
}

/* ===== HERO ROLE TYPING ANIMATION ===== */
const roles=['Front-End Web Developer','Creative Designer','Digital Builder'];
const roleEl=document.getElementById('roles');
if(roleEl){
  let r=0,c=0,deleting=false;
  (function type(){
    const word=roles[r];
    roleEl.textContent=deleting?word.substring(0,c--):word.substring(0,c++);
    if(!deleting&&c===word.length+1){deleting=true;setTimeout(type,1400);return;}
    if(deleting&&c===0){deleting=false;r=(r+1)%roles.length;}
    setTimeout(type,deleting?45:90);
  })();
}

/* ===== ABOUT IMAGE SCROLL DRIFT (GSAP) ===== */
if(window.gsap&&document.querySelector('.about-img img')){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.about-img img',{
    yPercent:18,opacity:.4,ease:'none',
    scrollTrigger:{trigger:'.about',start:'top bottom',end:'top center',scrub:true}
  });
}

/* ===== AI IMAGE SLIDER ON HOVER ===== */
document.querySelectorAll('.ai-slider').forEach(slider=>{
  const imgs=slider.querySelectorAll('img');
  let i=0,timer=null;
  slider.addEventListener('mouseenter',()=>{
    timer=setInterval(()=>{
      imgs[i].classList.remove('active');
      i=(i+1)%imgs.length;
      imgs[i].classList.add('active');
    },800);
  });
  slider.addEventListener('mouseleave',()=>clearInterval(timer));
});