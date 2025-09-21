// CampusAI Assistant - Complete Professional Application
class CampusAIAssistant {
    constructor() {
        this.messagesArea = document.getElementById('messagesArea');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.charCount = document.getElementById('charCount');
        this.themeToggle = document.getElementById('themeToggle');
        this.documentModal = document.getElementById('documentModal');
        this.authOverlay = document.getElementById('authOverlay');
        
        this.conversationHistory = [];
        this.currentTheme = localStorage.getItem('campus-ai-theme') || 'light';
        this.currentUser = this.loadUserSession();
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.setupEventListeners();
        this.setupTheme();
        this.checkAuthState();
        this.displayWelcomeMessage();
        this.setupSuggestionChips();
    }
    
    setupEventListeners() {
        // Send button and enter key
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
        
        // Input handling
        this.userInput.addEventListener('input', () => {
            this.updateCharCount();
            this.autoResizeTextarea();
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Login form
        const loginForm = document.getElementById('loginFormElement');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        // Focus input
        if (this.userInput) {
            this.userInput.focus();
        }
    }
    
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('campus-ai-theme', this.currentTheme);
    }
    
    checkAuthState() {
        if (this.currentUser) {
            this.showMainApp();
            this.displayUserInfo();
        } else {
            this.showAuthOverlay();
        }
    }
    
    showAuthOverlay() {
        if (this.authOverlay) {
            this.authOverlay.classList.remove('hidden');
        }
    }
    
    hideAuthOverlay() {
        if (this.authOverlay) {
            this.authOverlay.classList.add('hidden');
        }
    }
    
    showMainApp() {
        this.hideAuthOverlay();
    }
    
    handleLogin() {
        const studentIdInput = document.getElementById('studentId');
        const passwordInput = document.getElementById('password');
        const rememberMeInput = document.getElementById('rememberMe');
        
        if (!studentIdInput || !passwordInput) {
            this.showAuthError('Login form elements not found');
            return;
        }
        
        const studentId = studentIdInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = rememberMeInput ? rememberMeInput.checked : false;
        
        if (!studentId || !password) {
            this.showAuthError('Please enter both Student ID and Password');
            return;
        }
        
        // Accept any USN/Password combination - Professional Universal Login
        const user = {
            studentId: studentId.toUpperCase(),
            firstName: this.generateFirstName(studentId),
            lastName: this.generateLastName(studentId),
            branch: this.determineBranch(studentId),
            semester: this.determineSemester(studentId),
            year: new Date().getFullYear().toString(),
            email: `${studentId.toLowerCase()}@oxfordcollege.edu.in`
        };
        
        this.loginUser(user, rememberMe);
    }
    
    generateFirstName(studentId) {
        // Generate a realistic first name based on student ID
        const names = [
            'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
            'Ananya', 'Diya', 'Aadhya', 'Kavya', 'Advika', 'Sara', 'Myra', 'Aanya', 'Pari', 'Fatima',
            'Rahul', 'Rohit', 'Amit', 'Suresh', 'Rajesh', 'Vikash', 'Deepak', 'Manoj', 'Santosh', 'Ganesh',
            'Priya', 'Pooja', 'Sneha', 'Neha', 'Kavitha', 'Divya', 'Shweta', 'Rekha', 'Sunita', 'Meera'
        ];
        
        // Use student ID to consistently generate same name
        const index = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % names.length;
        return names[index];
    }
    
    generateLastName(studentId) {
        const lastNames = [
            'Kumar', 'Singh', 'Sharma', 'Gupta', 'Agarwal', 'Verma', 'Mishra', 'Pandey', 'Yadav', 'Jain',
            'Reddy', 'Nair', 'Iyer', 'Menon', 'Pillai', 'Rajan', 'Krishnan', 'Subramanian', 'Venkatesh', 'Ramesh',
            'Patel', 'Shah', 'Mehta', 'Desai', 'Joshi', 'Trivedi', 'Bhatt', 'Parikh', 'Thakkar', 'Vyas'
        ];
        
        const index = (studentId.length + studentId.charCodeAt(0)) % lastNames.length;
        return lastNames[index];
    }
    
    determineBranch(studentId) {
        // Determine branch from student ID pattern
        const id = studentId.toUpperCase();
        if (id.includes('CS') || id.includes('CSE')) return 'CSE';
        if (id.includes('EC') || id.includes('ECE')) return 'ECE';
        if (id.includes('ME') || id.includes('MECH')) return 'Mechanical';
        if (id.includes('CE') || id.includes('CIVIL')) return 'Civil';
        if (id.includes('EE') || id.includes('EEE')) return 'EEE';
        if (id.includes('IT')) return 'IT';
        if (id.includes('IS')) return 'ISE';
        
        // Default based on student ID pattern
        return 'CSE';
    }
    
    determineSemester(studentId) {
        // Generate semester based on current year and student ID pattern
        const currentYear = new Date().getFullYear();
        const id = studentId.toUpperCase();
        
        // Extract year from student ID if present
        const yearMatch = id.match(/(\d{2})/);
        if (yearMatch) {
            const idYear = parseInt(yearMatch[1]);
            const fullIdYear = idYear > 50 ? 1900 + idYear : 2000 + idYear;
            const yearDiff = currentYear - fullIdYear;
            const semester = Math.min(Math.max((yearDiff * 2) + 1, 1), 8);
            
            const semesterSuffix = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th'];
            return `${semester}${semesterSuffix[semester - 1]}`;
        }
        
        return '6th'; // Default
    }
    
    loginUser(user, rememberMe = false) {
        this.currentUser = user;
        
        // Show login loading state
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.disabled = true;
            const btnText = loginBtn.querySelector('.btn-text');
            const btnSpinner = loginBtn.querySelector('.btn-spinner');
            if (btnText && btnSpinner) {
                btnText.classList.add('hidden');
                btnSpinner.classList.remove('hidden');
            }
        }
        
        // Simulate loading for better UX
        setTimeout(() => {
            // Save session
            const sessionData = {
                user: this.currentUser,
                expires: Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
            };
            
            if (rememberMe) {
                localStorage.setItem('campus-ai-session', JSON.stringify(sessionData));
            } else {
                sessionStorage.setItem('campus-ai-session', JSON.stringify(sessionData));
            }
            
            this.showMainApp();
            this.displayUserInfo();
            this.clearAuthForm();
            
            // Reset login button
            if (loginBtn) {
                loginBtn.disabled = false;
                const btnText = loginBtn.querySelector('.btn-text');
                const btnSpinner = loginBtn.querySelector('.btn-spinner');
                if (btnText && btnSpinner) {
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                }
            }
        }, 1500); // 1.5 second loading for professional feel
    }
    
