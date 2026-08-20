document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Animation
    initTypewriterAnimation();

    // 2. Dark / Light Mode Switcher
    setupThemeToggle();

    // 3. Language Switching Engine
    setupLanguageSwitcher();

    // 4. Real-Time & Button-Click Service Search Filter
    setupServiceSearch();

    // 5. FAQ Accordion Click Listeners
    setupFAQAccordion();

    // 6. Mobile Navigation Toggle
    setupMobileNav();

    // 7. Appointment Modal Popup Controls (Backend Connected)
    setupModalControls();

    // 8. Dynamic Numbers Counter on Scroll
    setupStatsCounter();

    // 9. Back to Top Button
    createBackToTop();

    // 10. Smooth Scrolling for Navigation Links
    setupSmoothScroll();

    // 11. Smart AI Chatbot Engine (Backend Connected)
    setupMesobChatbot();

    // 12. Service Selection Handler for Appointment Modal
    setupServiceSelection();
});

// Backend API Base URL Configuration
const API_BASE_URL = 'http://localhost:5000/api'; // እንደ backend port ቁጥርህ አስተካክለው

/**
 * 1. Typewriter Animation
 */
function initTypewriterAnimation() {
    const textElement = document.getElementById('typedText');
    if (!textElement) return;

    const phrases = [
        "እንኳን ወደ ዱራሜ መሶብ አንድ ማዕከል በደህና መጡ!",
        "Welcome to Durame MESOB One-Stop Center!",
        "ሁሉንም የመንግስት አገልግሎቶች በአንድ ቦታ ያግኙ!"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/**
 * 2. Dark / Light Mode Switcher
 */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById("themeToggleBtn") || document.getElementById("theme-toggle");
    const themeText = document.getElementById("themeText");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeUI(true);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDarkMode = document.body.classList.contains("dark-mode");
            
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");

            updateThemeUI(isDarkMode);
        });
    }

    function updateThemeUI(isDark) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector("i");
        if (icon) {
            icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
        if (themeText) {
            themeText.innerText = isDark ? "Light Mode" : "Dark Mode";
        }
    }
}

/**
 * 3. Language Switcher
 */
function setupLanguageSwitcher() {
    const langSelect = document.getElementById('langSelect');
    if (!langSelect) return;

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        const elements = document.querySelectorAll('[data-am]');

        elements.forEach(el => {
            el.innerText = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-am');
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = lang === 'en' 
                ? (searchInput.getAttribute('data-en-placeholder') || 'Search services...') 
                : (searchInput.getAttribute('data-am-placeholder') || 'አገልግሎቶችን ይፈልጉ...');
        }
    });
}

/**
 * 4. Real-Time & Button-Click Service Search Filter
 */
function setupServiceSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchForm = document.getElementById('searchForm');

    if (!searchInput) return;

    function doSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.service-card, .window-box');

        cards.forEach(card => {
            const cardText = card.innerText.toLowerCase();

            if (query === '' || cardText.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', doSearch);

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            doSearch();
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            doSearch();
        });
    }
}

/**
 * 5. FAQ Accordion Control
 */
function setupFAQAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const icon = q.querySelector('i');
            const isOpen = answer && answer.style.display === 'block';

            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-question i').forEach(i => i.className = 'fas fa-chevron-down');

            if (!isOpen && answer) {
                answer.style.display = 'block';
                if (icon) icon.className = 'fas fa-chevron-up';
            }
        });
    });
}

/**
 * 6. Mobile Navigation Menu Toggle
 */
function setupMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul') || document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show', 'active');
            });
        });
    }
}

/**
 * 7. Appointment Modal Popup Controls (Backend API Connected)
 */
