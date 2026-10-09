const db = require('../config/db');

const Opportunity = {
    // CREATE
    create: async (data) => {
        const { title, description, research_area, required_skills, available_positions, application_deadline, status } = data;
        const [result] = await db.query(
            `INSERT INTO opportunities 
             (title, description, research_area, required_skills, available_positions, application_deadline, status)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, research_area, required_skills || null, available_positions || 1, application_deadline || null, status || 'Open']
        );
        return result.insertId;
    },

    // READ ALL
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM opportunities ORDER BY created_at DESC');
        return rows;
    },

    // READ ONE
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM opportunities WHERE id = ?', [id]);
        return rows[0];
    },

    // UPDATE
    update: async (id, data) => {
        const { title, description, research_area, required_skills, available_positions, application_deadline, status } = data;
        const [result] = await db.query(
            `UPDATE opportunities 
             SET title = ?, description = ?, research_area = ?, required_skills = ?, 
                 available_positions = ?, application_deadline = ?, status = ?
             WHERE id = ?`,
            [title, description, research_area, required_skills, available_positions, application_deadline, status, id]
        );
        return result.affectedRows;
    },

    // DELETE
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM opportunities WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Opportunity;