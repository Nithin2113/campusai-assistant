// ========================================
// CAMPUS AI ASSISTANT - MAIN APPLICATION
// ========================================

// State Management
let conversationHistory = [];
let theme = localStorage.getItem('theme') || 'dark';

// DOM Elements
const elements = {
    themeToggle: document.getElementById('themeToggle'),
    messagesContainer: document.getElementById('messagesContainer'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    attachBtn: document.getElementById('attachBtn'),
    apiModal: document.getElementById('apiModal'),
    apiStatus: document.getElementById('apiStatus'),
    apiProvider: document.getElementById('apiProvider'),
    apiKey: document.getElementById('apiKey'),
    apiKeyGroup: document.getElementById('apiKeyGroup'),
    modelGroup: document.getElementById('modelGroup'),
    modelSelect: document.getElementById('modelSelect'),
    saveApiBtn: document.getElementById('saveApiBtn'),
    cancelBtn: document.getElementById('cancelBtn')
};

// ========================================
// INITIALIZATION
// ========================================

function init() {
    // Set theme
    document.documentElement.setAttribute('data-theme', theme);
    elements.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    
    // Update API status
    updateAPIStatus();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('✅ CampusAI initialized successfully!');
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Send message
    elements.sendBtn.addEventListener('click', handleSend);
    elements.userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
    
    // Auto-resize textarea
    elements.userInput.addEventListener('input', () => {
        elements.userInput.style.height = 'auto';
        elements.userInput.style.height = Math.min(elements.userInput.scrollHeight, 120) + 'px';
    });
    
    // Quick actions
    document.querySelectorAll('.quick-action').forEach(action => {
        action.addEventListener('click', () => {
            const query = action.getAttribute('data-query');
            elements.userInput.value = query;
            handleSend();
        });
    });
    
    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            elements.userInput.value = chip.textContent;
            handleSend();
        });
    });
    
    // API Modal
    elements.attachBtn.addEventListener('click', openAPIModal);
    elements.cancelBtn.addEventListener('click', closeAPIModal);
    elements.saveApiBtn.addEventListener('click', saveAPIConfig);
    elements.apiProvider.addEventListener('change', updateModalFields);
}

// ========================================
// THEME MANAGEMENT
// ========================================

function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    elements.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ========================================
// API CONFIGURATION
// ========================================

function updateAPIStatus() {
    const statusMap = {
        'local': { text: 'Local Mode', color: '#3b82f6' },
        'gemini': { text: 'Gemini Connected', color: '#10b981' },
        'openai': { text: 'OpenAI Connected', color: '#10b981' },
        'anthropic': { text: 'Claude Connected', color: '#10b981' }
    };
    const status = statusMap[AI_CONFIG.provider] || statusMap.local;
    elements.apiStatus.querySelector('span:last-child').textContent = status.text;
    elements.apiStatus.querySelector('.status-dot').style.background = status.color;
}

function openAPIModal() {
    elements.apiModal.classList.remove('hidden');
    elements.apiProvider.value = AI_CONFIG.provider;
    elements.apiKey.value = AI_CONFIG.apiKey;
    updateModalFields();
}

function closeAPIModal() {
    elements.apiModal.classList.add('hidden');
}

function updateModalFields() {
    const provider = elements.apiProvider.value;
    if (provider === 'local') {
        elements.apiKeyGroup.classList.add('hidden');
        elements.modelGroup.classList.add('hidden');
    } else {
        elements.apiKeyGroup.classList.remove('hidden');
        elements.modelGroup.classList.toggle('hidden', provider !== 'openai');
    }
}

function saveAPIConfig() {
    AI_CONFIG.provider = elements.apiProvider.value;
    AI_CONFIG.apiKey = elements.apiKey.value;
    AI_CONFIG.model = elements.modelSelect.value;
    
    localStorage.setItem('ai_provider', AI_CONFIG.provider);
    localStorage.setItem('ai_api_key', AI_CONFIG.apiKey);
    localStorage.setItem('ai_model', AI_CONFIG.model);
    
    updateAPIStatus();
    closeAPIModal();
    
    addMessage(
        `✅ AI configuration updated! Now using ${AI_CONFIG.provider.toUpperCase()} mode.`,
        'ai'
    );
}

