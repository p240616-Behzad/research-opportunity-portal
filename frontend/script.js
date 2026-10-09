const API_URL = 'http://localhost:5000/api/opportunities';

// ===== Alert Helper =====
function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert ${type}`;
    setTimeout(() => alert.classList.add('hidden'), 3500);
}

// ===== Fetch All =====
async function loadOpportunities() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        renderList(result.data);
    } catch (err) {
        showAlert('Failed to load opportunities. Is the backend running?', 'error');
    }
}

function renderList(opportunities) {
    const container = document.getElementById('opportunities-list');
    if (!opportunities || !opportunities.length) {
        container.innerHTML = '<p>No opportunities yet. Create one above.</p>';
        return;
    }

    container.innerHTML = opportunities.map(op => `
        <div class="opportunity-item">
            <div class="info">
                <h3>${escapeHtml(op.title)}</h3>
                <p><strong>Area:</strong> ${escapeHtml(op.research_area)}
                   | <span class="badge ${op.status.toLowerCase()}">${op.status}</span></p>
            </div>
            <div class="actions">
                <button class="btn small secondary" onclick="viewDetails(${op.id})">View</button>
                <button class="btn small primary" onclick="editOpportunity(${op.id})">Edit</button>
                <button class="btn small secondary" onclick="toggleStatus(${op.id}, '${op.status}')">
                    ${op.status === 'Open' ? 'Close' : 'Reopen'}
                </button>
                <button class="btn small danger" onclick="deleteOpportunity(${op.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// ===== View Details =====
async function viewDetails(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const result = await res.json();
    if (!result.success) return showAlert(result.message, 'error');

    const op = result.data;
    document.getElementById('details-content').innerHTML = `
        <p><strong>ID:</strong> ${op.id}</p>
        <p><strong>Title:</strong> ${escapeHtml(op.title)}</p>
        <p><strong>Description:</strong> ${escapeHtml(op.description)}</p>
        <p><strong>Research Area:</strong> ${escapeHtml(op.research_area)}</p>
        <p><strong>Required Skills:</strong> ${escapeHtml(op.required_skills || 'N/A')}</p>
        <p><strong>Available Positions:</strong> ${op.available_positions}</p>
        <p><strong>Deadline:</strong> ${op.application_deadline ? op.application_deadline.split('T')[0] : 'N/A'}</p>
        <p><strong>Status:</strong> <span class="badge ${op.status.toLowerCase()}">${op.status}</span></p>
    `;
    document.getElementById('details-section').classList.remove('hidden');
    document.getElementById('details-section').scrollIntoView({ behavior: 'smooth' });
}

function hideDetails() {
    document.getElementById('details-section').classList.add('hidden');
}

// ===== Form Submit (Create or Update) =====
document.getElementById('opportunity-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('opportunity-id').value;
    const data = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        research_area: document.getElementById('research_area').value.trim(),
        required_skills: document.getElementById('required_skills').value.trim(),
        available_positions: parseInt(document.getElementById('available_positions').value) || 1,
        application_deadline: document.getElementById('application_deadline').value || null,
        status: document.getElementById('status').value
    };

    if (!data.title || !data.description || !data.research_area) {
        return showAlert('Please fill in all required fields', 'error');
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();

        if (!res.ok) {
            const msg = result.errors ? result.errors.join(', ') : result.message;
            return showAlert(msg || 'Request failed', 'error');
        }

        showAlert(result.message, 'success');
        resetForm();
        loadOpportunities();
    } catch (err) {
        showAlert('Network error. Is backend running?', 'error');
    }
});

// ===== Edit (Populate Form) =====
async function editOpportunity(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const result = await res.json();
    if (!result.success) return showAlert(result.message, 'error');

    const op = result.data;
    document.getElementById('opportunity-id').value = op.id;
    document.getElementById('title').value = op.title;
    document.getElementById('description').value = op.description;
    document.getElementById('research_area').value = op.research_area;
    document.getElementById('required_skills').value = op.required_skills || '';
    document.getElementById('available_positions').value = op.available_positions;
    document.getElementById('application_deadline').value = op.application_deadline ? op.application_deadline.split('T')[0] : '';
    document.getElementById('status').value = op.status;
    document.getElementById('form-title').textContent = '✏️ Update Opportunity';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Toggle Status (Open <-> Closed) =====
async function toggleStatus(id, currentStatus) {
    const res = await fetch(`${API_URL}/${id}`);
    const result = await res.json();
    const op = result.data;

    op.status = currentStatus === 'Open' ? 'Closed' : 'Open';

    const update = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(op)
    });

    if (update.ok) {
        showAlert(`Status changed to ${op.status}`, 'success');
        loadOpportunities();
    } else {
        showAlert('Failed to update status', 'error');
    }
}

// ===== Delete =====
async function deleteOpportunity(id) {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (res.ok) {
        showAlert(result.message, 'success');
        loadOpportunities();
        hideDetails();
    } else {
        showAlert(result.message, 'error');
    }
}

// ===== Reset Form =====
function resetForm() {
    document.getElementById('opportunity-form').reset();
    document.getElementById('opportunity-id').value = '';
    document.getElementById('form-title').textContent = '➕ Create New Opportunity';
}

// ===== XSS Protection =====
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Init =====
loadOpportunities();