    loadUserSession() {
        // Check localStorage first
        const localSession = localStorage.getItem('campus-ai-session');
        if (localSession) {
            try {
                const session = JSON.parse(localSession);
                if (session.expires > Date.now()) {
                    return session.user;
                } else {
                    localStorage.removeItem('campus-ai-session');
                }
            } catch (e) {
                localStorage.removeItem('campus-ai-session');
            }
        }
        
        // Check sessionStorage
        const sessionSession = sessionStorage.getItem('campus-ai-session');
        if (sessionSession) {
            try {
                const session = JSON.parse(sessionSession);
                if (session.expires > Date.now()) {
                    return session.user;
                } else {
                    sessionStorage.removeItem('campus-ai-session');
                }
            } catch (e) {
                sessionStorage.removeItem('campus-ai-session');
            }
        }
        
        return null;
    }
    
    displayUserInfo() {
        if (!this.currentUser) return;
        
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userBranch = document.getElementById('userBranch');
        const statusSection = document.getElementById('statusSection');
        const userInfoSection = document.getElementById('userInfoSection');
        
        if (userAvatar && userName && userBranch && statusSection && userInfoSection) {
            const initials = (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
            const fullName = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
            const branchSem = `${this.currentUser.branch} - ${this.currentUser.semester} Sem`;
            
            userAvatar.textContent = initials;
            userName.textContent = fullName;
            userBranch.textContent = branchSem;
            
            // Hide status section and show user info
            statusSection.classList.add('hidden');
            userInfoSection.classList.remove('hidden');
        }
        
        // Add personalized welcome message
        setTimeout(() => {
            const personalizedMessage = `Welcome back, ${this.currentUser.firstName}! I'm your Campus AI Assistant, ready to help with any college-related questions. How can I assist you today?`;
            this.addAIMessageToHistory(personalizedMessage);
        }, 2000);
    }
    
    showAuthError(message) {
        // Create professional error display
        const existingError = document.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error';
        errorDiv.style.cssText = `
            background: var(--danger-bg);
            color: var(--danger);
            border: 1px solid var(--danger);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            text-align: center;
            animation: slideInUp 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        const loginCard = document.querySelector('.login-card');
        if (loginCard) {
            loginCard.insertBefore(errorDiv, loginCard.firstChild);
            
            // Remove error after 5 seconds
            setTimeout(() => {
                errorDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => errorDiv.remove(), 300);
            }, 5000);
        }
    }
    
    clearAuthForm() {
        const studentId = document.getElementById('studentId');
        const password = document.getElementById('password');
        const rememberMe = document.getElementById('rememberMe');
        
        if (studentId) studentId.value = '';
        if (password) password.value = '';
        if (rememberMe) rememberMe.checked = false;
    }
    
    logout() {
        // Clear sessions
        localStorage.removeItem('campus-ai-session');
        sessionStorage.removeItem('campus-ai-session');
        
        // Reset state
        this.currentUser = null;
        this.conversationHistory = [];
        
        // Show auth overlay
        this.showAuthOverlay();
        
        // Reset UI
        const statusSection = document.getElementById('statusSection');
        const userInfoSection = document.getElementById('userInfoSection');
        if (statusSection && userInfoSection) {
            statusSection.classList.remove('hidden');
            userInfoSection.classList.add('hidden');
        }
        
        // Clear messages
        if (this.messagesArea) {
            this.messagesArea.innerHTML = `
                <div class="ai-message">
                    <div class="message-header">
                        <div class="message-avatar ai-avatar">🤖</div>
                        <span class="message-time">Just now</span>
                    </div>
                    <div class="message-content">
                        <p>Hello! I'm your Campus AI Assistant. I can search through official college documents and provide accurate answers with proper sources.</p>
                        <p class="message-hint">Try asking: "What are the revaluation fees?" or "When is the next placement drive?"</p>
                    </div>
                </div>
            `;
        }
    }
    
    displayWelcomeMessage() {
        this.conversationHistory = [];
    }
    
    setupSuggestionChips() {
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                if (this.userInput) {
                    this.userInput.value = query;
                    this.updateCharCount();
                    this.handleSendMessage();
                }
            });
        });
    }
    
    updateCharCount() {
        if (!this.charCount || !this.userInput) return;
        
        const currentLength = this.userInput.value.length;
        this.charCount.textContent = `${currentLength}/${CONFIG.MAX_MESSAGE_LENGTH}`;
        
        if (currentLength > CONFIG.MAX_MESSAGE_LENGTH * 0.9) {
            this.charCount.style.color = 'var(--danger)';
        } else {
            this.charCount.style.color = 'var(--text-tertiary)';
        }
    }
    
    autoResizeTextarea() {
        if (!this.userInput) return;
        
        this.userInput.style.height = 'auto';
        this.userInput.style.height = Math.min(this.userInput.scrollHeight, 120) + 'px';
    }
    
    async handleSendMessage() {
        if (!this.userInput || !this.messagesArea) return;
        
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.setInputState(false);
        this.addUserMessage(message);
        
        this.userInput.value = '';
        this.updateCharCount();
        this.autoResizeTextarea();
        
        this.showTypingIndicator();
        
        try {
            const response = await this.processUserMessage(message);
            this.hideTypingIndicator();
            this.addAIMessage(response);
        } catch (error) {
            console.error('Error processing message:', error);
            this.hideTypingIndicator();
            this.addAIMessage({
                text: "I apologize, but I'm experiencing technical difficulties. Please try again later, or contact the IT support if the issue persists.",
                sources: []
            });
        }
        
        this.setInputState(true);
        this.userInput.focus();
    }
    
    addUserMessage(message) {
        if (!this.messagesArea) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar user-avatar">👤</div>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        
        this.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.conversationHistory.push({
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
        });
    }
    
    addAIMessage(response) {
        if (!this.messagesArea) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        
        let sourcesHTML = '';
        if (response.sources && response.sources.length > 0) {
            sourcesHTML = `
                <div class="message-sources" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-primary);">
                    <h5 style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">📄 Sources:</h5>
                    ${response.sources.map(source => `
                        <button class="source-link" onclick="showDocumentSource('${source.id}', '${source.section}')" 
                                style="display: inline-block; background: var(--bg-tertiary); border: 1px solid var(--border-primary); 
                                       border-radius: 6px; padding: 0.25rem 0.5rem; font-size: 0.75rem; color: var(--text-secondary); 
                                       cursor: pointer; margin-right: 0.5rem; margin-bottom: 0.5rem; transition: all 0.2s ease;">
                            ${source.title} - ${source.section}
                        </button>
                    `).join('')}
                </div>
            `;
        }
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar ai-avatar">🤖</div>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
            <div class="message-content">
                <div>${this.formatAIResponse(response.text)}</div>
                ${sourcesHTML}
            </div>
        `;
        
        this.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.conversationHistory.push({
            role: 'assistant',
            content: response.text,
            sources: response.sources,
            timestamp: new Date().toISOString()
        });
    }
    
