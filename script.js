// تفعيل القائمة المتنقلة - من أعلى إلى أسفل
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('menuToggle');
    const nav = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('show');
        });
    });
    
    // إعداد نموذج الاستفسار
    setupInquiryForm();
    
    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تفعيل زر تغيير الوضع
    const themeToggle = document.getElementById('themeToggleBottom');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // تحميل الوضع المحفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // تفعيل الصفحات المنفصلة
    const pageLinks = document.querySelectorAll('.page-link');
    const pageContents = document.querySelectorAll('.page-content');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            
            // إخفاء جميع الصفحات
            pageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // إظهار الصفحة المطلوبة
            document.getElementById(pageId).classList.add('active');
            
            // التمرير إلى الصفحة
            document.getElementById(pageId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // تفعيل أزرار العودة
    const backButtons = document.querySelectorAll('.back-btn');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إخفاء جميع الصفحات
            pageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // العودة إلى قسم الصفحات
            document.getElementById('pages').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // جعل بطاقات التواصل قابلة للنقر بالكامل
    makeContactCardsClickable();
    
    // إضافة زر حساب المطور
    addDeveloperContactButton();
    
    // تفعيل قسم رحلة المطور
    setupDeveloperJourney();
    
    // تفعيل زر تشغيل الكود
    setupCodeExecution();
});

// تفعيل قسم رحلة المطور
function setupDeveloperJourney() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const languageCodes = document.querySelectorAll('.language-code');
    const currentLangSpan = document.getElementById('currentLang');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر الحالي
            this.classList.add('active');
            
            // إخفاء جميع الأكواد
            languageCodes.forEach(code => code.classList.remove('active'));
            
            // الحصول على اللغة المحددة
            const selectedLang = this.dataset.lang;
            
            // تحديث نص اللغة الحالية
            const langNames = {
                python: 'Python',
                javascript: 'JavaScript',
                php: 'PHP',
                java: 'Java',
                cpp: 'C++'
            };
            
            currentLangSpan.textContent = langNames[selectedLang];
            
            // إظهار الكود المناسب
            const targetCode = document.getElementById(`${selectedLang}-code`);
            if (targetCode) {
                targetCode.classList.add('active');
            }
            
            // إعادة تعيين الترمينال عند تغيير اللغة
            resetTerminal();
        });
    });
    
    // تفعيل تلوين الكود
    highlightCode();
}

// تفعيل زر تشغيل الكود
function setupCodeExecution() {
    const runButton = document.getElementById('runCodeBtn');
    const resetButton = document.getElementById('resetCodeBtn');
    const terminalOutput = document.getElementById('terminalOutput');
    
    // محتوى الناتج الثابت
    const outputContent = [
        "🤖 مرحباً بكم في منصة روكس 🪄",
        "",
        "المنصة الرائدة في مجال تطوير:",
        "• بوتات تيليجرام الذكية",
        "• مواقع الويب المتطورة", 
        "• الأنظمة الذكية والمبتكرة",
        "",
        "خبرة تزيد عن 3 سنوات في البرمجة",
        "وتطوير الحلول التقنية المتكاملة.",
        "",
        "منصة روكس - اختيارك الأمثل للتميز التقني!",
        "",
        "📋 خدمات منصة روكس:",
        "  1. تطوير بوتات تيليجرام",
        "  2. تطوير مواقع الويب",
        "  3. أنظمة الذكاء الاصطناعي",
        "",
        "📊 إحصائيات المنصة:",
        "مشاريع ناجحة: 142 من أصل 150",
        "💼 عملاء راضين: 150",
        "⭐ تقييم: 4.9/5"
    ];
    
    // متغيرات التحكم
    let isRunning = false;
    let currentLine = 0;
    let typingInterval;
    
    // زر التشغيل
    runButton.addEventListener('click', function() {
        if (isRunning) return;
        
        isRunning = true;
        currentLine = 0;
        runButton.disabled = true;
        runButton.classList.add('running');
        runButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التشغيل...';
        
        // مسح المحتوى السابق
        terminalOutput.innerHTML = '';
        
        // بدء العرض التدريجي
        typeNextLine();
    });
    
    // زر إعادة التعيين
    resetButton.addEventListener('click', function() {
        resetTerminal();
    });
    
    // وظيفة العرض التدريجي
    function typeNextLine() {
        if (currentLine >= outputContent.length) {
            // انتهى العرض
            isRunning = false;
            runButton.disabled = false;
            runButton.classList.remove('running');
            runButton.innerHTML = '<i class="fas fa-play"></i> تشغيل الكود';
            
            // إضافة مؤشر الكتابة
            const cursor = document.createElement('div');
            cursor.className = 'typewriter-cursor';
            terminalOutput.appendChild(cursor);
            return;
        }
        
        const line = outputContent[currentLine];
        const lineElement = document.createElement('div');
        lineElement.className = 'output-line';
        
        // إذا كان السطر فارغاً
        if (line === '') {
            lineElement.innerHTML = '&nbsp;';
            terminalOutput.appendChild(lineElement);
            currentLine++;
            setTimeout(typeNextLine, 300); // تأخير أقصر للسطور الفارغة
            return;
        }
        
        // إضافة السطر الجديد
        terminalOutput.appendChild(lineElement);
        
        // كتابة النص حرفاً بحرف
        let charIndex = 0;
        const typingSpeed = line.length > 50 ? 30 : 50; // سرعة الكتابة حسب طول السطر
        
        typingInterval = setInterval(function() {
            if (charIndex < line.length) {
                // إضافة المؤشر أثناء الكتابة
                let displayText = line.substring(0, charIndex + 1);
                
                // إضافة الأيقونات بشكل فوري
                if (line.includes('🤖') || line.includes('🪄') || line.includes('📋') || 
                    line.includes('📊') || line.includes('💼') || line.includes('⭐')) {
                    // العثور على الإيموجي وإضافته
                    const emojiMatch = line.match(/[🤖🪄📋📊💼⭐]/g);
                    if (emojiMatch) {
                        emojiMatch.forEach(emoji => {
                            if (displayText.includes(emoji)) {
                                // التأكد من عرض الإيموجي بشكل كامل
                                const emojiIndex = line.indexOf(emoji);
                                if (charIndex >= emojiIndex) {
                                    displayText = line.substring(0, Math.max(charIndex + 1, emojiIndex + 2));
                                }
                            }
                        });
                    }
                }
                
                lineElement.textContent = displayText;
                charIndex++;
                
                // التمرير للأسفل تلقائياً
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            } else {
                clearInterval(typingInterval);
                currentLine++;
                
                // التأخير بين الأسطر
                const delay = line.length > 30 ? 500 : 300;
                setTimeout(typeNextLine, delay);
            }
        }, typingSpeed);
    }
    
    // وظيفة إعادة تعيين الترمينال
    function resetTerminal() {
        clearInterval(typingInterval);
        isRunning = false;
        currentLine = 0;
        
        runButton.disabled = false;
        runButton.classList.remove('running');
        runButton.innerHTML = '<i class="fas fa-play"></i> تشغيل الكود';
        
        terminalOutput.innerHTML = `
            <div class="output-line">🤖 انتظر تشغيل الكود...</div>
            <div class="output-line">اضغط على زر "تشغيل الكود" لبدء العرض</div>
        `;
    }
    
    // تهيئة الترمينال
    resetTerminal();
}

