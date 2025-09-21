// CampusAI Assistant Configuration
const CONFIG = {
    // Student Database (In production, this would be a real database)
    STUDENT_DATABASE: [
        {
            studentId: '1BG21CS001',
            password: 'campus123',
            firstName: 'Nithin',
            lastName: 'S',
            branch: 'CSE',
            semester: '6th',
            year: '2025',
            email: 'nithin@oxfordcollege.edu.in'
        },
        {
            studentId: '1BG21CS002', 
            password: 'student123',
            firstName: 'Rahul',
            lastName: 'Kumar',
            branch: 'CSE',
            semester: '6th',
            year: '2025',
            email: 'rahul@oxfordcollege.edu.in'
        },
        {
            studentId: 'demo',
            password: 'demo',
            firstName: 'Demo',
            lastName: 'User',
            branch: 'CSE',
            semester: '6th',
            year: '2025',
            email: 'demo@oxfordcollege.edu.in'
        }
    ],

    // College Document Database
    DOCUMENT_DATABASE: [
        {
            id: 'academic_regulations_2025',
            title: 'Academic Regulations 2025',
            content: `
            REVALUATION PROCESS AND FEES:
            
            Students who wish to apply for revaluation of their answer scripts must follow these procedures:
            
            1. Revaluation Fee: Rs. 1000 per subject
            2. Last date for revaluation application: 15 days from result declaration
            3. Online application through student portal is mandatory
            4. Results will be declared within 30 days of application
            
            EXAMINATION SCHEDULE:
            
            Semester End Examinations are conducted twice a year:
            - Even Semester: April-May
            - Odd Semester: November-December
            
            Internal Assessment: Continuous evaluation throughout the semester comprising 40% of total marks.
            
            ATTENDANCE REQUIREMENTS:
            
            Minimum 75% attendance is mandatory for appearing in semester examinations.
            Medical leave applications must be submitted within 7 days with proper documentation.
            `,
            tags: ['academic', 'exams', 'revaluation', 'attendance']
        },
        {
            id: 'fee_structure_2025',
            title: 'Fee Structure and Payment Guidelines 2025',
            content: `
            ANNUAL FEE STRUCTURE:
            
            B.E Computer Science Engineering:
            - Tuition Fee: Rs. 1,20,000 per annum
            - Development Fee: Rs. 15,000 per annum  
            - Laboratory Fee: Rs. 8,000 per annum
            - Library Fee: Rs. 2,000 per annum
            
            PAYMENT DEADLINES:
            
            - First Installment: June 30th (60% of annual fee)
            - Second Installment: December 31st (40% of annual fee)
            
            LATE PAYMENT PENALTY:
            
            Rs. 500 per month after due date.
            Students with pending dues cannot appear for examinations.
            
            SCHOLARSHIP INFORMATION:
            
            Merit scholarships available for students with CGPA above 8.5
            Need-based scholarships for economically backward students
            Application deadline: August 31st annually
            `,
            tags: ['fees', 'payment', 'scholarship', 'deadlines']
        },
        {
            id: 'placement_guidelines_2025',
            title: 'Placement Cell Guidelines 2025',
            content: `
            PLACEMENT ELIGIBILITY CRITERIA:
            
            Minimum Requirements:
            - CGPA: 6.0 and above (varies by company)
            - No active backlogs
            - 75% attendance in current semester
            
            UPCOMING PLACEMENT DRIVES:
            
            October 2025:
            - TCS: October 15-16 (CGPA: 6.0+)
            - Infosys: October 20-22 (CGPA: 6.5+)
            - Wipro: October 25-27 (CGPA: 6.0+)
            
            November 2025:
            - Amazon: November 5-6 (CGPA: 7.5+)
            - Microsoft: November 12-13 (CGPA: 8.0+)
            
            PLACEMENT PREPARATION:
            
            Mock interviews conducted every Friday
            Resume building workshops monthly
            Technical skill enhancement programs available
            
            CONTACT: placement@oxfordcollege.edu.in
            `,
            tags: ['placement', 'jobs', 'companies', 'eligibility']
        },
        {
            id: 'hostel_facilities_2025',
            title: 'Hostel Rules and Facilities 2025',
            content: `
            HOSTEL ACCOMMODATION:
            
            Room Types Available:
            - Single occupancy: Rs. 8000 per month
            - Double occupancy: Rs. 5000 per month per student
            - Triple occupancy: Rs. 3500 per month per student
            
            FACILITIES PROVIDED:
            
            - 24/7 WiFi connectivity
            - Common room with TV and games
            - Gymnasium and sports facilities  
            - Medical room with first aid
            - Mess facility (vegetarian and non-vegetarian)
            
            HOSTEL RULES:
            
            - In-time: 10:30 PM on weekdays, 11:00 PM on weekends
            - Visitor timings: 10:00 AM - 6:00 PM
            - No outside food in mess area
            - Smoking and alcohol strictly prohibited
            
            MESS TIMINGS:
            
            Breakfast: 7:30 AM - 9:30 AM
            Lunch: 12:30 PM - 2:30 PM  
            Dinner: 7:30 PM - 9:30 PM
            `,
            tags: ['hostel', 'accommodation', 'rules', 'facilities']
        }
    ],
    
    // UI Settings
    TYPING_DELAY: 1500,
    MAX_MESSAGE_LENGTH: 500,
    
    // Sample Queries for Suggestions
    SUGGESTION_QUERIES: [
        "What are the revaluation fees and deadlines?",
        "Tell me about upcoming placement drives",
        "What are the hostel rules and regulations?",
        "How do I apply for scholarships?",
        "What is the minimum attendance requirement?",
        "When are the semester examinations?"
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
