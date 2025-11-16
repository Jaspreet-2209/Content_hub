const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const DOCUMENTS = [
    {
        id: 'doc-001',
        title: 'Q3 2024 Product Launch Strategy',
        content: 'Details the core messaging, target audiences, and planned communication channels for the new "Nova" software feature. Focuses heavily on the ROI calculation and competitor analysis.',
        format: 'PDF',
        category: 'Product/Project',
        team: 'Strategy',
        link: '#/files/001',
        date: '2024-09-15'
    },
    {
        id: 'doc-002',
        title: 'Brand Voice Guidelines V2.1',
        content: 'The official style guide defining tone, approved terminology, and legal disclaimers for all external communications. Essential for consistent messaging.',
        format: 'DOCX',
        category: 'Assets/Guidelines',
        team: 'Creative',
        link: '#/files/002',
        date: '2023-11-01'
    },
    {
        id: 'doc-003',
        title: 'Social Media Ad Copy Templates',
        content: 'Collection of high-performing headline and body copy templates for Facebook, Instagram, and LinkedIn. Includes A/B testing results from last campaign cycle.',
        format: 'XLSX',
        category: 'Campaign',
        team: 'DemandGen',
        link: '#/files/003',
        date: '2024-08-20'
    },
    {
        id: 'doc-004',
        title: 'Sales Enablement Deck - Core Features',
        content: 'The primary presentation deck used by the sales team. Covers technical specifications and customer success stories. Make sure this is always the latest version.',
        format: 'PPTX',
        category: 'Sales/Training',
        team: 'Content',
        link: '#/files/004',
        date: '2024-10-05'
    },
    {
        id: 'doc-005',
        title: 'Executive Summary: 2025 Budget Proposal',
        content: 'High-level financial overview for next year, focusing on new technology investments and team hiring plans. Top-level management review required.',
        format: 'PDF',
        category: 'Strategy',
        team: 'Finance',
        link: '#/files/005',
        date: '2024-10-25'
    },
];


app.use(cors());
app.use(express.json());
app.get('/api/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const categoryFilter = req.query.category || 'All';

 
    let filteredResults = DOCUMENTS;
    if (categoryFilter !== 'All') {
        filteredResults = DOCUMENTS.filter(doc => doc.category === categoryFilter);
    }

   
    if (query) {
        filteredResults = filteredResults.filter(doc =>
            doc.title.toLowerCase().includes(query) ||
            doc.content.toLowerCase().includes(query) ||
            doc.team.toLowerCase().includes(query)
        );
    }

    
    filteredResults.sort((a, b) => new Date(b.date) - new Date(a.date));

    setTimeout(() => {
        res.json({
            count: filteredResults.length,
            results: filteredResults,
            categories: ['All', ...new Set(DOCUMENTS.map(d => d.category))],
            teams: ['All', ...new Set(DOCUMENTS.map(d => d.team))]
        });
    }, 500);
});

app.listen(port, () => {
    console.log(`\n🚀 Node.js Search Backend listening at http://localhost:${port}`);
    console.log('API Endpoint: http://localhost:3001/api/search?q=brand&category=All\n');
});