// ========================================
// MESSAGE HANDLING
// ========================================

async function handleSend() {
    const message = elements.userInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    elements.userInput.value = '';
    elements.userInput.style.height = 'auto';

    // Disable send button
    elements.sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();

    try {
        // Get AI response
        const response = await getAIResponse(message);
        hideTypingIndicator();
        addMessage(response.text, 'ai', response.sources);
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        addMessage(
            'I apologize, but I encountered an error processing your request. Please try again or check your API configuration.',
            'ai'
        );
    }

    // Re-enable send button
    elements.sendBtn.disabled = false;
    elements.userInput.focus();
}

function addMessage(text, type, sources = []) {
    const message = document.createElement('div');
    message.className = `message ${type}-message`;
    
    const avatar = type === 'ai' ? '🤖' : '👤';
    const sender = type === 'ai' ? 'CampusAI' : 'You';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let sourcesHTML = '';
    if (sources.length > 0) {
        sourcesHTML = `
            <div class="message-sources">
                <span class="source-label">📚 Sources:</span>
                ${sources.map(s => `<span class="source-chip">${s}</span>`).join('')}
            </div>
        `;
    }
    
    message.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">${sender}</span>
                ${type === 'ai' ? '<span class="ai-badge">✨ AI</span>' : ''}
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">
                ${formatText(text)}
                ${sourcesHTML}
            </div>
        </div>
    `;
    
    elements.messagesContainer.appendChild(message);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
    
    // Save to history
    conversationHistory.push({
        role: type === 'user' ? 'user' : 'assistant',
        content: text,
        timestamp: new Date().toISOString()
    });
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message ai-message';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    elements.messagesContainer.appendChild(indicator);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function formatText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/•/g, '•');
}

// ========================================
// AI RESPONSE GENERATION
// ========================================

async function getAIResponse(userMessage) {
    if (AI_CONFIG.provider === 'local') {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 1000));
        return generateLocalResponse(userMessage);
    }

    try {
        switch (AI_CONFIG.provider) {
            case 'gemini':
                return await getGeminiResponse(userMessage);
            case 'openai':
                return await getOpenAIResponse(userMessage);
            case 'anthropic':
                return await getAnthropicResponse(userMessage);
            default:
                return generateLocalResponse(userMessage);
        }
    } catch (error) {
        console.error('AI API Error:', error);
        return {
            text: "I'm having trouble connecting to the AI service. Switching to local mode...\n\n" + generateLocalResponse(userMessage).text,
            sources: []
        };
    }
}

// ========================================
// LOCAL KNOWLEDGE BASE RESPONSES
// ========================================

function generateLocalResponse(query) {
    const queryLower = query.toLowerCase();
    
    // Revaluation
    if (queryLower.includes('reval')) {
        const kb = KNOWLEDGE_BASE.revaluation;
        return {
            text: `**📋 Revaluation Information:**\n\n**Fee:** Rs. ${kb.fee} per subject\n**Deadline:** ${kb.deadline}\n**Process:** ${kb.process}\n**Timeline:** ${kb.timeline}\n**Refundable:** ${kb.refundable ? 'Yes' : 'No'}\n\n**Important Notes:**\n• Apply online through student portal\n• Late applications will not be accepted\n• Results may increase, decrease, or remain same`,
            sources: ['Academic Regulations 2025']
        };
    }
    
    // Placements
    if (queryLower.includes('placement') || queryLower.includes('job') || queryLower.includes('drive') || queryLower.includes('company')) {
        const kb = KNOWLEDGE_BASE.placements;
        const companyList = kb.companies.map(c => 
            `• **${c.name}** - ${c.date}\n  CGPA: ${c.cgpa}+ | Package: ${c.package}\n  Roles: ${c.roles.join(', ')}`
        ).join('\n\n');
        return {
            text: `**💼 Upcoming Placement Drives:**\n\n${companyList}\n\n**Eligibility:** ${kb.eligibility}\n\n**Preparation Support:**\n• Mock interviews every Friday\n• Resume building workshops\n• Technical skill enhancement\n• Aptitude test preparation\n\n📧 Contact: ${kb.contactEmail}`,
            sources: ['Placement Cell Guidelines 2025']
        };
    }
    
    // Fees
    if (queryLower.includes('fee') || queryLower.includes('payment') || queryLower.includes('tuition')) {
        const kb = KNOWLEDGE_BASE.fees;
        return {
            text: `**💰 Annual Fee Structure (B.E):**\n\n• **Tuition Fee:** Rs. ${kb.tuition.toLocaleString()}\n• **Development Fee:** Rs. ${kb.development.toLocaleString()}\n• **Laboratory Fee:** Rs. ${kb.lab.toLocaleString()}\n• **Library Fee:** Rs. ${kb.library.toLocaleString()}\n\n**Total:** Rs. ${kb.total.toLocaleString()} per annum\n\n**Payment Schedule:** ${kb.installments}\n**Late Fee:** Rs. ${kb.lateFee} per month\n\n**Scholarships Available:**\n• Merit scholarships (CGPA > 8.5)\n• Need-based financial aid\n• Sports scholarships`,
            sources: ['Fee Structure 2025']
        };
    }
    
    // Hostel
    if (queryLower.includes('hostel') || queryLower.includes('accommodation') || queryLower.includes('mess')) {
        const kb = KNOWLEDGE_BASE.hostel;
        return {
            text: `**🏠 Hostel Accommodation:**\n\n**Room Types (Monthly):**\n• Single: Rs. ${kb.single}\n• Double: Rs. ${kb.double}\n• Triple: Rs. ${kb.triple}\n\n**Mess:** Rs. ${kb.mess}/month\n**Security Deposit:** Rs. ${kb.securityDeposit} (refundable)\n\n**Facilities:**\n${kb.facilities.map(f => `• ${f}`).join('\n')}\n\n**Rules:**\n• In-time: ${kb.inTime}\n• Visitor hours: ${kb.visitorHours}`,
            sources: ['Hostel Facilities 2025']
        };
    }
    
    // Attendance
    if (queryLower.includes('attendance') || queryLower.includes('minimum') || queryLower.includes('percent')) {
        const kb = KNOWLEDGE_BASE.attendance;
        return {
            text: `**📊 Attendance Requirements:**\n\n**Minimum Required:** ${kb.minimum}%\n**Warning Level:** ${kb.warningLevel}%\n**Consequences:** ${kb.consequences}\n\n**Medical Leave:**\n${kb.medicalLeaveDeadline}\n\n**Monitoring:**\n• Weekly SMS updates\n• Monthly reports to parents\n• Real-time portal updates`,
            sources: ['Academic Regulations 2025']
        };
    }
    
    // Exams
    if (queryLower.includes('exam') || queryLower.includes('test') || queryLower.includes('semester')) {
        const kb = KNOWLEDGE_BASE.exams;
        return {
            text: `**📚 Examination Schedule:**\n\n**Semester Exams:**\n• Even Semester: ${kb.evenSemester}\n• Odd Semester: ${kb.oddSemester}\n• Duration: ${kb.duration}\n\n**Assessment:**\n• Internal: ${kb.internal}%\n• External: ${kb.external}%\n\n**Hall Ticket:**\n• Released 1 week before exams\n• Download from student portal\n• Requires 75% attendance + fee clearance`,
            sources: ['Academic Regulations 2025']
        };
    }
    
    // Library
    if (queryLower.includes('library') || queryLower.includes('book')) {
        const kb = KNOWLEDGE_BASE.library;
        return {
            text: `**📖 Library Services:**\n\n**Collection:** ${kb.collection}\n**Hours:** ${kb.hours}\n**Lending:** ${kb.lending}\n**Fine:** ${kb.fine}\n\n**Digital Resources:**\n${kb.digitalResources.map(r => `• ${r}`).join('\n')}\n\n📧 Contact: library@oxfordcollege.edu.in`,
            sources: ['Library Services Guide 2025']
        };
    }
    
    // Greetings
    if (queryLower.match(/\b(hello|hi|hey|greetings)\b/)) {
        return {
            text: `Hello! 👋 I'm your AI-powered Campus Assistant.\n\nI can help you with:\n**📚 Academic** - Exams, regulations\n**💰 Financial** - Fees, scholarships\n**💼 Placements** - Drives, eligibility\n**🏠 Campus** - Hostel, library\n\nWhat would you like to know?`,
            sources: []
        };
    }
    
    // Thanks
    if (queryLower.includes('thank')) {
        return {
            text: `You're welcome! 😊 Feel free to ask if you have more questions about college policies or procedures.`,
            sources: []
        };
    }
    
    // Default
    return {
        text: `I understand you're asking about "${query}".\n\n**I can help with:**\n• Academic regulations & exams\n• Fee structures & scholarships\n• Placement drives & eligibility\n• Hostel facilities & rules\n• Library services\n• Attendance requirements\n\n**Try asking:**\n• "What are the revaluation fees?"\n• "Tell me about placement drives"\n• "What is the hostel fee?"\n• "Minimum attendance required?"\n\nHow can I assist you?`,
        sources: []
    };
}

