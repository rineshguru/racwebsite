const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.serialize(() => {
            // Projects Table
            db.run(`CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT,
        date TEXT,
        shortDesc TEXT,
        fullDesc TEXT,
        category TEXT,
        image TEXT,
        actionImages TEXT
      )`);

            // Contacts Table
            db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

            // Club Documents Table
            db.run(`CREATE TABLE IF NOT EXISTS club_documents (
        id TEXT PRIMARY KEY,
        title TEXT,
        type TEXT,
        size TEXT,
        url TEXT
      )`);

            // Seed initial data if projects are empty
            db.get("SELECT COUNT(*) AS count FROM projects", (err, row) => {
                if (row && row.count === 0) {
                    console.log("Seeding initial projects...");
                    const statement = db.prepare(`INSERT INTO projects (id, title, date, shortDesc, fullDesc, category, image, actionImages) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

                    const initialData = [
                        // Ongoing
                        ["og1", "INFO KURAL", "Daily Initiative", "A Thirukkural initiative where our members create videos, spreading its wisdom to society.", "INFO KURAL is a flagship daily initiative aimed at preserving and promoting the profound wisdom of Thirukkural. Every day, a member of our club records a short video explaining a specific Kural and its relevance to modern life. \n\nThis not only helps in spreading ethical and moral values to society but also significantly builds camera confidence, public speaking skills, and honors our rich Tamil language heritage.", "ongoing", "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400"])],
                        ["og2", "KURAL OVIYAM", "365-Day Initiative", "A Tamil poetry initiative where our club members contribute 365 original poems continuously.", "Kural Oviyam is an ambitious Tamil poetry initiative. Over the course of 365 days, our club members dedicate their creative energy to writing and publishing original Tamil poems.\n\nThis continuous effort serves as a platform for creative expression, mental well-being, and a deep, sustained appreciation for literary arts within our engineering community.", "ongoing", "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"])],
                        // Upcoming
                        ["up1", "The Cleansing Flame", "Coming Soon", "Regular crusades and awareness campaigns to purify the land and promote well-being.", "The Cleansing Flame represents our upcoming health and sanitation drive. We will be executing rigorous community clean-ups, public hygiene awareness sessions, and partnering with local health organizations.\n\nOur goal is to physically and metaphorically cleanse our surroundings, ensuring a safer, healthier environment for the vulnerable demographics in Coimbatore.", "upcoming", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400"])],
                        ["up2", "The Forging Series", "March 2026", "Summoning master artisans and sages to share their wisdom and sharpen skills.", "The Forging Series is an advanced masterclass lineup. We are inviting industry veterans, corporate leaders, and technical experts to our 'Stronghold' to conduct intensive, hands-on workshops.\n\nTopics will range from cutting-edge technological advancements in engineering to crucial soft skills like leadership, negotiation, and emotional intelligence.", "upcoming", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"])],
                        ["up3", "Mentorship Drive", "April 2026", "A mentorship program connecting alumni with students to build skills and career clarity.", "Recognizing the gap between academic theory and industry reality, this Mentorship Drive will pair current club members with successful Rotaract alumni and senior professionals.\n\nThrough structured 1-on-1 sessions, mentees will receive personalized guidance on career trajectories, resume building, and overcoming early-career obstacles.", "upcoming", "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400"])],
                        // Completed
                        ["cp1", "Green Earth Phase 1", "October 2025", "Tree plantation and campus sustainability drives focusing on waste segregation.", "Phase 1 of our Green Earth initiative was a resounding success. Over 150 volunteers mobilized to plant 500 indigenous saplings around the campus perimeter.\n\nAdditionally, we implemented a comprehensive waste-segregation protocol within the college cafeterias, significantly reducing our daily carbon footprint and setting a standard for institutional sustainability.", "completed", "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400"])],
                        ["cp2", "Community Health Camp", "August 2025", "Wellness checkups and health awareness sessions benefiting nearby communities.", "In collaboration with leading local hospitals, we hosted a massive free health camp targeting the underprivileged sectors near Kovilpalayam.\n\nThe camp provided free basic diagnostics, eye check-ups, and pediatric consultations to over 300 individuals. We also distributed essential multivitamins and conducted workshops on basic maternal health.", "completed", "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400"])],
                        // Flagship
                        ["fs1", "DAYA 2026", "Flagship Event", "Bringing together 500+ orphaned children for an unforgettable day of joy.", "Daya is the crown jewel legacy project of the Rotaract Club of INFO Institute of Engineering. It is a massive logistical and philanthropic undertaking.\n\nEvery year, we bring together over 500 orphaned children from various homes across the district. For one entire day, we immerse them in interactive games, cultural performances, educational activities, and a grand feast. It is a testament to our commitment to social welfare and youth happiness.", "flagship", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400"])],
                        ["fs2", "ROBO 2026", "Flagship Event", "Rise of Bright Opportunities: Creating massive career opportunities through job fairs.", "ROBO (Rise of Bright Opportunities) is our direct answer to the employment challenges facing modern graduates.\n\nThis flagship project operates as a large-scale job fair, connecting hundreds of final-year students with top-tier corporate recruiters, tech startups, and manufacturing firms. Beyond recruitment, ROBO features mock-interview booths, resume optimization desks, and industry panel discussions.", "flagship", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400"])],
                        ["fs3", "STAR 2026", "Flagship Event", "A fellowship trip bringing Rotaractors together to strengthen club bonds.", "True impact requires a strong, united team. STAR is our exclusive, high-energy fellowship expedition designed solely for club bonding.\n\nBy taking members out of their academic and operational environments, we facilitate deep team-building, trust exercises, and social interaction. This initiative ensures that our 'Clan' remains tightly knit, highly motivated, and mentally refreshed for the year's challenges.", "flagship", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800", JSON.stringify(["https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"])],
                    ];

                    initialData.forEach(item => {
                        statement.run(item);
                    });
                    statement.finalize();
                }
            });

            // Seed initial Club Documents if empty
            db.get("SELECT COUNT(*) AS count FROM club_documents", (err, row) => {
                if (row && row.count === 0) {
                    console.log("Seeding initial club documents...");
                    const stmt = db.prepare(`INSERT INTO club_documents (id, title, type, size, url) VALUES (?, ?, ?, ?, ?)`);
                    const initialDocs = [
                        ["cd1", "GBM Attendance Book", "PDF", "2.4 MB", "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800"],
                        ["cd2", "GBM Minutes Book", "PDF", "1.8 MB", "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"],
                        ["cd3", "Board Meeting Attendance Book", "PDF", "3.1 MB", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"],
                        ["cd4", "Board Meeting Minutes Book", "PDF", "1.2 MB", "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"],
                        ["cd5", "Meeting Notification Records", "DOCX", "0.5 MB", "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&q=80&w=800"],
                        ["cd6", "Member’s Bio data forms", "PDF", "1.5 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd7", "Meeting Minutes Template", "PDF", "0.8 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd8", "President’s Incoming File", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd9", "President’s Outgoing File", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd10", "Secretary’s Incoming File", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd11", "Secretary’s Outgoing File", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd12", "Monthly Report Copies (July 2025)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd13", "Monthly Report Copies (August 2025)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd14", "Monthly Report Copies (September 2025)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd15", "Monthly Report Copies (October 2025)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd16", "Monthly Report Copies (November 2025)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd17", "Monthly Report Copies (December 2025)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd18", "Monthly Report Copies (January 2026)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd19", "Monthly Report Copies (February 2026)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd20", "Monthly Report Copies (March 2026)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd21", "Monthly Report Copies (April 2026)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd22", "Monthly Report Copies (May 2026)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd23", "Monthly Report Copies (June 2026)", "PDF", "2.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd24", "Monthly Report Acknowledgement Letters (July 2025)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd25", "Monthly Report Acknowledgement Letters (August 2025)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd26", "Monthly Report Acknowledgement Letters (September 2025)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd27", "Monthly Report Acknowledgement Letters (October 2025)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd28", "Monthly Report Acknowledgement Letters (November 2025)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd29", "Monthly Report Acknowledgement Letters (December 2025)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd30", "Monthly Report Acknowledgement Letters (January 2026)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd31", "Monthly Report Acknowledgement Letters (February 2026)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd32", "Monthly Report Acknowledgement Letters (March 2026)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd33", "Monthly Report Acknowledgement Letters (April 2026)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd34", "Monthly Report Acknowledgement Letters (May 2026)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd35", "Monthly Report Acknowledgement Letters (June 2026)", "PDF", "5.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd36", "Bills and Receipts", "PDF", "12.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd37", "Duly passed half yearly account statement", "PDF", "8.7 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd38", "Public Relations File", "PDF", "3.4 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd39", "District Priority Project File", "PDF", "4.1 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd40", "Club Service Project File", "PDF", "3.8 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd41", "Community Service Project File (2025)", "PDF", "4.5 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd42", "Professional Service Project File (2025)", "PDF", "3.2 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd43", "International Service Project File (2025)", "PDF", "4.9 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd44", "Partners in Service File", "PDF", "3.6 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"],
                        ["cd45", "Annual Planner & Budget", "PDF", "5.8 MB", "http://localhost:5173/src/assets/annual-planner-budget.pdf"]
                    ];

                    initialDocs.forEach(item => stmt.run(item));
                    stmt.finalize();
                }
            });
        });
    }
});

module.exports = db;