function setupModalControls() {
    const modal = document.getElementById('appointmentModal');
    const openBtns = document.querySelectorAll('.open-modal-btn, #openAppointmentModal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('appointmentForm');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (modal) {
                e.preventDefault();
                modal.style.display = 'flex';
            }
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const categoryInput = document.getElementById('appCat');
            const nameInput = document.getElementById('appName');
            const phoneInput = document.getElementById('appPhone');
            const dateInput = document.getElementById('appDate');

            const category = categoryInput ? categoryInput.value : '';
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const date = dateInput ? dateInput.value : '';

            if (phone.length < 9) {
                alert('እባክዎን ትክክለኛ የስልክ ቁጥር ያስገቡ!');
                return;
            }

            const appointmentData = { category, name, phone, date };
            const submitBtn = form.querySelector('button[type="submit"]');

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerText = 'በመላክ ላይ...';
                }

                // API Request to Backend
                const response = await fetch(`${API_BASE_URL}/appointments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(appointmentData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(`እናመሰግናለን ${name}! የቀጠሮ ጥያቄዎ በተሳካ ሁኔታ ተልኳል። በቅርቡ በስልክ ቁጥርዎ እናረጋግጣለን።`);
                    if (modal) modal.style.display = 'none';
                    form.reset();
                } else {
                    alert(`ስህተት ተከሰቷል፡ ${result.message || 'እባክዎን እንደገና ይሞክሩ'}`);
                }
            } catch (error) {
                console.error('Appointment Submission Error:', error);
                alert('ከሲስተሙ/Server ጋር መገናኘት አልተቻለም! እባክዎን የኢንተርኔት/የኔትወርክ ግንኙነትዎን ያረጋግጡ።');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'ቀጠሮውን አረጋግጥ';
                }
            }
        });
    }
}

/**
 * Auto-select service when clicking "ቀጠሮ ይያዙ" on a specific service card
 */
function setupServiceSelection() {
    const selectBtns = document.querySelectorAll('.select-service-btn');
    const appCatSelect = document.getElementById('appCat');
    const modal = document.getElementById('appointmentModal');

    selectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            if (appCatSelect && serviceName) {
                appCatSelect.value = serviceName;
            }
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });
}

/**
 * 8. Dynamic Numbers Counter
 */
function setupStatsCounter() {
    const counters = document.querySelectorAll('.counter, .stat-number');
    let animated = false;

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section') || document.getElementById('about');
        if (!statsSection) return;

        const position = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (position < screenPosition && !animated) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                if (!target) return;

                let count = 0;
                const step = Math.ceil(target / 40);

                const updateCounter = () => {
                    count += step;
                    if (count < target) {
                        counter.innerText = count;
                        setTimeout(updateCounter, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            animated = true;
        }
    });
}

/**
 * 9. Back To Top Button
 */
function createBackToTop() {
    let btn = document.querySelector('.back-to-top-btn') || document.getElementById('backToTop') || document.getElementById('back-to-top');
    
    if (!btn) {
        btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'back-to-top-btn';

        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '25px',
            right: '25px',
            display: 'none',
            width: '45px',
            height: '45px',
            backgroundColor: '#0d5c3a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            cursor: 'pointer',
            zIndex: '1500',
            fontSize: '1.1rem',
            alignItems: 'center',
            justifyContent: 'center'
        });

        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * 10. Smooth Scrolling for Anchor Links
 */
function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 11. Smart AI Chatbot Engine (Backend Connected with Fallback)
 */
function setupMesobChatbot() {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const container = document.getElementById('chatbot-container');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    if (!toggleBtn || !container) return;

    toggleBtn.addEventListener('click', () => {
        const isHidden = container.style.display === 'none' || container.style.display === '';
        container.style.display = isHidden ? 'flex' : 'none';
        if (isHidden && messagesContainer.children.length === 0) {
            addBotMessage("ሰላም! እንኳን ወደ ዱራሜ መሶብ አንድ ማዕከል በደህና መጡ። ስለ አገልግሎቶቻችን፣ የስራ ሰዓት ወይም የቀጠሮ ሂደቶች ማንኛውንም ጥያቄ መጠየቅ ይችላሉ!");
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            container.style.display = 'none';
        });
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    async function handleSendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        input.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg bot typing';
        typingDiv.innerText = 'መልስ እየተዘጋጀ ነው...';
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();

        try {
            // Send user prompt to Backend REST API
            const response = await fetch(`${API_BASE_URL}/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            messagesContainer.removeChild(typingDiv);

            if (response.ok && data.reply) {
                addBotMessage(data.reply);
            } else {
                // Fallback to local rule-based response
                const fallbackReply = generateKnowledgeResponse(text.toLowerCase());
                addBotMessage(fallbackReply);
            }
        } catch (error) {
            console.warn('Backend Chatbot API unreachable, switching to local bot rules.', error);
            messagesContainer.removeChild(typingDiv);
            const fallbackReply = generateKnowledgeResponse(text.toLowerCase());
            addBotMessage(fallbackReply);
        }
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg user';
        msgDiv.innerText = text;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg bot';
        msgDiv.innerHTML = text;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Local Fallback logic if Backend is offline
    function generateKnowledgeResponse(input) {
        if (input.includes('ሰላም') || input.includes('selam') || input.includes('hello') || input.includes('hi')) {
            return "ሰላም! እንዴት ልረዳዎት? ስለ ዱራሜ መሶብ ማዕከል አገልግሎቶች ወይም ሂደቶች ይጠይቁኝ።";
        }
        if (input.includes('ሰዓት') || input.includes('መቼ') || input.includes('time') || input.includes('hour')) {
            return "ማዕከሉ ከሰኞ እስከ አርብ ከጠዋቱ 2:00 - 11:30 እንዲሁም ቅዳሜ ከ 2:00 - 6:30 ክፍት ሆኖ አገልግሎት ይሰጣል።";
        }
        if (input.includes('መታወቂያ') || input.includes('ልደት') || input.includes('ሲቪል')) {
            return "<b>የመታወቂያ/ሲቪል ምዝገባ ደረጃዎች፡</b><br>1. የቀበሌ ደብዳቤ መያዝ<br>2. በስክሪኑ የቲኬት ቁጥር ማውጣት<br>3. ወደ መስኮት 1-3 በመሄድ መረጃ ማስመዝገብ<br>4. ፎቶ ተነስተው በ10 ደቂቃ ውስጥ መታወቂያዎን መቀበል።";
        }
        if (input.includes('ንግድ') || input.includes('ፈቃድ')) {
            return "<b>የንግድ ፈቃድ ሂደቶች፡</b><br>1. የታክስ ማጽጃ (Clearance) እና የTIN ቁጥር ማቅረብ<br>2. የቤት ኪራይ ውል ማስመዝገብ<br>3. በምዝገባ መስኮት ፎርም መሙላት<br>4. ክፍያ ፈፅመው ፈቃድዎን መቀበል።";
        }
        if (input.includes('ቀጠሮ') || input.includes('appointment')) {
            return "ቀጠሮ ለመያዝ በድህረ ገጻችን ላይ ያለውን <b>'ቀጠሮ ይያዙ'</b> በተን በመጫን ስም፣ ስልክ ቁጥር እና የሚፈልጉትን አገልግሎት መምረጥ ይችላሉ።";
        }
        return "ስለ ዱራሜ መሶብ ማዕከል የበለጠ መረጃ ለማግኘት 'መታወቂያ'፣ 'ንግድ ፈቃድ'፣ 'ባንክ'፣ 'ቀጠሮ' ወይም 'የስራ ሰዓት' ብለው ይጠይቁኝ።";
    }
}

/**
 * 12. Test function for back-end connection test block in HTML
 */
async function sendMessage() {
    const input = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    if (!input || !responseArea) return;

    const userText = input.value.trim();
    if (!userText) return;

    responseArea.innerText = 'ለServer በመላክ ላይ...';

    try {
        const res = await fetch(`${API_BASE_URL}/test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        const data = await res.json();
        responseArea.innerText = `Server Response: ${data.reply || data.message}`;
    } catch (err) {
        console.error(err);
        responseArea.style.color = 'red';
        responseArea.innerText = 'ከ Server ጋር መገናኘት አልተቻለም (Server አልተከፈተም)!';
    }
}