-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'developer',
    team_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sprints table
CREATE TABLE sprints (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team_id INTEGER REFERENCES teams(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Metrics table
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    team_id INTEGER REFERENCES teams(id),
    sprint_id INTEGER REFERENCES sprints(id),
    metric_type VARCHAR(100) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Code quality metrics
CREATE TABLE code_quality (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    team_id INTEGER REFERENCES teams(id),
    sprint_id INTEGER REFERENCES sprints(id),
    lines_of_code INTEGER,
    bugs_fixed INTEGER,
    code_reviews INTEGER,
    test_coverage DECIMAL(5,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO teams (name, description) VALUES 
('Frontend Team', 'React and UI development team'),
('Backend Team', 'API and database development team'),
('DevOps Team', 'Infrastructure and deployment team');

-- Insert sample users (password_hash is bcrypt hash of 'password123')
INSERT INTO users (email, password_hash, name, role, team_id) VALUES 
('admin@devmetrics.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin', 1),
('john.dev@devmetrics.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John Developer', 'developer', 1),
('jane.coder@devmetrics.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane Coder', 'developer', 2);