    addAIMessageToHistory(text) {
        if (!this.messagesArea) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar ai-avatar">🤖</div>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        
        this.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    async processUserMessage(message) {
        // Simulate AI processing delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, CONFIG.TYPING_DELAY));
        
        const relevantDocs = this.searchDocuments(message);
        const response = this.generateResponse(message, relevantDocs);
        
        return response;
    }
    
    searchDocuments(query) {
        const queryLower = query.toLowerCase();
        const relevantDocs = [];
        
        CONFIG.DOCUMENT_DATABASE.forEach(doc => {
            let relevanceScore = 0;
            
            // Check tags
            doc.tags.forEach(tag => {
                if (queryLower.includes(tag)) {
                    relevanceScore += 3;
                }
            });
            
            // Check content
            const queryWords = queryLower.split(' ');
            queryWords.forEach(word => {
                if (word.length > 3 && doc.content.toLowerCase().includes(word)) {
                    relevanceScore += 1;
                }
            });
            
            // Check title
            if (doc.title.toLowerCase().includes(queryLower)) {
                relevanceScore += 2;
            }
            
            if (relevanceScore > 0) {
                relevantDocs.push({
                    ...doc,
                    relevanceScore
                });
            }
        });
        
        return relevantDocs.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
    }
    
    generateResponse(query, relevantDocs) {
        const queryLower = query.toLowerCase();
        
        // Personalized greeting check
        if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('hey')) {
            const greeting = this.currentUser ? 
                `Hello ${this.currentUser.firstName}! I'm here to help you with any college-related questions. What would you like to know about?` :
                `Hello! I'm your Campus AI Assistant. I can help you with college-related questions. What would you like to know about?`;
            return { text: greeting, sources: [] };
        }
        
        // Thank you responses
        if (queryLower.includes('thank') || queryLower.includes('thanks')) {
            const responses = [
                `You're welcome, ${this.currentUser ? this.currentUser.firstName : 'student'}! Feel free to ask if you have any other questions.`,
                "Happy to help! Is there anything else you'd like to know about college procedures or policies?",
                "Glad I could assist! Don't hesitate to ask if you need more information."
            ];
            return { text: responses[Math.floor(Math.random() * responses.length)], sources: [] };
        }
        
        // Revaluation queries
        if (queryLower.includes('revaluation') || queryLower.includes('reval')) {
            return {
                text: `Based on the Academic Regulations 2025, here's the complete information about revaluation:

**📋 Revaluation Process:**
• **Fee**: Rs. 1,000 per subject
• **Application Deadline**: 15 days from result declaration
• **Method**: Online through student portal (mandatory)
• **Result Timeline**: Within 30 days of application
• **Payment**: Must be completed before application submission

**📝 Required Documents:**
• Original mark sheet
• Application form (downloaded from portal)
• Payment receipt

**⚠️ Important Notes:**
• Late applications will not be accepted
• Revaluation fee is non-refundable
• Results may increase, decrease, or remain the same

The process is completely online through the student portal. Make sure to apply within the deadline!`,
                sources: [{
                    id: 'academic_regulations_2025',
                    title: 'Academic Regulations 2025',
                    section: 'Revaluation Process & Procedures'
                }]
            };
        }
        
        // Placement queries
        if (queryLower.includes('placement') || queryLower.includes('job') || queryLower.includes('drive') || queryLower.includes('company')) {
            return {
                text: `Here's the comprehensive placement information for 2025:

**📊 Eligibility Criteria:**
• **Minimum CGPA**: 6.0+ (varies by company)
• **Academic Standing**: No active backlogs
• **Attendance**: 75% minimum in current semester
• **Documentation**: Updated resume and all certificates

**🏢 Upcoming Placement Drives (October-November 2025):**

**October 2025:**
• **TCS** - Oct 15-16 (CGPA: 6.0+, Package: 3.5-7 LPA)
• **Infosys** - Oct 20-22 (CGPA: 6.5+, Package: 4-8 LPA)
• **Wipro** - Oct 25-27 (CGPA: 6.0+, Package: 3.8-6.5 LPA)

**November 2025:**
• **Amazon** - Nov 5-6 (CGPA: 7.5+, Package: 12-18 LPA)
• **Microsoft** - Nov 12-13 (CGPA: 8.0+, Package: 15-25 LPA)

**🎯 Preparation Support Available:**
• Mock interviews every Friday (4:00 PM)
• Resume building workshops (monthly)
• Technical skill enhancement programs
• Aptitude test preparation sessions

**📞 Contact**: placement@oxfordcollege.edu.in

Register through the placement portal to participate in drives!`,
                sources: [{
                    id: 'placement_guidelines_2025',
                    title: 'Placement Cell Guidelines 2025',
                    section: 'Placement Drives & Eligibility Criteria'
                }]
            };
        }
        
        // Fee queries
        if (queryLower.includes('fee') || queryLower.includes('payment') || queryLower.includes('scholarship') || queryLower.includes('money')) {
            return {
                text: `Here's the complete fee structure and payment information:

**💰 Annual Fee Structure (B.E Computer Science Engineering):**
• **Tuition Fee**: Rs. 1,20,000 per annum
• **Development Fee**: Rs. 15,000 per annum
• **Laboratory Fee**: Rs. 8,000 per annum
• **Library Fee**: Rs. 2,000 per annum
• **Total Annual Fee**: Rs. 1,45,000

**📅 Payment Schedule:**
• **First Installment (60%)**: Due June 30th - Rs. 87,000
• **Second Installment (40%)**: Due December 31st - Rs. 58,000

**⚠️ Late Payment:**
• **Penalty**: Rs. 500 per month after due date
• **Important**: Students with pending dues cannot appear for examinations
• **Grace Period**: 7 days from due date

**🎓 Scholarship Opportunities:**
• **Merit Scholarships**: Available for CGPA above 8.5
• **Need-based Aid**: For economically disadvantaged students
• **Sports Scholarships**: For state/national level players
• **Application Deadline**: August 31st annually

**💳 Payment Methods:**
• Online payment through college portal
• Bank transfer to college account
• Demand draft in favor of "Oxford College of Engineering"

Need help with fee payment or scholarship applications? Contact the accounts office!`,
                sources: [{
                    id: 'fee_structure_2025',
                    title: 'Fee Structure and Payment Guidelines 2025',
                    section: 'Complete Fee Structure & Scholarships'
                }]
            };
        }
        
        // Hostel queries
        if (queryLower.includes('hostel') || queryLower.includes('accommodation') || queryLower.includes('mess') || queryLower.includes('room')) {
            return {
                text: `Here's comprehensive information about hostel facilities:

**🏠 Room Types & Monthly Rates:**
• **Single Occupancy**: Rs. 8,000/month (AC available)
• **Double Occupancy**: Rs. 5,000/month per student
• **Triple Occupancy**: Rs. 3,500/month per student

**✨ Facilities Provided:**
• 24/7 high-speed WiFi connectivity
• Common room with TV, games, and study area
• Well-equipped gymnasium and sports facilities
• Medical room with qualified nurse and first aid
• Laundry service (additional charges apply)
• 24/7 security with CCTV surveillance

**🍽️ Mess Facility:**
• **Breakfast**: 7:30 AM - 9:30 AM
• **Lunch**: 12:30 PM - 2:30 PM
• **Evening Snacks**: 5:00 PM - 6:00 PM
• **Dinner**: 7:30 PM - 9:30 PM
• Both vegetarian and non-vegetarian options
• Monthly mess charges: Rs. 4,500

**📋 Hostel Rules & Regulations:**
• **In-time**: 10:30 PM (weekdays), 11:00 PM (weekends)
• **Visitor Hours**: 10:00 AM - 6:00 PM
• **Guest Policy**: Prior permission required
• **Prohibited**: Smoking, alcohol, loud music after 10 PM
• **Maintenance**: Report issues to hostel warden

**📝 Admission Process:**
• Application through college website
• First-come-first-served basis
• Security deposit: Rs. 10,000 (refundable)
• Medical certificate required

Want to apply for hostel accommodation? Contact the hostel office for availability!`,
                sources: [{
                    id: 'hostel_facilities_2025',
                    title: 'Hostel Rules and Facilities 2025',
                    section: 'Complete Accommodation Guide'
                }]
            };
        }
        
        // Attendance queries
        if (queryLower.includes('attendance') || queryLower.includes('minimum') || queryLower.includes('absent')) {
            return {
                text: `Here's everything you need to know about attendance requirements:

**📊 Attendance Requirements:**
• **Minimum Required**: 75% attendance is mandatory for semester examinations
• **Calculation**: Based on total classes conducted vs. classes attended
• **Monitoring**: Updated weekly on student portal

**🏥 Medical Leave Policy:**
• **Application Timeline**: Within 7 days of absence
• **Required Documents**: Medical certificate from registered practitioner
• **Approval**: Subject to HOD/Principal approval
• **Coverage**: Medical leaves are considered for attendance calculation

**⚠️ Important Guidelines:**
• **Below 65%**: Warning issued to student and parents
• **Below 60%**: Not eligible for semester examinations
• **Detention**: May result in academic detention
• **Makeup**: No provision for makeup classes for poor attendance

**📈 Monitoring Your Attendance:**
• Check student portal regularly
• Weekly SMS updates to registered mobile
• Monthly reports sent to parents
• Real-time updates after each class

**🚨 Consequences of Poor Attendance:**
• Debarred from semester examinations
• Academic probation
• Repeat of semester/year
• Disciplinary action

**💡 Pro Tips:**
• Maintain at least 80% to stay safe
• Apply for medical leave promptly when sick
• Regular monitoring prevents last-minute issues

Check your current attendance status on the student portal regularly!`,
                sources: [{
                    id: 'academic_regulations_2025',
                    title: 'Academic Regulations 2025',
                    section: 'Attendance Requirements & Policies'
                }]
            };
        }
        
        // Exam queries
        if (queryLower.includes('exam') || queryLower.includes('examination') || queryLower.includes('schedule') || queryLower.includes('test')) {
            return {
                text: `Here's the complete examination schedule and information:

**📅 Semester End Examinations:**
• **Even Semester** (2nd, 4th, 6th, 8th): April - May
• **Odd Semester** (1st, 3rd, 5th, 7th): November - December
• **Duration**: 3 hours per paper
• **Total Exam Period**: Approximately 3-4 weeks

**📊 Assessment Structure:**
• **Internal Assessment**: 40% of total marks
  - Assignment: 10 marks
  - Internal Tests: 20 marks
  - Seminar/Project: 10 marks
• **Semester End Exam**: 60% of total marks (100 marks)

**📋 Internal Assessment Schedule:**
• **First Internal Test**: 6th week of semester
• **Second Internal Test**: 12th week of semester
• **Assignments**: Continuous throughout semester
• **Seminars**: As per faculty schedule

**🎫 Hall Ticket Information:**
• **Release**: 1 week before examinations
• **Download**: Student portal only
• **Requirements**: 75% attendance + fee clearance
• **Validity**: Check photo and details carefully

**⚠️ Important Examination Rules:**
• Report 30 minutes before exam time
• Bring valid hall ticket and ID card
• Electronic devices strictly prohibited
• Follow dress code (formal attire)
• No malpractice tolerance policy

**📞 Exam Cell Contact:**
• Email: exams@oxfordcollege.edu.in
• Phone: +91-80-12345678
• Office Hours: 9:00 AM - 5:00 PM

Stay updated through the student portal and college notices!`,
                sources: [{
                    id: 'academic_regulations_2025',
                    title: 'Academic Regulations 2025',
                    section: 'Examination Schedule & Assessment'
                }]
            };
        }
        
        // Library queries
        if (queryLower.includes('library') || queryLower.includes('book') || queryLower.includes('study')) {
            return {
                text: `Here's information about library services and facilities:

**📚 Library Facilities:**
• **Collection**: 50,000+ books, journals, and digital resources
• **Seating Capacity**: 200 students
• **Operating Hours**: 8:00 AM - 8:00 PM (Mon-Sat)
• **Digital Library**: 24/7 online access to e-resources

**📖 Services Available:**
• **Book Lending**: Issue and return facility
• **Reference Section**: For in-library use only
• **Digital Access**: Online journals and databases
• **Photocopy Service**: Available at nominal charges
• **Group Study Rooms**: Bookable for projects

**💳 Lending Policy:**
• **Students**: 3 books for 15 days
• **Faculty**: 5 books for 30 days
• **Renewals**: Twice if no waiting list
• **Fine**: Rs. 2 per day for overdue books

**🔍 How to Search Books:**
• Online catalog through library portal
• Library mobile app available
• Staff assistance at help desk
• Subject-wise classification system

**📱 Digital Resources:**
• IEEE Digital Library
• Springer Online Journals
• ACM Digital Library
• NPTEL Video Lectures
• E-books collection

**📞 Library Contact:**
• Email: library@oxfordcollege.edu.in
• Extension: 234
• Librarian: Dr. Priya Sharma

Visit the library for a conducive study environment!`,
                sources: [{
                    id: 'library_services_2025',
                    title: 'Library Services Guide 2025',
                    section: 'Complete Library Information'
                }]
            };
        }
        
        // Default response for unmatched queries
        return {
            text: `I understand you're asking about "${query}". While I have comprehensive information about various college topics, I might not have specific details about your exact query in my current knowledge base.

**🎯 I can help you with:**
• **Academic**: Regulations, exams, revaluation, attendance
• **Financial**: Fee structures, payment deadlines, scholarships
• **Placements**: Company drives, eligibility, preparation support
• **Facilities**: Hostel accommodation, library services, campus facilities
• **Administrative**: Policies, procedures, contact information

**💡 Try asking more specifically:**
• "What are the revaluation fees and process?"
• "Tell me about upcoming placement drives"
• "How do I apply for hostel accommodation?"
• "What is the minimum attendance requirement?"

${this.currentUser ? `Feel free to ask anything, ${this.currentUser.firstName}` : 'Feel free to ask anything'} - I'm here to help make your college experience smoother! 😊`,
            sources: []
        };
    }
    
    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.remove('hidden');
            this.scrollToBottom();
        }
    }
    
    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.add('hidden');
        }
    }
    
    setInputState(enabled) {
        if (this.userInput) this.userInput.disabled = !enabled;
        if (this.sendButton) this.sendButton.disabled = !enabled;
        
        if (this.userInput) {
            if (enabled) {
                this.userInput.classList.remove('disabled');
            } else {
                this.userInput.classList.add('disabled');
            }
        }
        
        if (this.sendButton) {
            if (enabled) {
                this.sendButton.classList.remove('disabled');
            } else {
                this.sendButton.classList.add('disabled');
            }
        }
    }
    
    formatAIResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/•/g, '•')
            .replace(/\n/g, '<br>');
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    scrollToBottom() {
        if (this.messagesArea) {
            setTimeout(() => {
                this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
            }, 100);
        }
    }
}

