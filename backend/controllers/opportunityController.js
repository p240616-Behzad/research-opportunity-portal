const Opportunity = require('../models/opportunityModel');

// Simple validation helper
const validateOpportunity = (body) => {
    const errors = [];
    if (!body.title || body.title.trim() === '') errors.push('Title is required');
    if (!body.description || body.description.trim() === '') errors.push('Description is required');
    if (!body.research_area || body.research_area.trim() === '') errors.push('Research area is required');
    if (body.available_positions !== undefined && body.available_positions < 1) 
        errors.push('Available positions must be at least 1');
    return errors;
};

// CREATE - POST /api/opportunities
exports.createOpportunity = async (req, res) => {
    try {
        const errors = validateOpportunity(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        const id = await Opportunity.create(req.body);
        const created = await Opportunity.findById(id);

        res.status(201).json({
            success: true,
            message: 'Opportunity created successfully',
            data: created
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// READ ALL - GET /api/opportunities
exports.getAllOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.findAll();
        res.status(200).json({
            success: true,
            count: opportunities.length,
            data: opportunities
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// READ ONE - GET /api/opportunities/:id
exports.getOpportunityById = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ success: false, message: 'Opportunity not found' });
        }
        res.status(200).json({ success: true, data: opportunity });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// UPDATE - PUT /api/opportunities/:id
exports.updateOpportunity = async (req, res) => {
    try {
        const existing = await Opportunity.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Opportunity not found' });
        }

        const errors = validateOpportunity(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        await Opportunity.update(req.params.id, req.body);
        const updated = await Opportunity.findById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Opportunity updated successfully',
            data: updated
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// DELETE - DELETE /api/opportunities/:id
exports.deleteOpportunity = async (req, res) => {
    try {
        const existing = await Opportunity.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Opportunity not found' });
        }

        await Opportunity.delete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Opportunity deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};