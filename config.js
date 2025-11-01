// ========================================
// CAMPUS AI CONFIGURATION
// ========================================

const KNOWLEDGE_BASE = {
    // College Information
    college: {
        name: "The Oxford College of Engineering",
        location: "Bengaluru, Karnataka",
        email: "info@oxfordcollege.edu.in",
        phone: "+91-80-12345678"
    },

    // Revaluation Information
    revaluation: {
        fee: 1000,
        deadline: "15 days from result declaration",
        process: "Online through student portal",
        timeline: "Results within 30 days",
        refundable: false
    },

    // Fee Structure
    fees: {
        tuition: 120000,
        development: 15000,
        lab: 8000,
        library: 2000,
        total: 145000,
        installments: "60% by June 30, 40% by Dec 31",
        lateFee: 500
    },

    // Placement Information
    placements: {
        companies: [
            { 
                name: "TCS", 
                date: "Oct 15-16, 2025", 
                cgpa: 6.0, 
                package: "3.5-7 LPA",
                roles: ["Software Engineer", "System Engineer"]
            },
            { 
                name: "Infosys", 
                date: "Oct 20-22, 2025", 
                cgpa: 6.5, 
                package: "4-8 LPA",
                roles: ["Software Developer"]
            },
            { 
                name: "Wipro", 
                date: "Oct 25-27, 2025", 
                cgpa: 6.0, 
                package: "3.8-6.5 LPA",
                roles: ["Project Engineer"]
            },
            { 
                name: "Amazon", 
                date: "Nov 5-6, 2025", 
                cgpa: 7.5, 
                package: "12-18 LPA",
                roles: ["SDE-1"]
            },
            { 
                name: "Microsoft", 
                date: "Nov 12-13, 2025", 
                cgpa: 8.0, 
                package: "15-25 LPA",
                roles: ["Software Engineer"]
            }
        ],
        eligibility: "75% attendance, no backlogs, minimum CGPA varies by company",
        contactEmail: "placement@oxfordcollege.edu.in"
    },

    // Hostel Information
    hostel: {
        single: 8000,
        double: 5000,
        triple: 3500,
        mess: 4500,
        securityDeposit: 10000,
        facilities: [
            "24/7 WiFi",
            "Gymnasium",
            "Medical room",
            "Common room",
            "Laundry service",
            "24/7 Security"
        ],
        inTime: "10:30 PM weekdays, 11:00 PM weekends",
        visitorHours: "10:00 AM - 6:00 PM"
    },

    // Attendance Requirements
    attendance: {
        minimum: 75,
        warningLevel: 65,
        consequences: "Cannot appear for semester exams if below 75%",
        medicalLeaveDeadline: "Apply within 7 days with certificate"
    },

    // Examination Information
    exams: {
        evenSemester: "April - May",
        oddSemester: "November - December",
        internal: 40,
        external: 60,
        duration: "3 hours per paper"
    },

    // Library Information
    library: {
        collection: "50,000+ books and journals",
        hours: "8:00 AM - 8:00 PM (Mon-Sat)",
        lending: "3 books for 15 days",
        fine: "Rs. 2 per day for overdue",
        digitalResources: [
            "IEEE Digital Library",
            "Springer Journals",
            "ACM Digital Library",
            "NPTEL Videos"
        ]
    }
};

// AI Configuration Storage
const AI_CONFIG = {
    provider: localStorage.getItem('ai_provider') || 'local',
    apiKey: localStorage.getItem('ai_api_key') || '',
    model: localStorage.getItem('ai_model') || 'gemini-pro'
};

console.log('✅ Config loaded successfully!');