(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={get(e,t=null){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}},remove(e){try{return localStorage.removeItem(e),!0}catch{return!1}}},t=[];function n(n,r){let{showToast:i,updateStreak:a,userProfile:o,isLoggedIn:s,navigateTo:c}=r,l=t.filter(e=>!e.isWelcome).length,u=e.get(`gsc-progress`,{completedLessons:[]}).completedLessons?.length||0;l>0&&Math.round(u/l*100),a&&a(),n.innerHTML=`
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
                    Welcome back, <strong>${o?.name||`Guest`}</strong>!
                    ${u===0?`Start your journey today.`:`Keep going! You're doing great. 🎉`}
                </div>

                <!-- Auth Prompt -->
                ${s?`
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
    `,document.getElementById(`continueLearning`)?.addEventListener(`click`,()=>{c&&c(`lessons`)}),document.getElementById(`readBible`)?.addEventListener(`click`,()=>{c&&c(`bible`)}),document.getElementById(`signupPrompt`)?.addEventListener(`click`,()=>{window.openAuthModal?.(`signup`)}),document.getElementById(`signinPrompt`)?.addEventListener(`click`,()=>{window.openAuthModal?.(`signin`)})}var r=null;function i(n,i){r=i;let{showToast:o,updateStreak:s,navigateTo:c}=i,l=e.get(`gsc-progress`,{completedLessons:[]}),u=new Set(l.completedLessons||[]),d=t.filter(e=>!e.isWelcome),f=`
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
    `;d.forEach((e,t)=>{let n=u.has(e.id);f+=`
            <div class="lesson-list-item" data-lesson="${e.id}" data-index="${t}">
                <div class="lesson-status-icon ${n?`completed`:``}">
                    ${n?`<i class="fas fa-check-circle"></i>`:`<i class="fas fa-circle-o"></i>`}
                </div>
                <div class="lesson-info">
                    <div class="lesson-title">${e.title}</div>
                    ${e.subtitle?`<div class="lesson-sub">${e.subtitle}</div>`:``}
                </div>
                <div class="lesson-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
        `}),f+=`
                </div>
            </div>
        </div>
    `,n.innerHTML=f;let p=document.getElementById(`lessonSearch`);p&&p.addEventListener(`input`,function(){let e=this.value.toLowerCase().trim();document.querySelectorAll(`.lesson-list-item`).forEach(t=>{let n=t.querySelector(`.lesson-title`)?.textContent?.toLowerCase()||``,r=t.querySelector(`.lesson-sub`)?.textContent?.toLowerCase()||``;t.style.display=n.includes(e)||r.includes(e)||!e?`flex`:`none`})}),document.querySelectorAll(`.lesson-list-item`).forEach(e=>{e.addEventListener(`click`,function(){let e=parseInt(this.dataset.lesson);t.find(t=>t.id===e)&&a(n,e,o,s,c)})})}function a(n,s,c,l,u){let d=t.find(e=>e.id===s);if(!d)return;let f=e.get(`gsc-progress`,{completedLessons:[]}),p=new Set(f.completedLessons||[]).has(s),m=e.get(`gsc-notes`,{})[s]||``;n.innerHTML=`
        <div class="page active" id="lessonDetail">
            <div class="container">
                <button class="back-to-books-btn" id="backToLessons">
                    <i class="fas fa-arrow-left"></i> Back to Lessons
                </button>

                <div class="card" style="padding:24px;">
                    <div class="lesson-badge">Lesson ${s}</div>
                    <h2 class="lesson-detail-title">${d.title}</h2>
                    ${d.subtitle?`<p class="lesson-detail-sub">${d.subtitle}</p>`:``}
                    <div class="lesson-detail-content">
                        ${d.content}
                    </div>

                    <!-- Meditation -->
                    ${d.meditation?`
                        <div class="meditation-block">
                            <strong>💭 Meditation</strong>
                            <p style="margin-top:4px; font-style:italic;">"${d.meditation.text}"</p>
                            <p style="font-size:14px; color:var(--text-light);">${d.meditation.instruction}</p>
                        </div>
                    `:``}

                    <!-- Exercise -->
                    ${d.exercise?`
                        <div class="exercise-block">
                            <strong>✍️ Exercise</strong>
                            <p style="margin-top:4px;">${d.exercise.text}</p>
                            ${d.exercise.declaration?`
                                <div class="declaration">"${d.exercise.declaration}"</div>
                            `:``}
                            <button class="mark-complete-btn" data-lesson="${s}" 
                                    style="margin-top:12px; padding:8px 24px; border-radius:var(--radius-full); 
                                           background:${p?`var(--accent-green)`:`var(--accent-gold)`}; 
                                           color:#fff; font-weight:600; font-size:14px; border:none; cursor:pointer;">
                                ${p?`✅ Completed`:`Mark Complete`}
                            </button>
                        </div>
                    `:``}

                    <!-- Read Aloud, Notes, Share -->
                    <div class="read-aloud-block">
                        <button class="read-aloud-btn" data-lesson="${s}">
                            <i class="fas fa-volume-up"></i>
                            <span>Read Aloud</span>
                        </button>
                        <button class="notes-toggle-btn ${m?`active`:``}" data-lesson="${s}">
                            <i class="fas fa-sticky-note"></i>
                            <span>Notes</span>
                            ${m?`<span class="notes-badge">📝</span>`:``}
                        </button>
                        <button class="share-btn" data-lesson="${s}">
                            <i class="fas fa-share-alt"></i>
                            <span>Share</span>
                        </button>
                    </div>

                    <!-- Notes Block -->
                    <div class="notes-block" id="notes-${s}" style="${m?`display:block;`:`display:none;`}">
                        <div class="notes-header">
                            <div class="notes-title">
                                <i class="fas fa-sticky-note"></i>
                                <span>My Notes</span>
                            </div>
                            <div class="notes-actions">
                                <button class="save-btn" data-lesson="${s}">
                                    <i class="fas fa-save"></i> Save
                                </button>
                                <button class="clear-btn" data-lesson="${s}">
                                    <i class="fas fa-trash-alt"></i> Clear
                                </button>
                            </div>
                        </div>
                        <textarea class="notes-textarea" data-lesson="${s}" 
                                  placeholder="Write your thoughts, revelations, or key takeaways..."
                                  maxlength="2000">${m}</textarea>
                        <div class="notes-footer">
                            <span class="char-count">${m.length} / 2000</span>
                            <span class="saved-indicator ${m?`saved`:`unsaved`}" id="savedIndicator-${s}">
                                <i class="fas ${m?`fa-check-circle`:`fa-circle`}"></i>
                                ${m?`Saved`:`Unsaved`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,document.getElementById(`backToLessons`)?.addEventListener(`click`,()=>{i(n,r)}),document.querySelector(`.mark-complete-btn`)?.addEventListener(`click`,function(){let t=parseInt(this.dataset.lesson),r=e.get(`gsc-progress`,{completedLessons:[]}),i=new Set(r.completedLessons||[]);i.has(t)?i.delete(t):(i.add(t),l&&l()),r.completedLessons=Array.from(i),e.set(`gsc-progress`,r),c&&c(i.has(t)?`✅ Completed!`:`Unmarked`),a(n,t,c,l,u)});let h=document.querySelector(`.read-aloud-btn`);if(h){let e=document.createElement(`div`);e.innerHTML=d.content;let t=(e.textContent||e.innerText||``).replace(/\s+/g,` `).trim(),n=!1,r=window.speechSynthesis;h.addEventListener(`click`,function(){if(n){r.cancel(),n=!1,this.classList.remove(`playing`),this.querySelector(`i`).className=`fas fa-volume-up`,this.querySelector(`span`).textContent=`Read Aloud`;return}if(!window.speechSynthesis){c&&c(`🔊 Text-to-speech not supported`);return}let e=new SpeechSynthesisUtterance(t);e.rate=1,e.pitch=1,this.classList.add(`playing`),this.querySelector(`i`).className=`fas fa-stop`,this.querySelector(`span`).textContent=`Stop`,r.speak(e),n=!0,e.onend=()=>{n=!1,this.classList.remove(`playing`),this.querySelector(`i`).className=`fas fa-volume-up`,this.querySelector(`span`).textContent=`Read Aloud`}})}let g=document.querySelector(`.notes-toggle-btn`),_=document.getElementById(`notes-${s}`);g&&_&&g.addEventListener(`click`,function(){let e=_.style.display!==`none`;_.style.display=e?`none`:`block`,this.classList.toggle(`active`),e||_.querySelector(`textarea`)?.focus()});let v=document.querySelector(`.notes-textarea`),y=document.querySelector(`.char-count`),b=document.getElementById(`savedIndicator-${s}`);v&&(v.addEventListener(`input`,function(){let e=this.value.length;y&&(y.textContent=`${e} / 2000`),b&&(b.className=`saved-indicator unsaved`,b.innerHTML=`<i class="fas fa-circle"></i> Unsaved`)}),v.addEventListener(`blur`,function(){o(s,this.value,b,c)})),document.querySelector(`.save-btn`)?.addEventListener(`click`,function(){let e=parseInt(this.dataset.lesson),t=document.querySelector(`.notes-textarea[data-lesson="${e}"]`);t&&o(e,t.value,b,c)}),document.querySelector(`.clear-btn`)?.addEventListener(`click`,function(){let e=parseInt(this.dataset.lesson),t=document.querySelector(`.notes-textarea[data-lesson="${e}"]`);if(!(t&&t.value&&!confirm(`Clear all notes for this lesson?`))&&t){t.value=``;let n=t.value.length;y&&(y.textContent=`${n} / 2000`),o(e,``,b,c),document.querySelector(`.notes-toggle-btn`)?.classList.remove(`active`),document.querySelector(`.notes-badge`)?.remove()}}),document.querySelector(`.share-btn`)?.addEventListener(`click`,function(){let e=`📖 ${d.title}\n\n${d.subtitle||``}\n\nRead more at The Consciousness of the Son 🕊️`;navigator.share?navigator.share({title:d.title,text:e}):navigator.clipboard.writeText(e).then(()=>{c&&c(`📋 Lesson shared!`)})})}function o(t,n,r,i){let a=e.get(`gsc-notes`,{});if(n&&n.trim()?a[t]=n.trim():delete a[t],e.set(`gsc-notes`,a),r){let e=!!(n&&n.trim());r.className=`saved-indicator ${e?`saved`:`unsaved`}`,r.innerHTML=`<i class="fas ${e?`fa-check-circle`:`fa-circle`}"></i> ${e?`Saved`:`Unsaved`}`}let o=document.querySelector(`.notes-toggle-btn[data-lesson="${t}"]`);if(o){let e=o.querySelector(`.notes-badge`);if(n&&n.trim()){if(!e){let e=document.createElement(`span`);e.className=`notes-badge`,e.textContent=`📝`,o.appendChild(e)}o.classList.add(`active`)}else e?.remove(),o.classList.remove(`active`)}i&&i(n&&n.trim()?`📝 Notes saved!`:`🗑️ Notes cleared`)}var s={Genesis:`gen`,Exodus:`exo`,Leviticus:`lev`,Numbers:`num`,Deuteronomy:`deu`,Joshua:`jos`,Judges:`jdg`,Ruth:`rut`,"1 Samuel":`1sa`,"2 Samuel":`2sa`,"1 Kings":`1ki`,"2 Kings":`2ki`,"1 Chronicles":`1ch`,"2 Chronicles":`2ch`,Ezra:`ezr`,Nehemiah:`neh`,Esther:`est`,Job:`job`,Psalms:`psa`,Proverbs:`pro`,Ecclesiastes:`ecc`,"Song of Solomon":`sng`,Isaiah:`isa`,Jeremiah:`jer`,Lamentations:`lam`,Ezekiel:`ezk`,Daniel:`dan`,Hosea:`hos`,Joel:`jol`,Amos:`amo`,Obadiah:`oba`,Jonah:`jon`,Micah:`mic`,Nahum:`nam`,Habakkuk:`hab`,Zephaniah:`zep`,Haggai:`hag`,Zechariah:`zec`,Malachi:`mal`,Matthew:`mat`,Mark:`mrk`,Luke:`luk`,John:`jhn`,Acts:`act`,Romans:`rom`,"1 Corinthians":`1co`,"2 Corinthians":`2co`,Galatians:`gal`,Ephesians:`eph`,Philippians:`php`,Colossians:`col`,"1 Thessalonians":`1th`,"2 Thessalonians":`2th`,"1 Timothy":`1ti`,"2 Timothy":`2ti`,Titus:`tit`,Philemon:`phm`,Hebrews:`heb`,James:`jas`,"1 Peter":`1pe`,"2 Peter":`2pe`,"1 John":`1jn`,"2 John":`2jn`,"3 John":`3jn`,Jude:`jud`,Revelation:`rev`},c={Genesis:50,Exodus:40,Leviticus:27,Numbers:36,Deuteronomy:34,Joshua:24,Judges:21,Ruth:4,"1 Samuel":31,"2 Samuel":24,"1 Kings":22,"2 Kings":25,"1 Chronicles":29,"2 Chronicles":36,Ezra:10,Nehemiah:13,Esther:10,Job:42,Psalms:150,Proverbs:31,Ecclesiastes:12,"Song of Solomon":8,Isaiah:66,Jeremiah:52,Lamentations:5,Ezekiel:48,Daniel:12,Hosea:14,Joel:3,Amos:9,Obadiah:1,Jonah:4,Micah:7,Nahum:3,Habakkuk:3,Zephaniah:3,Haggai:2,Zechariah:14,Malachi:4,Matthew:28,Mark:16,Luke:24,John:21,Acts:28,Romans:16,"1 Corinthians":16,"2 Corinthians":13,Galatians:6,Ephesians:6,Philippians:4,Colossians:4,"1 Thessalonians":5,"2 Thessalonians":3,"1 Timothy":6,"2 Timothy":4,Titus:3,Philemon:1,Hebrews:13,James:5,"1 Peter":5,"2 Peter":3,"1 John":5,"2 John":1,"3 John":1,Jude:1,Revelation:22};function l(e){return c[e]||30}async function u(e,t){let n=s[e];if(!n)return console.error(`Book not found:`,e),[];try{let e=`https://bible-api.com/${n}+${t}?translation=kjv`,r=await fetch(e);if(!r.ok)return console.error(`API Error:`,r.status),[];let i=await r.json();return i&&i.verses&&i.verses.length>0?i.verses.map(e=>({verse:e.verse,text:e.text.trim()})):[]}catch(e){return console.error(`Error fetching verses:`,e),[]}}var d=`Genesis.Exodus.Leviticus.Numbers.Deuteronomy.Joshua.Judges.Ruth.1 Samuel.2 Samuel.1 Kings.2 Kings.1 Chronicles.2 Chronicles.Ezra.Nehemiah.Esther.Job.Psalms.Proverbs.Ecclesiastes.Song of Solomon.Isaiah.Jeremiah.Lamentations.Ezekiel.Daniel.Hosea.Joel.Amos.Obadiah.Jonah.Micah.Nahum.Habakkuk.Zephaniah.Haggai.Zechariah.Malachi`.split(`.`),f=`Matthew.Mark.Luke.John.Acts.Romans.1 Corinthians.2 Corinthians.Galatians.Ephesians.Philippians.Colossians.1 Thessalonians.2 Thessalonians.1 Timothy.2 Timothy.Titus.Philemon.Hebrews.James.1 Peter.2 Peter.1 John.2 John.3 John.Jude.Revelation`.split(`.`),p=[...d,...f];function m(t,n){let{showToast:r}=n,i=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`});t.innerHTML=`
        <div class="page active" id="biblePage">
            <div class="container">
                <!-- Tabs -->
                <div class="bible-tabs">
                    <button class="tab-btn ${i.tab===`all`?`active`:``}" data-tab="all">All</button>
                    <button class="tab-btn ${i.tab===`ot`?`active`:``}" data-tab="ot">OT</button>
                    <button class="tab-btn ${i.tab===`nt`?`active`:``}" data-tab="nt">NT</button>
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
    `,document.getElementById(`backToBooks`)?.addEventListener(`click`,function(){let r=e.get(`gsc-bible-state`,{});r.book=null,r.chapter=1,e.set(`gsc-bible-state`,r),m(t,n)});function a(t){let n=document.getElementById(`bibleBooks`),r=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`}),i=p;t===`ot`&&(i=d),t===`nt`&&(i=f),n.innerHTML=i.map(e=>`
            <div class="book-item ${e===r.book?`active`:``}" data-book="${e}">
                <span class="book-name">${e}</span>
                <span class="book-chapters">${l(e)}</span>
            </div>
        `).join(``),n.querySelectorAll(`.book-item`).forEach(t=>{t.addEventListener(`click`,async function(){let t=this.dataset.book,n=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`});n.book=t,n.chapter=1,e.set(`gsc-bible-state`,n),document.getElementById(`bibleBooks`).style.display=`none`,document.getElementById(`bibleActions`).style.display=`flex`,document.getElementById(`bibleBackBtn`).style.display=`block`,document.querySelectorAll(`.book-item`).forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),await o(t),await s(t,1)})})}async function o(t){let n=document.getElementById(`bibleChapters`),r=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`}),i=l(t);n.style.display=`block`,n.innerHTML=`
            <div class="chapter-list-horizontal">
                ${Array.from({length:Math.min(i,50)},(e,t)=>t+1).map(e=>`
                    <button class="chapter-btn ${e===r.chapter?`active`:``}" data-chapter="${e}">${e}</button>
                `).join(``)}
            </div>
        `,n.querySelectorAll(`.chapter-btn`).forEach(r=>{r.addEventListener(`click`,async function(){let r=parseInt(this.dataset.chapter),i=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`});i.chapter=r,e.set(`gsc-bible-state`,i),n.querySelectorAll(`.chapter-btn`).forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),await s(t,r)})})}async function s(e,t){let n=document.getElementById(`bibleContent`);n.innerHTML=`
            <div style="text-align:center; padding:20px;">
                <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>
        `;try{let r=await u(e,t);r&&r.length>0?(n.innerHTML=`
                    <div class="verses-container">
                        <h3 class="verses-title">${e} ${t}</h3>
                        <div class="verses-list">
                            ${r.map(e=>`
                                <div class="verse-item">
                                    <span class="verse-number">${e.verse}</span>
                                    <span class="verse-text">${e.text}</span>
                                </div>
                            `).join(``)}
                        </div>
                    </div>
                `,document.getElementById(`bibleActions`).style.display=`flex`,document.getElementById(`bibleBackBtn`).style.display=`block`,c(e,t,r)):n.innerHTML=`<div class="bible-welcome"><p>No verses found</p></div>`}catch{n.innerHTML=`<div class="bible-welcome"><p>⚠️ Error loading verses</p></div>`}}function c(e,t,n){let i=n.map(e=>`${e.verse}. ${e.text}`).join(`
`),a=`${e} ${t}`;document.getElementById(`bibleReadAloud`)?.addEventListener(`click`,function(){if(!window.speechSynthesis){r&&r(`🔊 Text-to-speech not supported`);return}let e=new SpeechSynthesisUtterance(i);e.rate=1,e.pitch=1,window.speechSynthesis.speak(e),r&&r(`🔊 Reading aloud...`)}),document.getElementById(`bibleFavorite`)?.addEventListener(`click`,function(){let e=JSON.parse(localStorage.getItem(`bible-favorites`)||`[]`);if(e.some(e=>e.reference===a)){let t=e.findIndex(e=>e.reference===a);e.splice(t,1),localStorage.setItem(`bible-favorites`,JSON.stringify(e)),r&&r(`⭐ Removed from favorites`)}else e.push({reference:a,text:i.slice(0,200)+`...`}),localStorage.setItem(`bible-favorites`,JSON.stringify(e)),r&&r(`⭐ Added to favorites!`)}),document.getElementById(`bibleShare`)?.addEventListener(`click`,function(){let e=`${a}\n\n${i}`;navigator.share?navigator.share({title:a,text:e}).catch(()=>{}):navigator.clipboard.writeText(e).then(()=>{r&&r(`📋 Copied to clipboard!`)})})}document.querySelectorAll(`.tab-btn`).forEach(t=>{t.addEventListener(`click`,function(){let t=this.dataset.tab,n=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`});n.tab=t,n.book=null,n.chapter=1,e.set(`gsc-bible-state`,n),document.querySelectorAll(`.tab-btn`).forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),document.getElementById(`bibleBooks`).style.display=`grid`,document.getElementById(`bibleActions`).style.display=`none`,document.getElementById(`bibleBackBtn`).style.display=`none`,document.getElementById(`bibleChapters`).style.display=`none`,document.getElementById(`bibleContent`).innerHTML=`
                <div class="bible-welcome">
                    <i class="fas fa-bible"></i>
                    <p>Select a book to read</p>
                </div>
            `,a(t)})});let h=e.get(`gsc-bible-state`,{book:null,chapter:1,tab:`all`});a(h.tab||`all`),h.book&&h.chapter&&(document.getElementById(`bibleBooks`).style.display=`none`,document.getElementById(`bibleActions`).style.display=`flex`,document.getElementById(`bibleBackBtn`).style.display=`block`,setTimeout(async()=>{await o(h.book),await s(h.book,h.chapter)},100))}function h(n,r){let{user:i,showToast:a,navigateTo:o}=r,s=e.get(`gsc-progress`,{completedLessons:[]}),c=new Set(s.completedLessons||[]),l=t.filter(e=>!e.isWelcome),u=l.length,d=c.size,f=u>0?Math.round(d/u*100):0,p=e.get(`gsc-streak`,{count:0}).count||0,m=e.get(`gsc-notes`,{}),h=Object.keys(m).filter(e=>m[e]&&m[e].trim()).length,g=JSON.parse(localStorage.getItem(`bible-favorites`)||`[]`),_=i?.name?.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2)||`GU`,v=Array.from(c).slice(-5).reverse();n.innerHTML=`
        <div class="page active" id="profilePage">
            <div class="container">
                <!-- Profile Header -->
                <div class="card profile-header-card">
                    <div class="profile-avatar">${_}</div>
                    <div class="profile-name">${i?.name||`Guest`}</div>
                    <div class="profile-email">${i?.email||`guest@example.com`}</div>
                    <div class="profile-joined">${i?.joined||`Guest`}</div>
                    <button class="edit-profile-btn" style="margin-top:12px; padding:6px 20px; border-radius:var(--radius-full); background:var(--accent-gold); color:#1a1210; font-weight:600; font-size:13px; border:none; cursor:pointer;">
                        <i class="fas fa-pen"></i> Edit Profile
                    </button>
                </div>

                <!-- Stats -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:12px;">📊 Stats</h3>
                    <div class="profile-stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">${d}/${u}</span>
                            <span class="stat-label">Lessons</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${p}</span>
                            <span class="stat-label">🔥 Streak</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${h}</span>
                            <span class="stat-label">📝 Notes</span>
                        </div>
                    </div>
                    <div class="profile-progress-bar">
                        <div class="profile-progress-track">
                            <div class="profile-progress-fill" style="width:${f}%;"></div>
                        </div>
                        <div class="profile-progress-info">
                            <span>${f}% Complete</span>
                            <span>${d} of ${u}</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="card">
                    <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:8px;">📋 Recent Activity</h3>
                    ${v.length===0?`<p style="color:var(--text-light); font-size:14px;">No lessons completed yet. Start your journey!</p>`:v.map(e=>{let t=l.find(t=>t.id===e);return t?`
                                <div style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.03);">
                                    <i class="fas fa-check-circle" style="color:var(--accent-green);"></i>
                                    <span style="font-size:14px;">${t.title}</span>
                                </div>
                            `:``}).join(``)}
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
                            <i class="fas fa-star"></i> Bible Favorites (${g.length})
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
    `,document.querySelector(`.edit-profile-btn`)?.addEventListener(`click`,function(){let t=i?.name||`Guest`,n=prompt(`Enter your name:`,t);if(n&&n.trim()){let t=e.get(`gsc-profile`,{name:`Guest User`,email:`guest@example.com`,joined:`Guest`});t.name=n.trim(),e.set(`gsc-profile`,t),a&&a(`✅ Profile updated!`),o&&o(`profile`)}}),document.getElementById(`exportNotesBtn`)?.addEventListener(`click`,function(){let n=e.get(`gsc-notes`,{}),r=Object.entries(n);if(r.length===0){a&&a(`📝 No notes to export`);return}let i=`📖 The Consciousness of the Son - Notes

`;r.forEach(([e,n])=>{let r=t.find(t=>t.id===parseInt(e)),a=r?r.title:`Lesson ${e}`;i+=`📘 ${a}\n${`-`.repeat(a.length+4)}\n${n}\n\n`});let o=new Blob([i],{type:`text/plain`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=`notes-${new Date().toISOString().slice(0,10)}.txt`,c.click(),URL.revokeObjectURL(s),a&&a(`📥 Notes exported!`)}),document.getElementById(`shareProgressBtn`)?.addEventListener(`click`,function(){let n=t.filter(e=>!e.isWelcome).length,r=e.get(`gsc-progress`,{completedLessons:[]}).completedLessons?.length||0,i=`📖 I've completed ${r}/${n} lessons (${n>0?Math.round(r/n*100):0}%) in "The Consciousness of the Son"! 🕊️\n\nJoin me at Grace Spring Family Church.`;navigator.share?navigator.share({title:`My Progress`,text:i}):navigator.clipboard.writeText(i).then(()=>{a&&a(`📋 Copied to clipboard!`)})}),document.getElementById(`viewFavoritesBtn`)?.addEventListener(`click`,function(){let e=JSON.parse(localStorage.getItem(`bible-favorites`)||`[]`);if(e.length===0){a&&a(`⭐ No favorites yet`);return}let t=`⭐ Bible Favorites

`;e.forEach(e=>{t+=`${e.reference}\n${e.text}\n\n`}),navigator.share?navigator.share({title:`My Bible Favorites`,text:t}):navigator.clipboard.writeText(t).then(()=>{a&&a(`📋 Favorites copied!`)})}),document.getElementById(`signOutBtn`)?.addEventListener(`click`,function(){confirm(`Are you sure you want to sign out?`)&&(e.set(`gsc-profile`,{name:`Guest User`,email:`guest@example.com`,joined:`Guest`}),a&&a(`👋 Signed out`),o&&o(`home`))})}var g=document.getElementById(`authModal`),_=document.getElementById(`authClose`),v=document.querySelectorAll(`.auth-tab`),y={signin:document.getElementById(`authSignIn`),signup:document.getElementById(`authSignUp`),forgot:document.getElementById(`authForgot`)},b=document.getElementById(`authForgotLink`),x=document.getElementById(`authBackToSignIn`),S=document.querySelectorAll(`.auth-toggle-password`);function C(e=`signin`){g.classList.add(`active`),T(e),document.body.style.overflow=`hidden`}function w(){g.classList.remove(`active`),document.body.style.overflow=``}_.addEventListener(`click`,w),g.addEventListener(`click`,e=>{e.target===g&&w()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&w()});function T(e){v.forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),Object.keys(y).forEach(t=>{y[t].classList.toggle(`active`,t===e)}),e!==`forgot`&&(y.forgot.style.display=`none`)}v.forEach(e=>{e.addEventListener(`click`,()=>{T(e.dataset.tab)})}),document.querySelectorAll(`[data-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{T(e.dataset.tab)})}),b.addEventListener(`click`,()=>{y.signin.classList.remove(`active`),y.signup.classList.remove(`active`),y.forgot.style.display=`block`,v.forEach(e=>e.classList.remove(`active`))}),x.addEventListener(`click`,()=>{y.forgot.style.display=`none`,T(`signin`)}),S.forEach(e=>{e.addEventListener(`click`,function(){let e=this.dataset.target,t=document.getElementById(e);if(t){let e=t.type===`password`?`text`:`password`;t.type=e,this.querySelector(`i`).className=e===`password`?`fas fa-eye`:`fas fa-eye-slash`}})});var E=document.getElementById(`signupPassword`),D=document.querySelectorAll(`#authStrength .auth-strength-bar span`),O=document.querySelector(`#authStrength .auth-strength-text`);E&&E.addEventListener(`input`,function(){let e=this.value,t=k(e);D.forEach((e,n)=>{e.className=``,n<t.level&&e.classList.add(`active`,t.class)}),O.textContent=t.label,O.className=`auth-strength-text `+t.class});function k(e){let t=0;return e.length>=8&&t++,e.length>=12&&t++,/[a-z]/.test(e)&&/[A-Z]/.test(e)&&t++,/\d/.test(e)&&t++,/[^a-zA-Z0-9]/.test(e)&&t++,t<=1?{level:1,class:`weak`,label:`Weak — add more characters`}:t<=3?{level:2,class:`medium`,label:`Medium — add symbols`}:t<=4?{level:3,class:`strong`,label:`Strong! 💪`}:{level:4,class:`strong`,label:`Very Strong! 🎉`}}document.getElementById(`signinForm`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`signinEmail`).value,n=document.getElementById(`signinPassword`).value;console.log(`🔐 Sign In:`,{email:t,password:n}),alert(`✅ Sign In - Connect to Supabase`)}),document.getElementById(`signupForm`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`signupName`).value,n=document.getElementById(`signupEmail`).value,r=document.getElementById(`signupPassword`).value,i=document.getElementById(`signupConfirm`).value,a=document.getElementById(`authTerms`).checked;if(r!==i){alert(`❌ Passwords do not match`);return}if(!a){alert(`❌ Please agree to Terms & Conditions`);return}console.log(`📝 Sign Up:`,{name:t,email:n,password:r}),alert(`✅ Sign Up - Connect to Supabase`)}),document.getElementById(`forgotForm`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`forgotEmail`).value;console.log(`🔑 Forgot Password:`,{email:t}),alert(`📧 Password reset link sent to `+t)}),document.getElementById(`authGoogle`)?.addEventListener(`click`,()=>{alert(`🔐 Google Sign In - Connect to Supabase`)}),document.getElementById(`authGoogleUp`)?.addEventListener(`click`,()=>{alert(`📝 Google Sign Up - Connect to Supabase`)}),document.getElementById(`authGitHub`)?.addEventListener(`click`,()=>{alert(`🔐 GitHub Sign In - Connect to Supabase`)}),document.getElementById(`authGitHubUp`)?.addEventListener(`click`,()=>{alert(`📝 GitHub Sign Up - Connect to Supabase`)}),window.openAuthModal=C,window.closeAuthModal=w,console.log(`🚀 App initialized`);var A={name:`The Consciousness of the Son`,church:`Grace Spring Family Church`,version:`2.0.0`,storageKeys:{theme:`gsc-theme`,progress:`gsc-progress`,notes:`gsc-notes`,profile:`gsc-profile`,streak:`gsc-streak`}},j=e.get(A.storageKeys.theme,!1),M=e.get(A.storageKeys.profile,{name:`Guest User`,email:`guest@example.com`,joined:`Guest`}),N=document.getElementById(`mainContent`),P=document.getElementById(`themeToggle`),F=document.getElementById(`toast`),I=document.getElementById(`toastMessage`);function L(){j?(document.documentElement.setAttribute(`data-theme`,`dark`),P.innerHTML=`<i class="fas fa-sun"></i>`):(document.documentElement.removeAttribute(`data-theme`),P.innerHTML=`<i class="fas fa-moon"></i>`),e.set(A.storageKeys.theme,j)}P.addEventListener(`click`,()=>{j=!j,L()});var R;function z(e){I.textContent=e,F.classList.add(`show`),clearTimeout(R),R=setTimeout(()=>{F.classList.remove(`show`)},3e3)}function B(){let t=new Date().toDateString(),n=e.get(A.storageKeys.streak,{count:0,lastActive:null});if(n.lastActive===t)return n.count;let r=new Date;r.setDate(r.getDate()-1);let i=r.toDateString();return n.lastActive===i?n.count+=1:n.lastActive!==t&&(n.count=1),n.lastActive=t,e.set(A.storageKeys.streak,n),n.count}function V(e){switch(console.log(`🔀 Navigating to:`,e),document.querySelectorAll(`.nav-item`).forEach(t=>{t.classList.toggle(`active`,t.dataset.page===e)}),e){case`home`:n(N,{showToast:z,updateStreak:B,userProfile:M,isLoggedIn:M?.name!==`Guest User`,navigateTo:V});break;case`lessons`:i(N,{showToast:z,updateStreak:B,navigateTo:V});break;case`bible`:m(N,{showToast:z});break;case`profile`:h(N,{user:M,showToast:z,navigateTo:V});break;default:n(N,{showToast:z,updateStreak:B,userProfile:M,isLoggedIn:M?.name!==`Guest User`,navigateTo:V})}window.scrollTo({top:0,behavior:`smooth`})}document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.page;t&&V(t)})}),document.getElementById(`brandHome`)?.addEventListener(`click`,()=>{V(`home`)});function H(){console.log(`🚀 Starting app...`),L(),V(`home`),console.log(`📖 ${A.name} v${A.version}`),console.log(`✅ App ready!`)}H();