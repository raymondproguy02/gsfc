(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const d={get(t,e=null){try{const s=localStorage.getItem(t);return s?JSON.parse(s):e}catch{return e}},set(t,e){try{return localStorage.setItem(t,JSON.stringify(e)),!0}catch{return!1}},remove(t){try{return localStorage.removeItem(t),!0}catch{return!1}}},C=[];function Z(t,e){var S,a,r,m,p;const{showToast:s,updateStreak:o,userProfile:i,isLoggedIn:n,navigateTo:u}=e;C.filter(l=>!l.isWelcome).length;const y=((S=d.get("gsc-progress",{completedLessons:[]}).completedLessons)==null?void 0:S.length)||0;o&&o(),t.innerHTML=`
        <div class="page active" id="homePage">
            <div class="container">
            <!-- Welcome Hero -->
                <div class="welcome-hero">
                    <h1 class="welcome-title">Welcome to <span>The Consciousness of the Son</span></h1>
                    <p class="welcome-text">
                        This is a journey into the depths of what Christ has already accomplished
                        on your behalf. Over the coming lessons, we will explore what it truly
                        means to live from the finished work of the Cross — not striving to earn
                        what has already been freely given, but growing into the reality of our
                        inheritance in Christ.
                    </p>
                    <p class="welcome-text">
                        My prayer is that as you walk through these pages, the eyes of your
                        understanding will be opened, your heart will be settled in God's love,
                        and you will discover the freedom that comes from knowing — truly knowing —
                        that He has already blessed us with every spiritual blessing in Christ.
                    </p>
                    <div class="welcome-scripture">
                        <i class="fas fa-quote-left"></i>
                        <span>"He that spared not his own Son, but delivered him up for us all,
                        how shall he not with him also freely give us all things?"</span>
                        <span class="welcome-ref">— Romans 8:32</span>
                    </div>
                    <div class="welcome-signoff">
                        <i class="fas fa-heart"></i>
                        With love and reflection,<br />
                        <strong>Grace Spring Family Church</strong>
                    </div>
                </div>

                <!-- Action Row -->
                <div class="action-row">
                    <button class="action-btn-primary" id="continueLearning">
                        <i class="fas fa-book-open"></i> Continue Learning
                    </button>
                    <button class="action-btn-secondary" id="readBible">
                        <i class="fas fa-bible"></i> Read Bible
                    </button>
                </div>

                <!-- Greeting -->
                <div class="greeting">
                    Welcome back, <strong>${(i==null?void 0:i.name)||"Guest"}</strong>!
                    ${y===0?"Start your journey today.":"Keep going! You're doing great. 🎉"}
                </div>

                <!-- Auth Prompt -->
                ${n?`
                    <div class="auth-prompt" style="border-color:var(--accent-green);">
                        <div class="prompt-icon">✅</div>
                        <div class="prompt-title">You're Signed In!</div>
                        <div class="prompt-desc">Your progress is being saved to the cloud.</div>
                    </div>
                `:`
                    <div class="auth-prompt">
                        <div class="prompt-icon">✨</div>
                        <div class="prompt-title">Create an Account</div>
                        <div class="prompt-desc">Save your progress, notes, and favorites across all devices.</div>
                        <div class="prompt-buttons">
                            <button class="prompt-btn primary" id="signupPrompt">
                                <i class="fas fa-user-plus"></i> Get Started
                            </button>
                            <button class="prompt-btn secondary" id="signinPrompt">
                                <i class="fas fa-sign-in-alt"></i> Sign In
                            </button>
                        </div>
                    </div>
                `}
            </div>
        </div>
    `,(a=document.getElementById("continueLearning"))==null||a.addEventListener("click",()=>{u&&u("lessons")}),(r=document.getElementById("readBible"))==null||r.addEventListener("click",()=>{u&&u("bible")}),(m=document.getElementById("signupPrompt"))==null||m.addEventListener("click",()=>{var l;(l=window.openAuthModal)==null||l.call(window,"signup")}),(p=document.getElementById("signinPrompt"))==null||p.addEventListener("click",()=>{var l;(l=window.openAuthModal)==null||l.call(window,"signin")})}let ce=null;function re(t,e){ce=e;const{showToast:s,updateStreak:o,navigateTo:i}=e,n=d.get("gsc-progress",{completedLessons:[]}),u=new Set(n.completedLessons||[]),L=C.filter(a=>!a.isWelcome);let y=`
        <div class="page active" id="lessonsPage">
            <div class="container">
                <h2 class="card-title">📚 All Lessons</h2>
                <div style="margin-bottom:16px;">
                    <input type="text" id="lessonSearch" placeholder="🔍 Search lessons..." 
                           style="width:100%; padding:10px 16px; border:1px solid rgba(0,0,0,0.08); 
                                  border-radius:var(--radius-sm); background:var(--bg-primary); 
                                  color:var(--text-primary); font-size:15px; outline:none;">
                </div>
                <div id="lessonList">
    `;L.forEach((a,r)=>{const m=u.has(a.id);y+=`
            <div class="lesson-list-item" data-lesson="${a.id}" data-index="${r}">
                <div class="lesson-status-icon ${m?"completed":""}">
                    ${m?'<i class="fas fa-check-circle"></i>':'<i class="fas fa-circle-o"></i>'}
                </div>
                <div class="lesson-info">
                    <div class="lesson-title">${a.title}</div>
                    ${a.subtitle?`<div class="lesson-sub">${a.subtitle}</div>`:""}
                </div>
                <div class="lesson-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
        `}),y+=`
                </div>
            </div>
        </div>
    `,t.innerHTML=y;const S=document.getElementById("lessonSearch");S&&S.addEventListener("input",function(){const a=this.value.toLowerCase().trim();document.querySelectorAll(".lesson-list-item").forEach(r=>{var l,b,v,E;const m=((b=(l=r.querySelector(".lesson-title"))==null?void 0:l.textContent)==null?void 0:b.toLowerCase())||"",p=((E=(v=r.querySelector(".lesson-sub"))==null?void 0:v.textContent)==null?void 0:E.toLowerCase())||"";r.style.display=m.includes(a)||p.includes(a)||!a?"flex":"none"})}),document.querySelectorAll(".lesson-list-item").forEach(a=>{a.addEventListener("click",function(){const r=parseInt(this.dataset.lesson);C.find(p=>p.id===r)&&de(t,r,s,o)})})}function de(t,e,s,o,i){var E,f,N,B,$;const n=C.find(g=>g.id===e);if(!n)return;const u=d.get("gsc-progress",{completedLessons:[]}),y=new Set(u.completedLessons||[]).has(e),a=d.get("gsc-notes",{})[e]||"";t.innerHTML=`
        <div class="page active" id="lessonDetail">
            <div class="container">
                <button class="back-to-books-btn" id="backToLessons">
                    <i class="fas fa-arrow-left"></i> Back to Lessons
                </button>

                <div class="card" style="padding:24px;">
                    <div class="lesson-badge">Lesson ${e}</div>
                    <h2 class="lesson-detail-title">${n.title}</h2>
                    ${n.subtitle?`<p class="lesson-detail-sub">${n.subtitle}</p>`:""}
                    <div class="lesson-detail-content">
                        ${n.content}
                    </div>

                    <!-- Meditation -->
                    ${n.meditation?`
                        <div class="meditation-block">
                            <strong>💭 Meditation</strong>
                            <p style="margin-top:4px; font-style:italic;">"${n.meditation.text}"</p>
                            <p style="font-size:14px; color:var(--text-light);">${n.meditation.instruction}</p>
                        </div>
                    `:""}

                    <!-- Exercise -->
                    ${n.exercise?`
                        <div class="exercise-block">
                            <strong>✍️ Exercise</strong>
                            <p style="margin-top:4px;">${n.exercise.text}</p>
                            ${n.exercise.declaration?`
                                <div class="declaration">"${n.exercise.declaration}"</div>
                            `:""}
                            <button class="mark-complete-btn" data-lesson="${e}" 
                                    style="margin-top:12px; padding:8px 24px; border-radius:var(--radius-full); 
                                           background:${y?"var(--accent-green)":"var(--accent-gold)"}; 
                                           color:#fff; font-weight:600; font-size:14px; border:none; cursor:pointer;">
                                ${y?"✅ Completed":"Mark Complete"}
                            </button>
                        </div>
                    `:""}

                    <!-- Read Aloud, Notes, Share -->
                    <div class="read-aloud-block">
                        <button class="read-aloud-btn" data-lesson="${e}">
                            <i class="fas fa-volume-up"></i>
                            <span>Read Aloud</span>
                        </button>
                        <button class="notes-toggle-btn ${a?"active":""}" data-lesson="${e}">
                            <i class="fas fa-sticky-note"></i>
                            <span>Notes</span>
                            ${a?'<span class="notes-badge">📝</span>':""}
                        </button>
                        <button class="share-btn" data-lesson="${e}">
                            <i class="fas fa-share-alt"></i>
                            <span>Share</span>
                        </button>
                    </div>

                    <!-- Notes Block -->
                    <div class="notes-block" id="notes-${e}" style="${a?"display:block;":"display:none;"}">
                        <div class="notes-header">
                            <div class="notes-title">
                                <i class="fas fa-sticky-note"></i>
                                <span>My Notes</span>
                            </div>
                            <div class="notes-actions">
                                <button class="save-btn" data-lesson="${e}">
                                    <i class="fas fa-save"></i> Save
                                </button>
                                <button class="clear-btn" data-lesson="${e}">
                                    <i class="fas fa-trash-alt"></i> Clear
                                </button>
                            </div>
                        </div>
                        <textarea class="notes-textarea" data-lesson="${e}" 
                                  placeholder="Write your thoughts, revelations, or key takeaways..."
                                  maxlength="2000">${a}</textarea>
                        <div class="notes-footer">
                            <span class="char-count">${a.length} / 2000</span>
                            <span class="saved-indicator ${a?"saved":"unsaved"}" id="savedIndicator-${e}">
                                <i class="fas ${a?"fa-check-circle":"fa-circle"}"></i>
                                ${a?"Saved":"Unsaved"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,(E=document.getElementById("backToLessons"))==null||E.addEventListener("click",()=>{re(t,ce)}),(f=document.querySelector(".mark-complete-btn"))==null||f.addEventListener("click",function(){const g=parseInt(this.dataset.lesson),c=d.get("gsc-progress",{completedLessons:[]}),h=new Set(c.completedLessons||[]);h.has(g)?h.delete(g):(h.add(g),o&&o()),c.completedLessons=Array.from(h),d.set("gsc-progress",c),s&&s(h.has(g)?"✅ Completed!":"Unmarked"),de(t,g,s,o)});const r=document.querySelector(".read-aloud-btn");if(r){const g=document.createElement("div");g.innerHTML=n.content;const c=(g.textContent||g.innerText||"").replace(/\s+/g," ").trim();let h=!1;const k=window.speechSynthesis;r.addEventListener("click",function(){if(h){k.cancel(),h=!1,this.classList.remove("playing"),this.querySelector("i").className="fas fa-volume-up",this.querySelector("span").textContent="Read Aloud";return}if(!window.speechSynthesis){s&&s("🔊 Text-to-speech not supported");return}const x=new SpeechSynthesisUtterance(c);x.rate=1,x.pitch=1,this.classList.add("playing"),this.querySelector("i").className="fas fa-stop",this.querySelector("span").textContent="Stop",k.speak(x),h=!0,x.onend=()=>{h=!1,this.classList.remove("playing"),this.querySelector("i").className="fas fa-volume-up",this.querySelector("span").textContent="Read Aloud"}})}const m=document.querySelector(".notes-toggle-btn"),p=document.getElementById(`notes-${e}`);m&&p&&m.addEventListener("click",function(){var c;const g=p.style.display!=="none";p.style.display=g?"none":"block",this.classList.toggle("active"),g||(c=p.querySelector("textarea"))==null||c.focus()});const l=document.querySelector(".notes-textarea"),b=document.querySelector(".char-count"),v=document.getElementById(`savedIndicator-${e}`);l&&(l.addEventListener("input",function(){const g=this.value.length;b&&(b.textContent=`${g} / 2000`),v&&(v.className="saved-indicator unsaved",v.innerHTML='<i class="fas fa-circle"></i> Unsaved')}),l.addEventListener("blur",function(){U(e,this.value,v,s)})),(N=document.querySelector(".save-btn"))==null||N.addEventListener("click",function(){const g=parseInt(this.dataset.lesson),c=document.querySelector(`.notes-textarea[data-lesson="${g}"]`);c&&U(g,c.value,v,s)}),(B=document.querySelector(".clear-btn"))==null||B.addEventListener("click",function(){var h,k;const g=parseInt(this.dataset.lesson),c=document.querySelector(`.notes-textarea[data-lesson="${g}"]`);if(!(c&&c.value&&!confirm("Clear all notes for this lesson?"))&&c){c.value="";const x=c.value.length;b&&(b.textContent=`${x} / 2000`),U(g,"",v,s),(h=document.querySelector(".notes-toggle-btn"))==null||h.classList.remove("active"),(k=document.querySelector(".notes-badge"))==null||k.remove()}}),($=document.querySelector(".share-btn"))==null||$.addEventListener("click",function(){const g=`📖 ${n.title}

${n.subtitle||""}

Read more at The Consciousness of the Son 🕊️`;navigator.share?navigator.share({title:n.title,text:g}):navigator.clipboard.writeText(g).then(()=>{s&&s("📋 Lesson shared!")})})}function U(t,e,s,o){const i=d.get("gsc-notes",{});if(e&&e.trim()?i[t]=e.trim():delete i[t],d.set("gsc-notes",i),s){const u=!!(e&&e.trim());s.className=`saved-indicator ${u?"saved":"unsaved"}`,s.innerHTML=`<i class="fas ${u?"fa-check-circle":"fa-circle"}"></i> ${u?"Saved":"Unsaved"}`}const n=document.querySelector(`.notes-toggle-btn[data-lesson="${t}"]`);if(n){const u=n.querySelector(".notes-badge");if(e&&e.trim()){if(!u){const L=document.createElement("span");L.className="notes-badge",L.textContent="📝",n.appendChild(L)}n.classList.add("active")}else u==null||u.remove(),n.classList.remove("active")}o&&o(e&&e.trim()?"📝 Notes saved!":"🗑️ Notes cleared")}const fe={Genesis:"gen",Exodus:"exo",Leviticus:"lev",Numbers:"num",Deuteronomy:"deu",Joshua:"jos",Judges:"jdg",Ruth:"rut","1 Samuel":"1sa","2 Samuel":"2sa","1 Kings":"1ki","2 Kings":"2ki","1 Chronicles":"1ch","2 Chronicles":"2ch",Ezra:"ezr",Nehemiah:"neh",Esther:"est",Job:"job",Psalms:"psa",Proverbs:"pro",Ecclesiastes:"ecc","Song of Solomon":"sng",Isaiah:"isa",Jeremiah:"jer",Lamentations:"lam",Ezekiel:"ezk",Daniel:"dan",Hosea:"hos",Joel:"jol",Amos:"amo",Obadiah:"oba",Jonah:"jon",Micah:"mic",Nahum:"nam",Habakkuk:"hab",Zephaniah:"zep",Haggai:"hag",Zechariah:"zec",Malachi:"mal",Matthew:"mat",Mark:"mrk",Luke:"luk",John:"jhn",Acts:"act",Romans:"rom","1 Corinthians":"1co","2 Corinthians":"2co",Galatians:"gal",Ephesians:"eph",Philippians:"php",Colossians:"col","1 Thessalonians":"1th","2 Thessalonians":"2th","1 Timothy":"1ti","2 Timothy":"2ti",Titus:"tit",Philemon:"phm",Hebrews:"heb",James:"jas","1 Peter":"1pe","2 Peter":"2pe","1 John":"1jn","2 John":"2jn","3 John":"3jn",Jude:"jud",Revelation:"rev"},be={Genesis:50,Exodus:40,Leviticus:27,Numbers:36,Deuteronomy:34,Joshua:24,Judges:21,Ruth:4,"1 Samuel":31,"2 Samuel":24,"1 Kings":22,"2 Kings":25,"1 Chronicles":29,"2 Chronicles":36,Ezra:10,Nehemiah:13,Esther:10,Job:42,Psalms:150,Proverbs:31,Ecclesiastes:12,"Song of Solomon":8,Isaiah:66,Jeremiah:52,Lamentations:5,Ezekiel:48,Daniel:12,Hosea:14,Joel:3,Amos:9,Obadiah:1,Jonah:4,Micah:7,Nahum:3,Habakkuk:3,Zephaniah:3,Haggai:2,Zechariah:14,Malachi:4,Matthew:28,Mark:16,Luke:24,John:21,Acts:28,Romans:16,"1 Corinthians":16,"2 Corinthians":13,Galatians:6,Ephesians:6,Philippians:4,Colossians:4,"1 Thessalonians":5,"2 Thessalonians":3,"1 Timothy":6,"2 Timothy":4,Titus:3,Philemon:1,Hebrews:13,James:5,"1 Peter":5,"2 Peter":3,"1 John":5,"2 John":1,"3 John":1,Jude:1,Revelation:22};function _(t){return be[t]||30}async function ye(t,e){const s=fe[t];if(!s)return console.error("Book not found:",t),[];try{const o=`https://bible-api.com/${s}+${e}?translation=kjv`,i=await fetch(o);if(!i.ok)return console.error("API Error:",i.status),[];const n=await i.json();return n&&n.verses&&n.verses.length>0?n.verses.map(u=>({verse:u.verse,text:u.text.trim()})):[]}catch(o){return console.error("Error fetching verses:",o),[]}}const ue=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi"],me=["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"],ke=[...ue,...me];function pe(t,e){var S;const{showToast:s}=e,o=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"});t.innerHTML=`
        <div class="page active" id="biblePage">
            <div class="container">
                <!-- Tabs -->
                <div class="bible-tabs">
                    <button class="tab-btn ${o.tab==="all"?"active":""}" data-tab="all">All</button>
                    <button class="tab-btn ${o.tab==="ot"?"active":""}" data-tab="ot">OT</button>
                    <button class="tab-btn ${o.tab==="nt"?"active":""}" data-tab="nt">NT</button>
                </div>

                <!-- Book Grid -->
                <div id="bibleBooks" class="bible-book-grid"></div>

                <!-- Chapters -->
                <div id="bibleChapters" class="bible-chapter-container" style="display:none;"></div>

                <!-- Content -->
                <div id="bibleContent">
                    <div class="bible-welcome">
                        <i class="fas fa-bible"></i>
                        <p>Select a book to read</p>
                    </div>
                </div>

                <!-- Actions -->
                <div id="bibleActions" class="bible-actions" style="display:none;">
                    <button class="action-btn" id="bibleReadAloud">
                        <i class="fas fa-volume-up"></i> Read Aloud
                    </button>
                    <button class="action-btn" id="bibleFavorite">
                        <i class="fas fa-star"></i> Favorite
                    </button>
                    <button class="action-btn" id="bibleShare">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>

                <!-- Back -->
                <div id="bibleBackBtn" style="display:none; margin-top:12px;">
                    <button class="back-to-books-btn" id="backToBooks">
                        <i class="fas fa-arrow-left"></i> Back to Books
                    </button>
                </div>
            </div>
        </div>
    `,(S=document.getElementById("backToBooks"))==null||S.addEventListener("click",function(){const a=d.get("gsc-bible-state",{});a.book=null,a.chapter=1,d.set("gsc-bible-state",a),pe(t,e)});function i(a){const r=document.getElementById("bibleBooks"),m=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"});let p=ke;a==="ot"&&(p=ue),a==="nt"&&(p=me),r.innerHTML=p.map(l=>`
            <div class="book-item ${l===m.book?"active":""}" data-book="${l}">
                <span class="book-name">${l}</span>
                <span class="book-chapters">${_(l)}</span>
            </div>
        `).join(""),r.querySelectorAll(".book-item").forEach(l=>{l.addEventListener("click",async function(){const b=this.dataset.book,v=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"});v.book=b,v.chapter=1,d.set("gsc-bible-state",v),document.getElementById("bibleBooks").style.display="none",document.getElementById("bibleActions").style.display="flex",document.getElementById("bibleBackBtn").style.display="block",document.querySelectorAll(".book-item").forEach(E=>E.classList.remove("active")),this.classList.add("active"),await n(b),await u(b,1)})})}async function n(a){const r=document.getElementById("bibleChapters"),m=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"}),p=_(a);r.style.display="block",r.innerHTML=`
            <div class="chapter-list-horizontal">
                ${Array.from({length:Math.min(p,50)},(l,b)=>b+1).map(l=>`
                    <button class="chapter-btn ${l===m.chapter?"active":""}" data-chapter="${l}">${l}</button>
                `).join("")}
            </div>
        `,r.querySelectorAll(".chapter-btn").forEach(l=>{l.addEventListener("click",async function(){const b=parseInt(this.dataset.chapter),v=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"});v.chapter=b,d.set("gsc-bible-state",v),r.querySelectorAll(".chapter-btn").forEach(E=>E.classList.remove("active")),this.classList.add("active"),await u(a,b)})})}async function u(a,r){const m=document.getElementById("bibleContent");m.innerHTML=`
            <div style="text-align:center; padding:20px;">
                <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>
        `;try{const p=await ye(a,r);p&&p.length>0?(m.innerHTML=`
                    <div class="verses-container">
                        <h3 class="verses-title">${a} ${r}</h3>
                        <div class="verses-list">
                            ${p.map(l=>`
                                <div class="verse-item">
                                    <span class="verse-number">${l.verse}</span>
                                    <span class="verse-text">${l.text}</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `,document.getElementById("bibleActions").style.display="flex",document.getElementById("bibleBackBtn").style.display="block",L(a,r,p)):m.innerHTML='<div class="bible-welcome"><p>No verses found</p></div>'}catch{m.innerHTML='<div class="bible-welcome"><p>⚠️ Error loading verses</p></div>'}}function L(a,r,m){var b,v,E;const p=m.map(f=>`${f.verse}. ${f.text}`).join(`
`),l=`${a} ${r}`;(b=document.getElementById("bibleReadAloud"))==null||b.addEventListener("click",function(){if(!window.speechSynthesis){s&&s("🔊 Text-to-speech not supported");return}const f=new SpeechSynthesisUtterance(p);f.rate=1,f.pitch=1,window.speechSynthesis.speak(f),s&&s("🔊 Reading aloud...")}),(v=document.getElementById("bibleFavorite"))==null||v.addEventListener("click",function(){const f=JSON.parse(localStorage.getItem("bible-favorites")||"[]");if(f.some(B=>B.reference===l)){const B=f.findIndex($=>$.reference===l);f.splice(B,1),localStorage.setItem("bible-favorites",JSON.stringify(f)),s&&s("⭐ Removed from favorites")}else f.push({reference:l,text:p.slice(0,200)+"..."}),localStorage.setItem("bible-favorites",JSON.stringify(f)),s&&s("⭐ Added to favorites!")}),(E=document.getElementById("bibleShare"))==null||E.addEventListener("click",function(){const f=`${l}

${p}`;navigator.share?navigator.share({title:l,text:f}).catch(()=>{}):navigator.clipboard.writeText(f).then(()=>{s&&s("📋 Copied to clipboard!")})})}document.querySelectorAll(".tab-btn").forEach(a=>{a.addEventListener("click",function(){const r=this.dataset.tab,m=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"});m.tab=r,m.book=null,m.chapter=1,d.set("gsc-bible-state",m),document.querySelectorAll(".tab-btn").forEach(p=>p.classList.remove("active")),this.classList.add("active"),document.getElementById("bibleBooks").style.display="grid",document.getElementById("bibleActions").style.display="none",document.getElementById("bibleBackBtn").style.display="none",document.getElementById("bibleChapters").style.display="none",document.getElementById("bibleContent").innerHTML=`
                <div class="bible-welcome">
                    <i class="fas fa-bible"></i>
                    <p>Select a book to read</p>
                </div>
            `,i(r)})});const y=d.get("gsc-bible-state",{book:null,chapter:1,tab:"all"});i(y.tab||"all"),y.book&&y.chapter&&(document.getElementById("bibleBooks").style.display="none",document.getElementById("bibleActions").style.display="flex",document.getElementById("bibleBackBtn").style.display="block",setTimeout(async()=>{await n(y.book),await u(y.book,y.chapter)},100))}function Ee(t,e){var E,f,N,B,$,g;const{user:s,showToast:o,navigateTo:i}=e,n=d.get("gsc-progress",{completedLessons:[]}),u=new Set(n.completedLessons||[]),L=C.filter(c=>!c.isWelcome),y=L.length,S=u.size,a=y>0?Math.round(S/y*100):0,r=d.get("gsc-streak",{count:0}).count||0,m=d.get("gsc-notes",{}),p=Object.keys(m).filter(c=>m[c]&&m[c].trim()).length,l=JSON.parse(localStorage.getItem("bible-favorites")||"[]"),b=((E=s==null?void 0:s.name)==null?void 0:E.split(" ").map(c=>c[0]).join("").toUpperCase().slice(0,2))||"GU",v=Array.from(u).slice(-5).reverse();t.innerHTML=`
        <div class="page active" id="profilePage">
            <div class="container">
                <!-- Profile Header -->
                <div class="card profile-header-card">
                    <div class="profile-avatar">${b}</div>
                    <div class="profile-name">${(s==null?void 0:s.name)||"Guest"}</div>
                    <div class="profile-email">${(s==null?void 0:s.email)||"guest@example.com"}</div>
                    <div class="profile-joined">${(s==null?void 0:s.joined)||"Guest"}</div>
                    <button class="edit-profile-btn" style="margin-top:12px; padding:6px 20px; border-radius:var(--radius-full); background:var(--accent-gold); color:#1a1210; font-weight:600; font-size:13px; border:none; cursor:pointer;">
                        <i class="fas fa-pen"></i> Edit Profile
                    </button>
                </div>

                <!-- Stats -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:12px;">📊 Stats</h3>
                    <div class="profile-stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">${S}/${y}</span>
                            <span class="stat-label">Lessons</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${r}</span>
                            <span class="stat-label">🔥 Streak</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${p}</span>
                            <span class="stat-label">📝 Notes</span>
                        </div>
                    </div>
                    <div class="profile-progress-bar">
                        <div class="profile-progress-track">
                            <div class="profile-progress-fill" style="width:${a}%;"></div>
                        </div>
                        <div class="profile-progress-info">
                            <span>${a}% Complete</span>
                            <span>${S} of ${y}</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:8px;">📋 Recent Activity</h3>
                    ${v.length===0?'<p style="color:var(--text-light); font-size:14px;">No lessons completed yet. Start your journey!</p>':v.map(c=>{const h=L.find(k=>k.id===c);return h?`
                                <div style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.03);">
                                    <i class="fas fa-check-circle" style="color:var(--accent-green);"></i>
                                    <span style="font-size:14px;">${h.title}</span>
                                </div>
                            `:""}).join("")}
                </div>

                <!-- Actions -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:8px;">⚙️ Account</h3>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <button class="profile-action-btn" id="exportNotesBtn">
                            <i class="fas fa-file-export"></i> Export All Notes
                        </button>
                        <button class="profile-action-btn" id="shareProgressBtn">
                            <i class="fas fa-share-alt"></i> Share Progress
                        </button>
                        <button class="profile-action-btn" id="viewFavoritesBtn">
                            <i class="fas fa-star"></i> Bible Favorites (${l.length})
                        </button>
                        <button class="profile-action-btn danger" id="signOutBtn">
                            <i class="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </div>
                </div>

                <div style="text-align:center; padding:8px 0; color:var(--text-light); font-size:12px;">
                    Version 2.0
                </div>
            </div>
        </div>
    `,(f=document.querySelector(".edit-profile-btn"))==null||f.addEventListener("click",function(){const c=(s==null?void 0:s.name)||"Guest",h=prompt("Enter your name:",c);if(h&&h.trim()){const k=d.get("gsc-profile",{name:"Guest User",email:"guest@example.com",joined:"Guest"});k.name=h.trim(),d.set("gsc-profile",k),o&&o("✅ Profile updated!"),i&&i("profile")}}),(N=document.getElementById("exportNotesBtn"))==null||N.addEventListener("click",function(){const c=d.get("gsc-notes",{}),h=Object.entries(c);if(h.length===0){o&&o("📝 No notes to export");return}let k=`📖 The Consciousness of the Son - Notes

`;h.forEach(([H,he])=>{const K=C.find(ve=>ve.id===parseInt(H)),W=K?K.title:`Lesson ${H}`;k+=`📘 ${W}
${"-".repeat(W.length+4)}
${he}

`});const x=new Blob([k],{type:"text/plain"}),P=URL.createObjectURL(x),M=document.createElement("a");M.href=P,M.download=`notes-${new Date().toISOString().slice(0,10)}.txt`,M.click(),URL.revokeObjectURL(P),o&&o("📥 Notes exported!")}),(B=document.getElementById("shareProgressBtn"))==null||B.addEventListener("click",function(){var M;const c=C.filter(H=>!H.isWelcome).length,k=((M=d.get("gsc-progress",{completedLessons:[]}).completedLessons)==null?void 0:M.length)||0,x=c>0?Math.round(k/c*100):0,P=`📖 I've completed ${k}/${c} lessons (${x}%) in "The Consciousness of the Son"! 🕊️

Join me at Grace Spring Family Church.`;navigator.share?navigator.share({title:"My Progress",text:P}):navigator.clipboard.writeText(P).then(()=>{o&&o("📋 Copied to clipboard!")})}),($=document.getElementById("viewFavoritesBtn"))==null||$.addEventListener("click",function(){const c=JSON.parse(localStorage.getItem("bible-favorites")||"[]");if(c.length===0){o&&o("⭐ No favorites yet");return}let h=`⭐ Bible Favorites

`;c.forEach(k=>{h+=`${k.reference}
${k.text}

`}),navigator.share?navigator.share({title:"My Bible Favorites",text:h}):navigator.clipboard.writeText(h).then(()=>{o&&o("📋 Favorites copied!")})}),(g=document.getElementById("signOutBtn"))==null||g.addEventListener("click",function(){if(confirm("Are you sure you want to sign out?")){const c={name:"Guest User",email:"guest@example.com",joined:"Guest"};d.set("gsc-profile",c),o&&o("👋 Signed out"),i&&i("home")}})}const O=document.getElementById("authModal"),Se=document.getElementById("authClose"),F=document.querySelectorAll(".auth-tab"),T={signin:document.getElementById("authSignIn"),signup:document.getElementById("authSignUp"),forgot:document.getElementById("authForgot")},Le=document.getElementById("authForgotLink"),xe=document.getElementById("authBackToSignIn"),Be=document.querySelectorAll(".auth-toggle-password");function we(t="signin"){O.classList.add("active"),R(t),document.body.style.overflow="hidden"}function j(){O.classList.remove("active"),document.body.style.overflow=""}Se.addEventListener("click",j);O.addEventListener("click",t=>{t.target===O&&j()});document.addEventListener("keydown",t=>{t.key==="Escape"&&j()});function R(t){F.forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),Object.keys(T).forEach(e=>{T[e].classList.toggle("active",e===t)}),t!=="forgot"&&(T.forgot.style.display="none")}F.forEach(t=>{t.addEventListener("click",()=>{R(t.dataset.tab)})});document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{R(t.dataset.tab)})});Le.addEventListener("click",()=>{T.signin.classList.remove("active"),T.signup.classList.remove("active"),T.forgot.style.display="block",F.forEach(t=>t.classList.remove("active"))});xe.addEventListener("click",()=>{T.forgot.style.display="none",R("signin")});Be.forEach(t=>{t.addEventListener("click",function(){const e=this.dataset.target,s=document.getElementById(e);if(s){const o=s.type==="password"?"text":"password";s.type=o,this.querySelector("i").className=o==="password"?"fas fa-eye":"fas fa-eye-slash"}})});const V=document.getElementById("signupPassword"),$e=document.querySelectorAll("#authStrength .auth-strength-bar span"),Y=document.querySelector("#authStrength .auth-strength-text");V&&V.addEventListener("input",function(){const t=this.value,e=Ie(t);$e.forEach((s,o)=>{s.className="",o<e.level&&s.classList.add("active",e.class)}),Y.textContent=e.label,Y.className="auth-strength-text "+e.class});function Ie(t){let e=0;return t.length>=8&&e++,t.length>=12&&e++,/[a-z]/.test(t)&&/[A-Z]/.test(t)&&e++,/\d/.test(t)&&e++,/[^a-zA-Z0-9]/.test(t)&&e++,e<=1?{level:1,class:"weak",label:"Weak — add more characters"}:e<=3?{level:2,class:"medium",label:"Medium — add symbols"}:e<=4?{level:3,class:"strong",label:"Strong! 💪"}:{level:4,class:"strong",label:"Very Strong! 🎉"}}var ee;(ee=document.getElementById("signinForm"))==null||ee.addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("signinEmail").value,s=document.getElementById("signinPassword").value;console.log("🔐 Sign In:",{email:e,password:s}),alert("✅ Sign In - Connect to Supabase")});var te;(te=document.getElementById("signupForm"))==null||te.addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("signupName").value,s=document.getElementById("signupEmail").value,o=document.getElementById("signupPassword").value,i=document.getElementById("signupConfirm").value,n=document.getElementById("authTerms").checked;if(o!==i){alert("❌ Passwords do not match");return}if(!n){alert("❌ Please agree to Terms & Conditions");return}console.log("📝 Sign Up:",{name:e,email:s,password:o}),alert("✅ Sign Up - Connect to Supabase")});var se;(se=document.getElementById("forgotForm"))==null||se.addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("forgotEmail").value;console.log("🔑 Forgot Password:",{email:e}),alert("📧 Password reset link sent to "+e)});var ne;(ne=document.getElementById("authGoogle"))==null||ne.addEventListener("click",()=>{alert("🔐 Google Sign In - Connect to Supabase")});var oe;(oe=document.getElementById("authGoogleUp"))==null||oe.addEventListener("click",()=>{alert("📝 Google Sign Up - Connect to Supabase")});var ae;(ae=document.getElementById("authGitHub"))==null||ae.addEventListener("click",()=>{alert("🔐 GitHub Sign In - Connect to Supabase")});var ie;(ie=document.getElementById("authGitHubUp"))==null||ie.addEventListener("click",()=>{alert("📝 GitHub Sign Up - Connect to Supabase")});window.openAuthModal=we;window.closeAuthModal=j;console.log("🚀 App initialized");const A={name:"The Consciousness of the Son",version:"2.0.0",storageKeys:{theme:"gsc-theme",profile:"gsc-profile",streak:"gsc-streak"}};let G=d.get(A.storageKeys.theme,!1),w=d.get(A.storageKeys.profile,{name:"Guest User",email:"guest@example.com",joined:"Guest"});const J=document.getElementById("mainContent"),D=document.getElementById("themeToggle"),Q=document.getElementById("toast"),Ce=document.getElementById("toastMessage");function ge(){G?(document.documentElement.setAttribute("data-theme","dark"),D.innerHTML='<i class="fas fa-sun"></i>'):(document.documentElement.removeAttribute("data-theme"),D.innerHTML='<i class="fas fa-moon"></i>'),d.set(A.storageKeys.theme,G)}D.addEventListener("click",()=>{G=!G,ge()});let X;function q(t){Ce.textContent=t,Q.classList.add("show"),clearTimeout(X),X=setTimeout(()=>{Q.classList.remove("show")},3e3)}function z(){const t=new Date().toDateString(),e=d.get(A.storageKeys.streak,{count:0,lastActive:null});if(e.lastActive===t)return e.count;const s=new Date;s.setDate(s.getDate()-1);const o=s.toDateString();return e.lastActive===o?e.count+=1:e.lastActive!==t&&(e.count=1),e.lastActive=t,d.set(A.storageKeys.streak,e),e.count}function I(t){switch(console.log("🔀 Navigating to:",t),document.querySelectorAll(".nav-item").forEach(e=>{e.classList.toggle("active",e.dataset.page===t)}),t){case"home":Z(J,{showToast:q,updateStreak:z,userProfile:w,isLoggedIn:(w==null?void 0:w.name)!=="Guest User",navigateTo:I});break;case"lessons":re(J,{showToast:q,updateStreak:z,navigateTo:I});break;case"bible":pe(J,{showToast:q});break;case"profile":Ee(J,{user:w,showToast:q,navigateTo:I});break;default:Z(J,{showToast:q,updateStreak:z,userProfile:w,isLoggedIn:(w==null?void 0:w.name)!=="Guest User",navigateTo:I})}window.scrollTo({top:0,behavior:"smooth"})}document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.page;e&&I(e)})});var le;(le=document.getElementById("brandHome"))==null||le.addEventListener("click",()=>{I("home")});function Te(){console.log("🚀 Starting app..."),ge(),I("home"),console.log(`📖 ${A.name} v${A.version}`),console.log("✅ App ready!")}Te();
