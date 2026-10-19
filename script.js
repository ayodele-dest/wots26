const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
const toast=document.querySelector('#toast');
const showToast=(message)=>{toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)};
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));menu.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');menu.classList.remove('open');document.body.classList.remove('menu-open')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'});
document.querySelectorAll('.reveal').forEach((element,index)=>{element.style.transitionDelay=`${Math.min(index%4,3)*70}ms`;observer.observe(element)});
const eventTime=new Date('2026-12-11T17:00:00+01:00').getTime();
const countdown=document.querySelector('#countdown');
function updateCountdown(){const remaining=Math.max(0,eventTime-Date.now());const parts=[Math.floor(remaining/86400000),Math.floor(remaining/3600000)%24,Math.floor(remaining/60000)%60,Math.floor(remaining/1000)%60];countdown.querySelectorAll('b').forEach((el,i)=>el.textContent=String(parts[i]).padStart(2,'0'))}
updateCountdown();setInterval(updateCountdown,1000);
document.querySelector('#calendar-button').addEventListener('click',()=>{const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SLC//WOTS 2026//EN','BEGIN:VEVENT','UID:wots-2026@slcglobal.org','DTSTAMP:20261019T000000Z','DTSTART;VALUE=DATE:20261211','DTEND;VALUE=DATE:20261212','SUMMARY:Wind of the Spirit 2026 — Elshaddai','LOCATION:National Stadium, Abuja, Nigeria','DESCRIPTION:Event time to be announced.','END:VEVENT','END:VCALENDAR'].join('\r\n');const blob=new Blob([ics],{type:'text/calendar'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='wind-of-the-spirit-2026.ics';a.click();URL.revokeObjectURL(a.href);showToast('Calendar event downloaded')});
document.querySelector('#share-button').addEventListener('click',async()=>{const data={title:'Wind of the Spirit 2026 — Elshaddai',text:'Come expecting the impossible. December 11, 2026 in Abuja.',url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(`${data.text} ${data.url}`);showToast('Event link copied')}}catch(error){if(error.name!=='AbortError')showToast('Share this page with someone')}});

const experiencePreview=document.querySelector('.experience-preview');
const experiencePreviewImage=experiencePreview?.querySelector('img');
const experienceItems=document.querySelectorAll('.experience-item[data-image]');
const precisePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
const positionExperiencePreview=(clientX,clientY)=>{const width=experiencePreview.offsetWidth||220;const height=experiencePreview.offsetHeight||280;const listLeft=document.querySelector('.experience-list')?.getBoundingClientRect().left||300;const x=innerWidth>900?Math.max(24,(listLeft-width)/2):Math.max(12,Math.min(clientX+24,innerWidth-width-12));const y=Math.max(88,Math.min(clientY-height/2,innerHeight-height-12));experiencePreview.style.transform=`translate3d(${x}px,${y}px,0)`};
const showExperiencePreview=(item,x=innerWidth*.62,y=innerHeight*.28)=>{if(!experiencePreview||!experiencePreviewImage)return;experiencePreviewImage.src=item.dataset.image;positionExperiencePreview(x,y);experiencePreview.classList.add('active')};
const hideExperiencePreview=()=>experiencePreview?.classList.remove('active');
experienceItems.forEach(item=>{if(precisePointer){item.addEventListener('pointerenter',event=>showExperiencePreview(item,event.clientX,event.clientY));item.addEventListener('pointermove',event=>positionExperiencePreview(event.clientX,event.clientY));item.addEventListener('pointerleave',hideExperiencePreview)}item.addEventListener('focus',()=>showExperiencePreview(item));item.addEventListener('blur',hideExperiencePreview)});
addEventListener('scroll',hideExperiencePreview,{passive:true});
document.querySelectorAll('[data-form-placeholder]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const kind=link.dataset.formPlaceholder;showToast(kind==='pastors'?'Visiting pastors form coming soon':'Praise Point form coming soon')}));