// Global functions for modal and other controls
function showDocumentSource(docId, section) {
    const doc = CONFIG.DOCUMENT_DATABASE.find(d => d.id === docId);
    if (!doc) return;
    
    const documentTitle = document.getElementById('documentTitle');
    const documentDetails = document.getElementById('documentDetails');
    const documentExcerpt = document.getElementById('documentExcerpt');
    const documentModal = document.getElementById('documentModal');
    
    if (documentTitle) documentTitle.textContent = doc.title;
    if (documentDetails) documentDetails.textContent = section;
    if (documentExcerpt) {
        documentExcerpt.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.9rem; line-height: 1.6;">${doc.content}</pre>`;
    }
    
    if (documentModal) documentModal.classList.remove('hidden');
}

function closeDocumentModal() {
    const documentModal = document.getElementById('documentModal');
    if (documentModal) documentModal.classList.add('hidden');
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.password-visibility .eye-icon');
    
    if (passwordInput && eyeIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2"/>
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>
            `;
        } else {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            `;
        }
    }
}

function demoLogin() {
    // Auto-fill demo credentials
    const studentIdInput = document.getElementById('studentId');
    const passwordInput = document.getElementById('password');
    
    if (studentIdInput && passwordInput) {
        studentIdInput.value = 'DEMO2025';
        passwordInput.value = 'demo123';
        
        // Trigger login automatically
        if (window.campusAI) {
            window.campusAI.handleLogin();
        }
    }
}

function logout() {
    if (window.campusAI) {
        window.campusAI.logout();
    }
}

// Initialize the application when DOM is loaded
let campusAI;
document.addEventListener('DOMContentLoaded', () => {
    campusAI = new CampusAIAssistant();
    
    // Make campusAI globally accessible
    window.campusAI = campusAI;
    
    // Add some professional styling for auth error animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});
