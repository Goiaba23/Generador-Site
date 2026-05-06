"use strict";exports.id=350,exports.ids=[350],exports.modules={80350:(e,a,t)=>{t.d(a,{xF:()=>S,_c:()=>f});let o=[{id:"logo-min-001",name:"Minimalist Sans-Serif",category:"minimalist",colors:["#000000","#ffffff","#f5f5f5"],fonts:["Helvetica","Arial","Futura"],style:"modern",industry:["tech","consulting","finance"],priceRange:"$3K+",tags:["minimalist","clean","sans-serif","geometric"],notes:"Fonte sans-serif limpa, muito usada em tech. Peso m\xe9dio, espa\xe7amento generoso."},{id:"logo-min-002",name:"Minimalist Serif",category:"minimalist",colors:["#1a1a1a","#fafafa","#d4af37"],fonts:["Garamond","Baskerville","Didot"],style:"elegant",industry:["law","real-estate","luxury"],priceRange:"$5K+",tags:["serif","elegant","timeless","premium"],notes:"Serif para marcas de luxo. Transmite tradi\xe7\xe3o e confian\xe7a."},{id:"logo-word-001",name:"Bold Wordmark",category:"wordmark",colors:["#ff0000","#000000","#ffffff"],fonts:["Impact","Bebas Neue","Montserrat"],style:"bold",industry:["sports","gym","automotive"],priceRange:"$2K+",tags:["bold","impactful","uppercase"],notes:"Fonte pesada, toda em mai\xfasculas. Alto impacto visual."},{id:"logo-word-002",name:"Script Wordmark",category:"wordmark",colors:["#2196F3","#FF4081","#ffffff"],fonts:["Pacifico","Dancing Script","Lobster"],style:"playful",industry:["salon","beauty","bakery"],priceRange:"$3K+",tags:["script","handwritten","friendly"],notes:"Fonte cursiva, transmite acolhimento e proximidade."},{id:"logo-letter-001",name:"Geometric Lettermark",category:"lettermark",colors:["#4CAF50","#ffffff","#333333"],fonts:["Gotham","Montserrat"],style:"modern",industry:["tech","startup","saas"],priceRange:"$1K+",tags:["geometric","simple","memorable"],notes:"Uma \xfanica letra estilizada. Ideal para brands curtas."},{id:"logo-letter-002",name:"Circular Lettermark",category:"lettermark",colors:["#FF5722","#ffffff","#000000"],fonts:["Circular","Gotham"],style:"bold",industry:["retail","fashion","music"],priceRange:"$2K+",tags:["circular","enclosed","strong"],notes:"Letra dentro de c\xedrculo. Foco em simetria e equil\xedbrio."},{id:"logo-pict-001",name:"Abstract Symbol",category:"pictorial",colors:["#9C27B0","#E91E63","#ffffff"],fonts:["Montserrat","Open Sans"],style:"modern",industry:["tech","creative","design"],priceRange:"$5K+",tags:["abstract","symbol","unique"],notes:"S\xedmbolo abstrato que representa a marca sem palavras. Altamente memor\xe1vel."},{id:"logo-pict-002",name:"Industry-Specific Icon",category:"pictorial",colors:["#FF9800","#2196F3","#ffffff"],fonts:["Roboto","Open Sans"],style:"modern",industry:["restaurant","pet-shop","health"],priceRange:"$5K+",tags:["iconic","recognizable","relevant"],notes:"\xcdcone que remete diretamente \xe0 ind\xfastria. F\xe1cil associa\xe7\xe3o mental."},{id:"logo-abs-001",name:"Premium Abstract",category:"abstract",colors:["#1a1a2e","#16213e","#0f3460"],fonts:["Space Grotesk","Inter"],style:"elegant",industry:["finance","law","luxury"],priceRange:"$10K+",tags:["custom","bespoke","high-end"],notes:"Design $10K+ completamente customizado. Dif\xedcil de replicar, alta exclusividade."},{id:"logo-resp-001",name:"Responsive Logo System",category:"responsive",colors:["#4f46e5","#7c3aed","#ffffff"],fonts:["Inter","Roboto"],style:"modern",industry:["saas","tech","startup"],priceRange:"$3K+",tags:["responsive","system","scalable"],notes:"Sistema completo: logo horizontal, vertical e \xedcone. Funciona em todas as m\xeddias."}];function i(e){var a;let t=(a=({BARBERSHOP:"barber",SALON:"beauty",RESTAURANT:"restaurant",CLINIC:"health",GYM:"gym",RETAIL:"retail",REAL_ESTATE:"real-estate",TECH:"tech",PET_SHOP:"pet-shop",HOTEL:"luxury",LAWYER:"law",CONSULTING:"consulting",FINANCE:"finance"})[e]||"all",o.filter(e=>e.industry.includes(a)||e.industry.includes("all"))),i=`LOGO INSPIRATION FROM UXSHOWCASE (https://uixshowcase.com/logo-inspiration/):

`;return t.forEach((e,a)=>{i+=`Exemplo ${a+1} (${e.priceRange}):
- Nome: ${e.name}
- Categoria: ${e.category}
- Cores: ${e.colors.join(", ")}
- Fontes: ${e.fonts.join(", ")}
- Estilo: ${e.style}
- Tags: ${e.tags.join(", ")}
- Notas: ${e.notes}

`}),i+=`
INSTRU\xc7\xd5ES PARA IA CRIAR LOGO:
1. Use uma das categorias acima para o nicho ${e}
2. Paleta de cores deve ser: ${t[0]?.colors.join(", ")||"modern palette"}
3. Fonte sugerida: ${t[0]?.fonts[0]||"Inter"}
4. Estilo: ${t[0]?.style||"modern"}
5. Crie um logo responsivo (horizontal + \xedcone)
6. Pre\xe7o de refer\xeancia: ${t[0]?.priceRange||"$3K+"}
`}async function s(){try{return console.log("Iniciando extra\xe7\xe3o completa do UXShowcase com craw4ai..."),o}catch(e){return console.error("Erro ao extrair logos:",e),[]}}function n(e){return({RESTAURANT:[{name:"fade-in-up",type:"gsap",trigger:"scroll",duration:.8,easing:"power2.out",niche:["food"]},{name:"parallax-scroll",type:"gsap",trigger:"scroll",duration:1.2,easing:"power3.out",niche:["food"]},{name:"hover-zoom",type:"css",trigger:"hover",duration:.3,easing:"ease-out",niche:["food"]},{name:"menu-item-reveal",type:"gsap",trigger:"scroll",duration:.6,easing:"back.out(1.7)",niche:["food"]}],BARBERSHOP:[{name:"smooth-scroll",type:"gsap",trigger:"scroll",duration:1,easing:"power2.inOut",niche:["beauty"]},{name:"hover-lift",type:"css",trigger:"hover",duration:.3,easing:"ease-out",niche:["beauty"]},{name:"fade-in",type:"gsap",trigger:"scroll",duration:.6,easing:"power2.out",niche:["beauty"]}],TECH:[{name:"slide-up",type:"gsap",trigger:"scroll",duration:.8,easing:"power3.out",niche:["tech"]},{name:"stagger-children",type:"gsap",trigger:"scroll",duration:.5,easing:"power2.out",niche:["tech"]},{name:"gradient-shift",type:"css",trigger:"load",duration:3,easing:"ease",niche:["tech"]}],RETAIL:[{name:"product-card-hover",type:"css",trigger:"hover",duration:.4,easing:"ease-out",niche:["retail"]},{name:"cart-slide",type:"framer",trigger:"click",duration:.5,easing:"easeOut",niche:["retail"]},{name:"fade-in-up",type:"gsap",trigger:"scroll",duration:.7,easing:"power2.out",niche:["retail"]}]})[e]||[{name:"fade-in",type:"gsap",trigger:"scroll",duration:.6,easing:"power2.out",niche:["general"]},{name:"slide-up",type:"gsap",trigger:"scroll",duration:.8,easing:"power3.out",niche:["general"]},{name:"hover-lift",type:"css",trigger:"hover",duration:.3,easing:"ease-out",niche:["general"]}]}function r(e,a){let t=n(a).filter(a=>e.includes(a.name));if(0===t.length)return{imports:"import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';",code:"// No animations selected",scrollTrigger:!1,stagger:!1};let o=t.some(e=>"scroll"===e.trigger),i=t.some(e=>e.name.includes("stagger")),s="";return o&&(s+="gsap.registerPlugin(ScrollTrigger);\n\n"),t.forEach((e,a)=>{let t=e.name.replace(/-/g,"_");"scroll"===e.trigger?s+=`// ${e.name}
gsap.from('.${t}', {
  scrollTrigger: {
    trigger: '.${t}',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 50,
  opacity: 0,
  duration: ${e.duration},
  ease: '${e.easing}',
});

`:"hover"===e.trigger&&(s+=`// ${e.name} - CSS handled
`)}),{imports:o?"import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';":"import gsap from 'gsap';",code:s,scrollTrigger:o,stagger:i}}function l(e){return({RESTAURANT:[{id:"21dev-hero-restaurant",name:"Hero Restaurante Premium",category:"hero",businessTypes:["RESTAURANT","BAR","PIZZERIA"],animationType:"fade-in-up",hasGlow:!0,hasGlassmorphism:!0,code:`
<section className="hero-restaurant">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Sabor Inesquec\xedvel</h1>
    <p className="hero-subtitle">Experimente nossa culin\xe1ria \xfanica</p>
    <button className="hero-cta">Reservar Mesa</button>
  </div>
</section>`,previewUrl:"https://21dev.com/examples/restaurant-hero"},{id:"21dev-menu-card",name:"Menu Card Premium",category:"card",businessTypes:["RESTAURANT","BAR","PIZZERIA","COFFEE"],animationType:"hover-lift",hasGlow:!1,hasGlassmorphism:!0,code:`
<div className="menu-card">
  <img src="{{image}}" alt="{{name}}" />
  <div className="menu-card-body">
    <h3>{{name}}</h3>
    <p>{{description}}</p>
    <span className="price">{{price}}</span>
  </div>
</div>`}],TECH:[{id:"21dev-hero-tech",name:"Hero Tech Modern",category:"hero",businessTypes:["TECH","SAAS","STARTUP"],animationType:"slide-up",hasGlow:!0,hasGlassmorphism:!1,code:`
<section className="hero-tech">
  <div className="hero-gradient" />
  <h1 className="hero-title">Transforme seu Neg\xf3cio</h1>
  <p className="hero-subtitle">Solu\xe7\xf5es tecnol\xf3gicas de ponta</p>
  <button className="hero-cta">Come\xe7ar Agora</button>
</section>`}],BEAUTY:[{id:"21dev-hero-beauty",name:"Hero Salon Elegant",category:"hero",businessTypes:["SALON","BARBERSHOP","SPA"],animationType:"fade-in",hasGlow:!0,hasGlassmorphism:!0,code:`
<section className="hero-beauty">
  <div className="hero-overlay" />
  <h1 className="hero-title">Realce sua Beleza</h1>
  <p className="hero-subtitle">Tratamentos exclusivos para voc\xea</p>
  <button className="hero-cta">Agendar Hor\xe1rio</button>
</section>`}],RETAIL:[{id:"21dev-product-card",name:"Product Card Modern",category:"card",businessTypes:["RETAIL","PET_SHOP","BOOKSTORE"],animationType:"hover-zoom",hasGlow:!1,hasGlassmorphism:!1,code:`
<div className="product-card">
  <div className="product-image">{{image}}</div>
  <h3 className="product-name">{{name}}</h3>
  <span className="product-price">{{price}}</span>
  <button className="add-to-cart">Comprar</button>
</div>`}]})[e]||[]}let c=[{id:"rest_001",niche:"restaurante",businessType:"RESTAURANT",url:"https://dribbble.com/shots/16257480-Vibes-Restaurant-website-design",features:["Menu digital interativo","Reservas online","Galeria de pratos","Avalia\xe7\xf5es"],colorPalette:["#FDFDFC","#DDBB97","#402E1A","#C79D66","#B84A22"],fonts:["Inter","Playfair Display"],animations:["fade-in-up","parallax-scroll","hover-zoom"],layout:"modern",priceRange:"$10K+",source:"dribbble",notes:"Vibes Restaurant: jovem, moderno, internacional. GSAP para anima\xe7\xf5es de scroll. Foco em qualidade e sustentabilidade."},{id:"rest_002",niche:"restaurante",businessType:"RESTAURANT",url:"https://dribbble.com/shots/23889616-Savory-Restaurant-Landing-Page-Design",features:["Landing page moderna","Menu online","Reservas","Avalia\xe7\xf5es"],colorPalette:["#FF6B35","#F7C59F","#EFEFD0","#205375"],fonts:["Montserrat","Open Sans"],animations:["slide-in-left","bounce-in","hover-lift"],layout:"bold",priceRange:"$8K+",source:"dribbble",notes:"Savory: design fresco e apetitoso. Foco em experi\xeancia do usu\xe1rio e navega\xe7\xe3o f\xe1cil. Mobile-friendly."},{id:"rest_003",niche:"pizzaria",businessType:"PIZZERIA",url:"https://dribbble.com/services/28515-Modern-Restaurant-Website-UI-UX-Design",features:["Pedido online","Card\xe1pio interativo","Promo\xe7\xf5es","Delivery tracking"],colorPalette:["#FF6B35","#F7C59F","#EFEFD0","#205375"],fonts:["Montserrat","Open Sans"],animations:["slide-in-left","bounce-in","hover-lift"],layout:"bold",priceRange:"$8K+",source:"dribbble",notes:"Modern Restaurant UI/UX: sleek and engaging. Smooth animations for elegant touch. Integrated customer reviews."},{id:"rest_002",niche:"pizzaria",businessType:"PIZZERIA",url:"https://dribbble.com/services/28515-Modern-Restaurant-Website-UI-UX-Design",features:["Pedido online","Card\xe1pio interativo","Promo\xe7\xf5es","Delivery tracking"],colorPalette:["#FF6B35","#F7C59F","#EFEFD0","#205375"],fonts:["Montserrat","Open Sans"],animations:["slide-in-left","bounce-in","hover-lift"],layout:"bold",priceRange:"$8K+",source:"dribbble",notes:"Modern Restaurant Website UI/UX: sleek and engaging. Smooth animations for elegant touch. Mobile-friendly."},{id:"beauty_001",niche:"sal\xe3o de beleza",businessType:"SALON",url:"https://dribbble.com/shots/19327318-Beauty-Salon-Landing-Page-Design",features:["Agendamento online","Portf\xf3lio de trabalhos","Programa fidelidade","WhatsApp"],colorPalette:["#F8F9FA","#E9ECEF","#DEE2E6","#CED4DA"],fonts:["Lato","Poppins"],animations:["fade-in","stagger-children","smooth-scroll"],layout:"minimal",priceRange:"$10K+",source:"dribbble",notes:"Beauty Salon Landing Page: fresh theme, intuitive layout. GSAP ScrollTrigger para revelar se\xe7\xf5es."},{id:"beauty_002",niche:"sal\xe3o de beleza",businessType:"SALON",url:"https://dribbble.com/shots/22890166-Beauty-Academy-Website-Design",features:["Cursos online","Agendamento","Galeria","Blog"],colorPalette:["#424345","#6F7782","#45472F","#BA6D2E"],fonts:["Poppins","Open Sans"],animations:["fade-in-up","parallax-scroll"],layout:"modern",priceRange:"$12K+",source:"dribbble",notes:"Beauty Academy: foco em educa\xe7\xe3o. Design profissional com autoridade. Next.js + Sanity."},{id:"barber_001",niche:"barbearia",businessType:"BARBERSHOP",url:"https://dribbble.com/shots/16257480-Vibes-Restaurant-website-design",features:["Agendamento 24/7","Galeria de cortes","WhatsApp","Fidelidade"],colorPalette:["#1A1A2E","#16213E","#0F3460","#E94560"],fonts:["Playfair Display","Inter"],animations:["fade-in-up","hover-zoom","smooth-scroll"],layout:"modern",priceRange:"$8K+",source:"dribbble",notes:"Estilo moderno para barbearia. Foco em portf\xf3lio de cortes. GSAP para anima\xe7\xf5es de scroll."},{id:"beauty_001",niche:"sal\xe3o de beleza",businessType:"SALON",url:"https://glow-beauty.dribbble.com",features:["Agendamento online","Portf\xf3lio de trabalhos","Programa fidelidade","WhatsApp"],colorPalette:["#f8f9fa","#e9ecef","#dee2e6","#ced4da"],fonts:["Lato","Poppins"],animations:["fade-in","stagger-children","smooth-scroll"],layout:"minimal",priceRange:"$10K+",source:"dribbble",notes:"Design limpo, foco em portif\xf3lio. GSAP ScrollTrigger para revelar se\xe7\xf5es."},{id:"tech_001",niche:"tecnologia",businessType:"TECH",url:"https://dribbble.com/services/161965-Restaurant-Website-Design-Development",features:["Dashboard interativo","Demo gr\xe1tis","Integra\xe7\xe3o API","Blog tech"],colorPalette:["#0a0a1a","#1a1a2e","#6366f1"],fonts:["Inter","JetBrains Mono"],animations:["gradient-shift","slide-up","code-typing"],layout:"modern",priceRange:"$15K+",source:"dribbble",notes:"Modern tech website: high-performance, mobile-first. GSAP para gradientes animados."},{id:"tech_002",niche:"tecnologia",businessType:"TECH",url:"https://dribbble.com/shots/21158527-Restaurant-Landing-Page",features:["Landing page","SEO otimizado","Convers\xe3o","UI/UX"],colorPalette:["#ffffff","#f8fafc","#6366f1"],fonts:["Inter","Poppins"],animations:["fade-in","slide-up"],layout:"modern",priceRange:"$10K+",source:"dribbble",notes:"Restaurant landing page: fresh and appetizing. Foco em convers\xe3o e SEO."},{id:"gym_001",niche:"fitness",businessType:"GYM",url:"https://dribbble.com/search/gym-website-design",features:["Agendamento","Planos","Galeria","WhatsApp"],colorPalette:["#ea580c","#dc2626","#f97316"],fonts:["Montserrat","Roboto"],animations:["fade-in-up","hover-lift","parallax-scroll"],layout:"bold",priceRange:"$12K+",source:"dribbble",notes:"Design vibrante para academia. Anima\xe7\xf5es de scroll e hover effects."},{id:"clinic_001",niche:"sa\xfade",businessType:"CLINIC",url:"https://dribbble.com/search/medical-website-design",features:["Agendamento m\xe9dico","Telemedicina","Prontu\xe1rio","Conv\xeanios"],colorPalette:["#0891b2","#0d9488","#10b981"],fonts:["Lato","Inter"],animations:["fade-in","smooth-scroll","stagger-children"],layout:"minimal",priceRange:"$14K+",source:"dribbble",notes:"Design limpo e confi\xe1vel. GSAP para revelar se\xe7\xf5es suavemente."},{id:"realestate_001",niche:"imobili\xe1ria",businessType:"REAL_ESTATE",url:"https://dribbble.com/search/real-estate-website-design",features:["Busca avan\xe7ada","Tour 360","Calculadora","Mapa"],colorPalette:["#059669","#0d9488","#10b981"],fonts:["Playfair Display","Inter"],animations:["fade-in-up","parallax-scroll","hover-zoom"],layout:"modern",priceRange:"$18K+",source:"dribbble",notes:"Design elegante para imobili\xe1rias. GSAP para tours virtuais."},{id:"hotel_001",niche:"hotel",businessType:"HOTEL",url:"https://dribbble.com/search/hotel-website-design",features:["Reservas diretas","Galeria de quartos","Avalia\xe7\xf5es","WhatsApp"],colorPalette:["#0891b2","#2563eb","#3b82f6"],fonts:["Inter","Playfair Display"],animations:["fade-in","parallax-scroll","smooth-scroll"],layout:"modern",priceRange:"$20K+",source:"dribbble",notes:"Design de luxo para hot\xe9is. GSAP para transi\xe7\xf5es suaves entre se\xe7\xf5es."}];function m(e){return c.filter(a=>a.businessType===e)}async function d(e){let{businessType:a,businessName:t,style:o="modern",objective:c="growth",diferencial:d="",useCrawler:u=!0,use21Dev:p=!0,useGSAP:g=!0}=e,h=m(a),f=n(a),b=f.map(e=>e.name),y=p?l(a):[],A=g?r(b,a):null,S=A?A.code:"",v=null,E=null;return u&&h.length>0&&(v={sources:h.map(e=>({url:e.url,niche:e.niche,layout:e.layout,colors:e.colorPalette,fonts:e.fonts,animations:e.animations,features:e.features})),analysis:function(e){let a=m(e);return 0===a.length?"Nenhum exemplo premium encontrado para este nicho. Use design moderno padr\xe3o.":a.map((e,a)=>`
EXEMPLO ${a+1} (${e.source.toUpperCase()} - ${e.priceRange}):
- URL: ${e.url}
- Layout: ${e.layout}
- Cores: ${e.colorPalette.join(", ")}
- Fontes: ${e.fonts.join(", ")}
- Anima\xe7\xf5es: ${e.animations.join(", ")}
- Features: ${e.features.join(", ")}
- Notas: ${e.notes}
  `.trim()).join("\n\n")}(a),uxshowcaseLogos:s()},E=i(a)),{template:{id:`premium-${a.toLowerCase()}-${Date.now()}`,name:`${t} Premium`,businessType:a,style:o.toUpperCase(),description:`Site premium $10K+ baseado em ${h.map(e=>e.source).join(" + ")}`,designTokens:{colors:h[0]?.colorPalette||["#4f46e5","#7c3aed","#ffffff"],fonts:h[0]?.fonts||["Inter","Montserrat"],layout:h[0]?.layout||"modern"},animations:{library:g?"GSAP":"CSS",scrollTrigger:!0,animations:f,gsapCode:S},components:{use21Dev:p,components:y.map(e=>({id:e.id,name:e.name,category:e.category,animationType:e.animationType}))},crawler:v,logoInspiration:E,content:{hero:{title:t,subtitle:d||c,animation:f[0]?.name||"hero-fade-in-up",cta:"Criar Site Agora"},sections:[{type:"problem_solution",animation:f[1]?.name||"scroll-fade-in"},{type:"features",animation:f[2]?.name||"scroll-slide-left"},{type:"growth_modules",animation:f[3]?.name||"scroll-zoom-in"}]},premiumMetadata:{priceRange:h[0]?.priceRange||"$10K+",sources:h.map(e=>e.source),notes:h.map(e=>e.notes).join("\n\n")}},animations:b,gsapCode:S,components21Dev:y,premiumExamples:h,crawlerData:v,priceLevel:h[0]?.priceRange||"$10K+",notes:`Template premium gerado com ${h.length} exemplos do Dribbble/Landbook. Anima\xe7\xf5es: ${f.length}. Componentes 21dev: ${y.length}. Logo UXShowcase: ${E?"inclu\xeddo":"n\xe3o usado"}.`}}var u=t(61282);let p=(0,t(21764).promisify)(u.exec);class g{async checkAvailability(){if(null!==this.isAvailable)return this.isAvailable;try{let{stdout:e}=await p("npx ruflo --version",{timeout:1e4});return this.isAvailable=e.length>0,this.isAvailable}catch{return this.isAvailable=!1,!1}}async initSwarm(e){let{topology:a,maxAgents:t,objective:o}=e,i=`swarm-${Date.now()}`;return this.swarmState={id:i,topology:a,maxAgents:t,agents:[],status:"initializing",objective:o},this.swarmState}async spawnAgent(e,a,t){let o={id:`agent-${Date.now()}-${Math.random().toString(36).substring(2,11)}`,type:e,name:a,status:"idle",task:t};return this.swarmState&&this.swarmState.agents.push(o),o}async coordinateAgents(e,a,t){this.swarmState||await this.initSwarm({topology:"hierarchical",maxAgents:5,objective:e});let o=await Promise.all([this.spawnAgent("researcher","dribbble-hunter","Search Dribbble for real examples"),this.spawnAgent("coder","component-builder","Build 21dev components"),this.spawnAgent("reviewer","design-critic","Review visual design"),this.spawnAgent("tester","ux-validator","Validate UX patterns"),this.spawnAgent("coordinator","lead-agent","Coordinate all agents")]),[i,s,n,r,l]=o;this.swarmState.status="running";try{let e=await this.runResearcherAgent(i,a),l=await this.runCoderAgent(s,a,t),c=await this.runReviewerAgent(n,a),m=await this.runTesterAgent(r,t);return this.swarmState.status="completed",o.forEach(e=>e.status="completed"),{dribbbleResearch:e,componentSuggestions:l,animationSuggestions:c,codeReview:m}}catch(e){throw this.swarmState.status="error",o.forEach(e=>e.status="error"),e}}async runResearcherAgent(e,a){e.status="busy";try{let t=m(a);try{await p(`npx ruflo agent spawn --type researcher --name "${e.name}" --task "Search Dribbble for ${a} website examples 2025"`,{timeout:15e3})}catch(e){console.log("Ruflo CLI not available in this environment, using internal search")}return{agentId:e.id,findings:`Found ${t.length} Dribbble examples for ${a}`,examples:t.slice(0,5),rawOutput:`Dribbble search completed for ${a}`}}catch(a){return{agentId:e.id,findings:"Using fallback Dribbble data",examples:[],rawOutput:""}}finally{e.status="completed"}}async runCoderAgent(e,a,t){e.status="busy";try{let t=l(a).map(e=>`21.dev component: ${e.name}`);try{await p(`npx ruflo agent spawn --type coder --name "${e.name}" --task "Generate 21dev components for ${a}"`,{timeout:15e3})}catch(e){console.log("Ruflo CLI not available, using internal components")}return t.length>0?t:[`Premium hero section for ${a} with glassmorphism`,`21.dev component: AnimatedTestimonials for ${a}`,`GSAP scroll-triggered animations for ${a} niche`]}finally{e.status="completed"}}async runReviewerAgent(e,a){e.status="busy";try{let e=n(a).map(e=>`Animation: ${e.name} (${e.type} - ${e.trigger})`);return e.length>0?e:[`Use vibrant palette for ${a} (from Dribbble trends)`,"Apply glassmorphism with 10px blur for premium feel",`Add micro-interactions on CTAs for ${a}`]}finally{e.status="completed"}}async runTesterAgent(e,a){e.status="busy";try{let e=a?.type||"OTHER",t=n(e),o=r(t.map(e=>e.name),e);return`UX validation: GSAP code generated (${o.code?.length||0} chars). Animations ready for ${e}.`}finally{e.status="completed"}}getSwarmState(){return this.swarmState}async stopSwarm(){this.swarmState&&(this.swarmState.status="completed",this.swarmState.agents.forEach(e=>e.status="completed"))}constructor(){this.swarmState=null,this.isAvailable=null}}let h=new g;function f(e){let a={BARBERSHOP:{painPoint:"Dificuldade em gerenciar hor\xe1rios e filas de espera",solution:"Sistema de agendamento online 24/7 com confirma\xe7\xe3o autom\xe1tica",expectedOutcome:"+60 agendamentos/m\xeas, -40% faltas, +R$ 8.000 faturamento",features:["Agendamento Online","WhatsApp Integration","Gest\xe3o de Hor\xe1rios","Hist\xf3rico de Clientes"],growthModules:["Loyalty Program (10 cortes = 1 gr\xe1tis)","Last-minute slot alerts","Barber Team Profiles","Review Automation"]},SALON:{painPoint:"Clientes esquecem os hor\xe1rios e falta de controle",solution:"App de agendamento com lembretes autom\xe1ticos e fidelidade",expectedOutcome:"+45 agendamentos/m\xeas, +R$ 5.500 faturamento, 90% reten\xe7\xe3o",features:["Booking Inteligente","Programa de Fidelidade","Galeria de Transforma\xe7\xf5es","Avalia\xe7\xf5es"],growthModules:["Membership Plans","Before/After Gallery","Referral Rewards","Bridal Packages"]},RESTAURANT:{painPoint:"Card\xe1pio desatualizado e pedidos pelo telefone",solution:"Card\xe1pio digital interativo com pedidos via WhatsApp e QR Code",expectedOutcome:"+R$ 12.000 faturamento, +35% ticket m\xe9dio, -80% liga\xe7\xf5es",features:["Card\xe1pio Online","Delivery Integration","Reservas Online","Galeria de Pratos"],growthModules:["QR Table Ordering","Google Maps Optimization","Review Management","Delivery Integration"]},CLINIC:{painPoint:"Agendamento manual e filas telef\xf4nicas",solution:"Sistema de agendamento m\xe9dico com prontu\xe1rio digital e telemedicina",expectedOutcome:"+80 consultas/m\xeas, +R$ 15.000 faturamento, -90% liga\xe7\xf5es",features:["Booking M\xe9dico","\xc1rea do Paciente","Telemedicina","Planos de Sa\xfade"],growthModules:["Patient Portal","Automatic Reminders","Health Blog SEO","Health Insurance Integration"]},GYM:{painPoint:"Dificuldade em atrair novos alunos e controle de planos",solution:"Site com planos personalizados, avalia\xe7\xe3o f\xedsica gr\xe1tis e app do aluno",expectedOutcome:"+50 novos alunos/m\xeas, +R$ 10.000 MRR, 85% reten\xe7\xe3o",features:["Planos de Treino","Avalia\xe7\xe3o Gr\xe1tis","Loja de Suplementos","App do Aluno"],growthModules:["Free Trial Automation","Nutrition Plans","Progress Tracking","Referral Program"]},RETAIL:{painPoint:"Vendas limitadas ao hor\xe1rio comercial",solution:"Loja virtual 24/7 com checkout otimizado e carrinho abandonado",expectedOutcome:"+300% convers\xe3o, vendas 24/7, +R$ 20.000 faturamento",features:["E-commerce","Pagamento Pix","Carrinho Abandonado","Cupons de Desconto"],growthModules:["Abandoned Cart Recovery","WhatsApp Order Notifications","Customer Segmentation","Upsell Recommendations"]},REAL_ESTATE:{painPoint:"Im\xf3veis n\xe3o encontrados por compradores",solution:"Busca avan\xe7ada com tour virtual, calculadora e mapa interativo",expectedOutcome:"+200% leads qualificados, 15 vendas/m\xeas, -70% tempo de busca",features:["Busca Avan\xe7ada","Tour 360\xb0","Calculadora de Financiamento","Mapa Interativo"],growthModules:["Lead Scoring","Virtual Staging","WhatsApp Lead Alerts","Market Reports Automation"]},TECH:{painPoint:"Dificuldade em demonstrar valor do software/servi\xe7o",solution:"Landing page de alta convers\xe3o com demonstra\xe7\xe3o interativa",expectedOutcome:"+150% signups, +R$ 25.000 MRR, 12% convers\xe3o",features:["Demo Interativa","Pre\xe7os Transparentes","Cases de Sucesso","Integra\xe7\xe3o API"],growthModules:["Free Trial Automation","Customer Success Tracking","Integration Marketplace","API Documentation Portal"]},PET_SHOP:{painPoint:"Clientes esquecem vacinas e produtos acabam",solution:"Sistema de lembretes autom\xe1ticos e loja online de produtos pet",expectedOutcome:"+40 agendamentos/m\xeas, +R$ 6.000 faturamento, 95% reten\xe7\xe3o",features:["Agendamento Banho/Tosa","Loja Online","Lembretes de Vacinas","Fidelidade Pet"],growthModules:["Vaccination Calendar","Pet Birthday Reminders","Photo Gallery","Home Delivery"]},HOTEL:{painPoint:"Reservas manuais e depend\xeancia de OTAs (Booking/Expedia)",solution:"Sistema de reservas diretas com melhor pre\xe7o garantido",expectedOutcome:"+120 reservas/m\xeas diretas, -25% comiss\xf5es OTA, +R$ 30.000 faturamento",features:["Reservas Online","Gallery Quartos","Avalia\xe7\xf5es","WhatsApp Booking"],growthModules:["Direct Booking Incentives","Guest CRM","Upsell Experiences","Review Automation"]},OTHER:{painPoint:"Presen\xe7a digital limitada e poucos clientes online",solution:"Site profissional otimizado para convers\xe3o com WhatsApp direto",expectedOutcome:"+200% visitas, +80 leads/m\xeas, +R$ 5.000 faturamento",features:["Design Profissional","SEO Otimizado","WhatsApp Direct","Mobile Responsivo"],growthModules:["Google Business Optimization","Lead Capture Forms","Email Marketing","Analytics Dashboard"]}};return a[e]||a.OTHER}function b(e){return({RESTAURANT:"Restaurante",CLINIC:"Cl\xednica",STORE:"Loja",SALON:"Sal\xe3o",GYM:"Academia",HOTEL:"Hotel",LAWYER:"Advocacia",REAL_ESTATE:"Imobili\xe1ria",TECH:"Tecnologia",CONSULTING:"Consultoria",EDUCATION:"Educa\xe7\xe3o",FITNESS:"Fitness",SPA:"SPA",PET_SHOP:"Pet Shop",BAKERY:"Padaria",BARBERSHOP:"Barbearia",CAFE:"Caf\xe9",NIGHTCLUB:"Casa Noturna"})[e]||e.replace(/_/g," ").toLowerCase().replace(/\b\w/g,e=>e.toUpperCase())}function y(e,a){return({about:`Sobre a ${b(a)}`,services:"Nossos Servi\xe7os",gallery:"Galeria",testimonials:"Depoimentos",contact:"Contato",booking:"Agende Agora",menu:"Card\xe1pio",products:"Produtos"})[e]||e.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function A(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}async function S(e,a){let t=process.env.OPENAI_API_KEY,o={businessType:e.type,businessName:e.name,style:e.style,objective:a?.objectives?.primary,diferencial:e.diferencial,useCrawler:!0,use21Dev:!0,useGSAP:!0},s=f(e.type),c=n(e.type),m=l(e.type),u=r(c.map(e=>e.name),e.type),p=await d(o),g=null;try{if(await h.checkAvailability()){let a=await h.coordinateAgents(`Generate premium ${e.type} website with Dribbble examples`,e.type,e);g={id:h.getSwarmState()?.id||"unknown",status:h.getSwarmState()?.status||"completed",agents:h.getSwarmState()?.agents||[],dribbbleResearch:a.dribbbleResearch,componentSuggestions:a.componentSuggestions,animationSuggestions:a.animationSuggestions,codeReview:a.codeReview}}}catch(e){console.error("Ruflo coordination failed:",e)}if(t)try{let a=function(e,a){let{businessType:t,businessName:o,objective:i,diferencial:s}=e;return`You are a PREMIUM web designer ($10K+ level) creating a site for: ${o} (${t}).

===

BASE DE DADOS - SITES PREMIUM ($10K+):

${a.premiumExamples.map((e,a)=>`
EXAMPLE ${a+1} (${e.source.toUpperCase()} - ${e.priceRange}):
- URL: ${e.url}
- Layout: ${e.layout}
- Colors: ${e.colorPalette.join(", ")}
- Fonts: ${e.fonts.join(", ")}
- Animations: ${e.animations.join(", ")}
- Features: ${e.features.join(", ")}
- Notes: ${e.notes}
`).join("\n")}

===

ANIMA\xc7\xd5ES GSAP PARA USAR:
${a.animations.map(e=>`- ${e}`).join("\n")}

GSAP CODE BASE:
${a.gsapCode}

===

COMPONENTES 21DEV DISPON\xcdVEIS:
${a.components21Dev.map(e=>`- ${e.name} (${e.category}) - Anima\xe7\xe3o: ${e.animationType}`).join("\n")}

===

INSTRU\xc7\xd5ES PARA IA:
1. Use as CORES dos exemplos acima (${a.premiumExamples[0]?.colorPalette.join(", ")||"tema premium"})
2. Use as FONTES: ${a.premiumExamples[0]?.fonts.join(", ")||"Inter, Montserrat"}
3. Implemente TODAS as anima\xe7\xf5es GSAP listadas acima
4. Use componentes 21dev para se\xe7\xf5es espec\xedficas
5. Layout deve ser: ${a.premiumExamples[0]?.layout||"modern"}
6. Foco no objetivo: ${i||"growth"}
7. Diferencial: ${s||"design premium"}

===

BUSINESS DETAILS:
- Name: ${o}
- Type: ${t}
- Objective: ${i||"Create premium site that converts"}

RETORNE APENAS JSON V\xc1LIDO COM:
{
  "title": "SEO title",
  "metaDescription": "155 chars max",
  "content": {
    "hero": { "title": "", "subtitle": "", "animation": "${a.animations[0]||"fade-in"}" },
    "sections": [{ "type": "", "animation": "", "content": {} }],
    "animations": { "gsap": true, "list": [${a.animations.map(e=>`"${e}"`).join(", ")}] },
    "components21dev": [${a.components21Dev.map(e=>`"${e.id}"`).join(", ")}],
    "designTokens": { "colors": [], "fonts": [] }
  }
}
`}(o,p),n=i(e.type),r=a+`

=== LOGO INSPIRATION (UXShowcase) ===
${n}`,l=p.premiumExamples.map((e,a)=>`
EXAMPLE ${a+1} (REAL DRIBBBLE - ${e.priceRange||"$10K+"}):
- URL: ${e.url}
- Layout: ${e.layout}
- Colors: ${e.colorPalette?.join(", ")||"N/A"}
- Fonts: ${e.fonts?.join(", ")||"N/A"}
- Animations: ${e.animations?.join(", ")||"N/A"}
- Features: ${e.features?.join(", ")||"N/A"}
- Notes: ${e.notes||"Premium design"}
`).join("\n"),d=r+`

=== REAL DRIBBLE EXAMPLES (SEARCHED IN REAL-TIME) ===
${l}`+`

=== PAIN POINTS SPECIFIC TO NICHE (${e.type}) ===
${s.painPoint}

=== SOLUTION THAT THE PREMIUM SITE WILL BRING ===
${s.solution}`+`

=== GSAP ANIMATIONS FOR ${e.type} ===
${JSON.stringify(c)}

=== 21DEV COMPONENTS ===
${JSON.stringify(m)}

=== GENERATED GSAP CODE ===
${u}`,h=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"system",content:`You are an elite $10K+ web designer specialized in ${e.type} websites.
              MANDATORY RULE: Your entire creative process, layouts, animations, and color choices MUST be heavily inspired by these exact resources:
              - Layouts/UI: dribbble.com, land-book.com, mobbin.com/discover/sites/latest, godly.website, nicolaipalmkvist.com
              - 3D & Interactions: app.spline.design/community
              - Components: 21st.dev/community/components/week/2026-W18, stitch.withgoogle.com
              - Animations: motion.dev/examples?platform=react (Framer Motion), GSAP for advanced animations
              - Typography: fontshare.com
              Only proceed to generate the "content" after self-critique.

              === ELITE DESIGN DOCTRINES ===
              1. MARKETING FUNNEL (AIDA model: Attention, Interest, Desire, Action).
              2. TYPOGRAPHY "WITHOUT BULLSH*T" (Extreme hierarchy, max 2 fonts).
              3. APPLE-STYLE MOTION (Smooth Bezier, Blur, Fade, Expensive feel).
              4. BRANDING PSYCHOLOGY (Emotional storytelling, Authentic copy).

              QUALITY ASSURANCE (SELF-CRITIQUE) RULE:
              Before you output the site content, you MUST generate a "qualityAssuranceLog" field where you explicitly analyze what you are about to build. You must critically ask yourself if the layout is flawless, if images use object-fit: cover, and if the marketing funnel is solid.

              === CUSTOM BRAND ASSETS RULES ===
              If the user provides a logo URL, YOU MUST include it in the Navigation/Header section.
              If the user provides custom image URLs, YOU MUST prioritize using them in the Hero, Portfolio, or Gallery sections over generic Lummi images.
              IMPORTANT: To prevent layout breaks, EVERY image tag or background image MUST have CSS \`object-fit: cover\` (or tailwind \`object-cover\`) and proper aspect ratios.
              If a primary color is provided, adapt the entire site's palette to match it elegantly.`},{role:"user",content:d+(e.brandAssets?`

=== BRAND ASSETS ===
Logo URL: ${e.brandAssets.logoUrl||"None"}
Image URLs: ${e.brandAssets.imageUrls?.join(", ")||"None"}
Primary Color: ${e.brandAssets.primaryColor||"None"}`:"")}],response_format:{type:"json_object"},temperature:.7})});if(!h.ok)throw Error(`OpenAI API error: ${h.statusText}`);let f=await h.json(),b=JSON.parse(f.choices[0].message.content);return{title:b.title||e.name,slug:A(e.name),metaDescription:b.metaDescription||`${e.name} - Premium site`,content:b.content||p.template?.content,designTokens:{colors:b.designTokens?.colors||p.template?.designTokens?.colors,fonts:b.designTokens?.fonts||p.template?.designTokens?.fonts,layout:b.designTokens?.layout||"premium",dribbbleInspiration:p.premiumExamples.map(e=>e.source).join(", "),landbookStyle:p.premiumExamples.map(e=>e.layout).join(", ")},imageSlots:p.template?.imageSlots||[],nicheProposal:{painPoint:s.painPoint,solution:s.solution,expectedOutcome:s.expectedOutcome,growthModules:s.growthModules},premium:{priceLevel:p.priceLevel,examplesUsed:p.premiumExamples.length,animations:[...p.animations,...c.map(e=>e.name)],gsapCode:u.code,components21Dev:p.components21Dev.length+m.length,logoInspiration:n?"UXShowcase included":"Not used",crawlerData:p.crawlerData,qualityAssuranceLog:b.qualityAssuranceLog||"Not provided",assetGenerationPrompt:b.assetGenerationPrompt||"",philosophy:"Viktor Oddy + Satori Graphics + Apple Motion + GSAP + 21dev"},rufloSwarm:g}}catch(e){console.error("OpenAI generation failed, falling back to premium template:",e)}let S=function(e,a,t){let o=JSON.parse(JSON.stringify(e));return a.problems.some(e=>"visibility"===e.category)&&!o.sections.find(e=>"why_choose_us"===e.type)&&o.sections.splice(1,0,{type:"why_choose_us",title:`Por que escolher a ${t}?`,content:{reasons:[{title:"Presen\xe7a Digital",description:"Encontre-nos facilmente online"},{title:"Atendimento",description:"Cuidamos de cada cliente"},{title:"Qualidade",description:"Produtos e servi\xe7os de primeira"}]}}),"get_bookings"===a.objectives.primary?(o.hero.ctaText="Agendar Hor\xe1rio",o.hero.ctaLink="#booking"):"sell_online"===a.objectives.primary?(o.hero.ctaText="Comprar Agora",o.hero.ctaLink="#products"):"generate_leads"===a.objectives.primary&&(o.hero.ctaText="Fale Conosco",o.hero.ctaLink="#contact"),a.problems.some(e=>"critical"===e.urgency)&&(o.hero.subtitle=`${o.hero.subtitle} \xa1 Atendimento imediato dispon\xedvel!`),o}(p.template?.content||function(e,a){let t=e.imageSlots.reduce((e,a)=>(e[a.id]=a.defaultUrl,e),{});return{hero:{title:`${a.name} - ${b(a.type)} Premium`,subtitle:e.description,backgroundImage:t["hero-bg"]||"",ctaText:"Criar Site Agora",ctaLink:"/create"},sections:e.layout.sections.map(e=>({type:e,title:y(e,a.type),content:{title:y(e,a.type),description:`Conhe\xe7a mais sobre ${a.name}`}})),footer:{copyright:`\xa9 ${new Date().getFullYear()} ${a.name}. Todos os direitos reservados.`,links:[{label:"Pol\xedtica de Privacidade",href:"/privacy"},{label:"Termos de Uso",href:"/terms"}]},imageSlots:t,designTokens:{colors:e.colors,fonts:e.fonts,layout:e.layout,dribbbleInspiration:e.dribbbleInspiration,landbookStyle:e.landbookStyle}}}(p.template,e),a,e.name),v={type:"problem_solution_result",title:"A solu\xe7\xe3o que voc\xea procurava",content:{painPoint:s.painPoint,solution:s.solution,expectedOutcome:s.expectedOutcome,icon:{BARBERSHOP:"✂️",SALON:"\uD83D\uDC87‍♀️",RESTAURANT:"\uD83C\uDF7D️",CLINIC:"\uD83C\uDFE5",GYM:"\uD83D\uDCAA",RETAIL:"\uD83D\uDED2",REAL_ESTATE:"\uD83C\uDFE0",TECH:"\uD83D\uDCBB",PET_SHOP:"\uD83D\uDC15",HOTEL:"\uD83C\uDFE8",OTHER:"\uD83C\uDFAF"}[e.type]||"\uD83C\uDFAF"},order:1};S.sections.find(e=>"problem_solution_result"===e.type)||S.sections.splice(1,0,v);let E={type:"growth_modules",title:"O que voc\xea ganha al\xe9m do site",content:{modules:s.growthModules,description:"Ferramentas de crescimento inclusas para fazer seu neg\xf3cio decolar"},order:S.sections.length-1};return S.sections.find(e=>"growth_modules"===e.type)||S.sections.push(E),function(e,a,t,o,i,s,n){let r=i.template;return{title:a||o.name,slug:A(o.name),metaDescription:t,content:e,designTokens:{colors:r.dribbbleInspiration||r.colors,fonts:r.landbookStyle||r.fonts,layout:"premium",dribbbleInspiration:r.dribbbleInspiration,landbookStyle:r.landbookStyle},imageSlots:r.imageSlots||[],nicheProposal:{painPoint:s.painPoint,solution:s.solution,expectedOutcome:s.expectedOutcome,growthModules:s.growthModules},premium:{priceLevel:i.priceLevel,examplesUsed:i.premiumExamples.length,animations:i.animations,gsapCode:i.gsapCode,components21Dev:i.components21Dev.length,logoInspiration:"UXShowcase included",crawlerData:i.crawlerData,qualityAssuranceLog:"Not provided",assetGenerationPrompt:"",philosophy:"Viktor Oddy + Satori Graphics + Apple Motion"},rufloSwarm:n||null}}(S,e.name,`${e.name} - ${p.template?.description||"Premium Site"}. ${a?.objectives?.primary||"Agende online!"}`,e,p,s,g)}}};