// ========================================
// EXTERNAL AI API INTEGRATIONS
// ========================================

async function getGeminiResponse(userMessage) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AI_CONFIG.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `You are CampusAI, an assistant for ${KNOWLEDGE_BASE.college.name}. Use this knowledge: ${JSON.stringify(KNOWLEDGE_BASE)}. Answer: ${userMessage}`
                }]
            }]
        })
    });

    const data = await response.json();
    return {
        text: data.candidates[0].content.parts[0].text,
        sources: extractSources(data.candidates[0].content.parts[0].text)
    };
}

async function getOpenAIResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: [
                {
                    role: 'system',
                    content: `You are CampusAI for ${KNOWLEDGE_BASE.college.name}. Knowledge: ${JSON.stringify(KNOWLEDGE_BASE)}`
                },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.7
        })
    });

    const data = await response.json();
    return {
        text: data.choices[0].message.content,
        sources: extractSources(data.choices[0].message.content)
    };
}

async function getAnthropicResponse(userMessage) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': AI_CONFIG.apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1024,
            messages: [{
                role: 'user',
                content: `You are CampusAI for ${KNOWLEDGE_BASE.college.name}. Knowledge: ${JSON.stringify(KNOWLEDGE_BASE)}. Question: ${userMessage}`
            }]
        })
    });

    const data = await response.json();
    return {
        text: data.content[0].text,
        sources: extractSources(data.content[0].text)
    };
}

function extractSources(text) {
    const sources = [];
    const textLower = text.toLowerCase();
    
    if (textLower.includes('academic') || textLower.includes('exam') || textLower.includes('attendance')) {
        sources.push('Academic Regulations 2025');
    }
    if (textLower.includes('placement') || textLower.includes('job')) {
        sources.push('Placement Cell Guidelines 2025');
    }
    if (textLower.includes('fee') || textLower.includes('payment')) {
        sources.push('Fee Structure 2025');
    }
    if (textLower.includes('hostel')) {
        sources.push('Hostel Facilities 2025');
    }
    if (textLower.includes('library')) {
        sources.push('Library Services Guide 2025');
    }
    
    return [...new Set(sources)];
}

// ========================================
// START APPLICATION
// ========================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('🎓 CampusAI Assistant loaded successfully!');