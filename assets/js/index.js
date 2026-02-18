(function() {
        // ---------- TRANSLATION DICTIONARY ----------
        const translations = {
            en: {
                'site.title': 'VRNT - Veda Rakshana Nidhi Trust',
                'menu.title': 'Menu',
                'nav.login': 'Login',
                'nav.register': 'Register',
                'nav.about': 'About Us',
                'nav.contact': 'Contact',
                'hero.greeting': 'SRI GURUBYO NAMAHA',
                'hero.tagline': 'Preserving and Promoting the Vedas for Future Generations',
                'hero.address': '64/31, Subramaniam Street, West Mambalam, Chennai - 600 033',
                'hero.sponsor': 'Sponsored by His Holiness Pujya Sri Maha Swamigal (Paramacharyal)',
                'button.login': 'Login',
                'button.register': 'Register'
            },
            ta: {
                'site.title': 'வேத ரக்ஷண நிதி அறக்கட்டளை',
                'menu.title': 'மெனு',
                'nav.login': 'உள்நுழைய',
                'nav.register': 'பதிவு செய்யவும்',
                'nav.about': 'எங்களைப் பற்றி',
                'nav.contact': 'தொடர்பு கொள்ள',
                'hero.greeting': 'ஸ்ரீ குருப்யோ நமஹ',
                'hero.tagline': 'எதிர்கால சந்ததிகளுக்காக வேதங்களைப் பாதுகாத்தல் மற்றும் மேம்படுத்துதல்',
                'hero.address': '64/31, சுப்ரமணியம் தெரு, மேற்கு மாம்பலம், சென்னை - 600 033',
                'hero.sponsor': 'புஜ்ய ஸ்ரீ மஹா ஸ்வாமிகளின் (பரமாசார்யால்) ஆதரவுடன்',
                'button.login': 'உள்நுழைய',
                'button.register': 'பதிவு'
            },
            te: {
                'site.title': 'వేద రక్షణ నిధి ట్రస్ట్',
                'menu.title': 'మెనూ',
                'nav.login': 'లాగిన్',
                'nav.register': 'నమోదు చేయండి',
                'nav.about': 'మా గురించి',
                'nav.contact': 'సంప్రదించండి',
                'hero.greeting': 'శ్రీ గురుభ్యో నమః',
                'hero.tagline': 'భవిష్యత్ తరాల కోసం వేదాలను సంరక్షించడం మరియు ప్రోత్సహించడం',
                'hero.address': '64/31, సుబ్రమణియం వీధి, వెస్ట్ మాంబలం, చెన్నై - 600 033',
                'hero.sponsor': 'పూజ్య శ్రీ మహా స్వామిగల్ (పరమాచార్యాల్) స్పాన్సర్ చేసింది',
                'button.login': 'లాగిన్',
                'button.register': 'నమోదు'
            },
            hi: {
                'site.title': 'वेद रक्षण निधि ट्रस्ट',
                'menu.title': 'मेन्यू',
                'nav.login': 'लॉग इन',
                'nav.register': 'पंजीकरण करें',
                'nav.about': 'हमारे बारे में',
                'nav.contact': 'संपर्क करें',
                'hero.greeting': 'श्री गुरुभ्यो नमः',
                'hero.tagline': 'भावी पीढ़ियों के लिए वेदों का संरक्षण और संवर्धन',
                'hero.address': '64/31, सुब्रह्मण्यम स्ट्रीट, वेस्ट माम्बलम, चेन्नई - 600 033',
                'hero.sponsor': 'पूज्य श्री महा स्वामीगल (परमाचार्यल) द्वारा प्रायोजित',
                'button.login': 'लॉग इन',
                'button.register': 'पंजीकरण'
            }
        };

        // ---------- FUNCTION TO UPDATE ALL DATA-I18N ELEMENTS ----------
        function setLanguage(lang) {
            if (!translations[lang]) return; // fallback

            // loop through all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });

            // update active button style
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });

            // (Optional) store selected language in localStorage for persistence
            localStorage.setItem('preferredLang', lang);
        }

        // ---------- ATTACH EVENT LISTENERS TO LANGUAGE BUTTONS ----------
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });

        // ---------- INITIAL LANGUAGE (check localStorage or default to English) ----------
        const savedLang = localStorage.getItem('preferredLang');
        const defaultLang = (savedLang && translations[savedLang]) ? savedLang : 'en';
        setLanguage(defaultLang);
    })();