// تلوين الكود البرمجي
function highlightCode() {
    const codeBlocks = document.querySelectorAll('.language-code code');
    
    codeBlocks.forEach(block => {
        const code = block.textContent;
        
        // تحديد اللغة
        let lang = 'python';
        if (block.classList.contains('language-javascript')) lang = 'javascript';
        if (block.classList.contains('language-php')) lang = 'php';
        if (block.classList.contains('language-java')) lang = 'java';
        if (block.classList.contains('language-cpp')) lang = 'cpp';
        
        // تطبيق التلوين الأساسي
        let highlightedCode = code;
        
        // التعليقات
        if (lang === 'python' || lang === 'cpp') {
            highlightedCode = highlightedCode.replace(/#.*$/gm, '<span class="comment">$&</span>');
        }
        if (lang === 'javascript' || lang === 'java') {
            highlightedCode = highlightedCode.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
            highlightedCode = highlightedCode.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
        }
        if (lang === 'php') {
            highlightedCode = highlightedCode.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
            highlightedCode = highlightedCode.replace(/#.*$/gm, '<span class="comment">$&</span>');
            highlightedCode = highlightedCode.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
        }
        
        // السلاسل النصية
        highlightedCode = highlightedCode.replace(/(['"])(.*?)\1/g, '<span class="string">$&</span>');
        
        // الكلمات المفتاحية
        const keywords = {
            python: ['class', 'def', '__init__', 'if', 'else', 'for', 'while', 'return', 'import', 'from', 'as', 'print', 'self', 'True', 'False', 'None'],
            javascript: ['class', 'constructor', 'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'console', 'log', 'this', 'export', 'default'],
            php: ['class', '__construct', 'function', 'public', 'private', 'protected', 'echo', 'if', 'else', 'for', 'while', 'return', 'this', 'array', 'static'],
            java: ['class', 'public', 'private', 'protected', 'static', 'void', 'int', 'String', 'if', 'else', 'for', 'while', 'return', 'this', 'System', 'out', 'println'],
            cpp: ['class', 'public', 'private', '#include', 'using', 'namespace', 'std', 'int', 'string', 'if', 'else', 'for', 'while', 'return', 'cout', 'endl', 'main']
        };
        
        if (keywords[lang]) {
            keywords[lang].forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                highlightedCode = highlightedCode.replace(regex, '<span class="keyword">$&</span>');
            });
        }
        
        // الدوال والكلاسات
        if (lang === 'python') {
            highlightedCode = highlightedCode.replace(/\b(RooksPlatform|__init__|welcome_message|calculate_projects|show_services)\b/g, '<span class="function">$&</span>');
        }
        if (lang === 'javascript') {
            highlightedCode = highlightedCode.replace(/\b(RooksPlatform|constructor|welcomeMessage|calculateProjects|showServices)\b/g, '<span class="function">$&</span>');
        }
        if (lang === 'php') {
            highlightedCode = highlightedCode.replace(/\b(RooksPlatform|__construct|welcomeMessage|calculateProjects|showServices)\b/g, '<span class="function">$&</span>');
        }
        if (lang === 'java' || lang === 'cpp') {
            highlightedCode = highlightedCode.replace(/\b(RooksPlatform|welcomeMessage|calculateProjects|showServices|main)\b/g, '<span class="function">$&</span>');
        }
        
        block.innerHTML = highlightedCode;
    });
}

// إضافة زر حساب المطور في قسم المطور
function addDeveloperContactButton() {
    const developerInfo = document.querySelector('.developer-info');
    if (developerInfo) {
        const contactButton = document.createElement('a');
        contactButton.href = 'https://t.me/QR_l4';
        contactButton.target = '_blank';
        contactButton.className = 'developer-contact-btn';
        contactButton.innerHTML = `
            <i class="fab fa-telegram"></i>
            تواصل على تلجرام @QR_l4
        `;
        
        // إضافة الزر بعد قائمة الإنجازات
        const achievementsList = developerInfo.querySelector('ul');
        if (achievementsList) {
            achievementsList.parentNode.insertBefore(contactButton, achievementsList.nextSibling);
        } else {
            developerInfo.appendChild(contactButton);
        }
    }
}

// جعل بطاقات التواصل قابلة للنقر بالكامل
function makeContactCardsClickable() {
    // روابط بطاقات التواصل
    const contactCardsLinks = {
        'تيليجرام': 'https://t.me/QR_l4',
        'واتساب':'https://wa.me/+77071138332', 
        'انستجرام': 'https://instagram.com/x.s_ik',
        'بوت تيليجرام': 'https://t.me/QR_l4229BOT',
        'تكنولوجيا المعلومات': 'https://t.me/+K7P7A40PaOIwNGY0'
    };
    
    // إضافة حدث النقر لبطاقات التواصل
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        // الحصول على عنوان البطاقة
        const cardTitle = card.querySelector('h3').textContent.trim();
        
        // إذا كان العنوان موجود في الروابط
        if (contactCardsLinks[cardTitle]) {
            // جعل البطاقة قابلة للنقر
            card.style.cursor = 'pointer';
            
            // إضافة حدث النقر
            card.addEventListener('click', function(e) {
                // منع النقر إذا كان على رابط داخلي
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // فتح الرابط
                window.open(contactCardsLinks[cardTitle], '_blank');
            });
        }
    });
    
    // جعل بطاقات القنوات قابلة للنقر
    const channelCards = document.querySelectorAll('.channel-card, .content-card');
    channelCards.forEach(card => {
        const cardTitle = card.querySelector('h4')?.textContent.trim();
        const cardLink = card.querySelector('a');
        
        if (cardLink && cardTitle) {
            // جعل البطاقة قابلة للنقر
            card.style.cursor = 'pointer';
            
            // إضافة حدث النقر
            card.addEventListener('click', function(e) {
                // منع النقر إذا كان على رابط داخلي
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // فتح الرابط
                window.open(cardLink.href, '_blank');
            });
        }
    });
    
    // جعل بطاقات البوتات قابلة للنقر
    const botCards = document.querySelectorAll('.bot-card, .content-card');
    botCards.forEach(card => {
        const cardLink = card.querySelector('a');
        
        if (cardLink) {
            // جعل البطاقة قابلة للنقر
            card.style.cursor = 'pointer';
            
            // إضافة حدث النقر
            card.addEventListener('click', function(e) {
                // منع النقر إذا كان على رابط داخلي
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // فتح الرابط
                window.open(cardLink.href, '_blank');
            });
        }
    });
}

// إعداد نموذج الاستفسار
function setupInquiryForm() {
    const form = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // تعطيل زر الإرسال أثناء المعالجة
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
        
        // جمع البيانات من النموذج
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            contact: formData.get('contact'),
            type: formData.get('type'),
            message: formData.get('message'),
            rating: formData.get('rating') || 'غير محدد'
        };
        
        try {
            // إرسال البيانات إلى بوت التلجرام
            const botToken = '7761029482:AAFm0zGPRgQrWSh1-Uwbhi2l5wOh88F-v6E';
            const chatId = '6808883615';
            
            const messageText = `
طلب خدمة جديد من موقع روكس:

👤 الاسم: ${data.name}
📞 وسيلة التواصل: ${data.contact}
📋 نوع الخدمة: ${data.type}
⭐ التقييم: ${data.rating}
💬 تفاصيل الطلب:
${data.message}
            `;
            
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                // إظهار رسالة النجاح
                formMessage.textContent = 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // إعادة تعيين النموذج
                form.reset();
            } else {
                throw new Error('فشل في إرسال الرسالة');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // إظهار رسالة الخطأ
            formMessage.textContent = 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // إعادة تمكين زر الإرسال
            submitBtn.disabled = false;
            submitBtn.textContent = 'إرسال الطلب';
            
            // إخفاء رسالة النتيجة بعد 5 ثوانٍ
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}