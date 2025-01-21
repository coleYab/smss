CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- User Table
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('student', 'staff', 'donor', 'librarian')) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Student Table
CREATE TABLE "Student" (
    id UUID PRIMARY KEY REFERENCES "User" (id),
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    parent_contact_info TEXT NOT NULL,
    eligibility_status VARCHAR(50) CHECK (eligibility_status IN ('Pending', 'Eligible', 'Ineligible')) NOT NULL
);

-- Staff Table
CREATE TABLE "Staff" (
    id UUID PRIMARY KEY REFERENCES "User" (id)  ,
    department VARCHAR(255) NOT NULL
);

-- Donor Table
CREATE TABLE "Donor" (
    id UUID PRIMARY KEY REFERENCES "User" (id)  ,
    name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    total_donated DECIMAL(18, 2) DEFAULT 0.00
);

-- Donation Table
CREATE TABLE "Donation" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES "Donor" (id)  ,
    -- student_id UUID REFERENCES "Student" (id)  ,
    amount DECIMAL(18, 2) NOT NULL CHECK (amount > 0),
    donation_date DATE NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pending', 'Completed', 'Canceled')) NOT NULL
);

-- Librarian Table
CREATE TABLE "Librarian" (
    id UUID PRIMARY KEY REFERENCES "User" (id)  ,
    library_branch VARCHAR(255) NOT NULL
);

-- Book Table
CREATE TABLE "Book" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    availability_status BOOLEAN NOT NULL DEFAULT TRUE
);

-- BookRent Table (Many-to-Many between Student and Book, with Librarian)
CREATE TABLE "BookRent" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES "Book" (id) NOT NULL,
    student_id UUID REFERENCES "Student" (id) NOT NULL,
    librarian_id UUID REFERENCES "Librarian" (id) NOT NULL,
    rent_date DATE NOT NULL,
    return_within INTEGER NOT NULL,
    status VARCHAR(50) CHECK (status IN ('rented', 'returned')) NOT NULL
);

-- Transcript Table
CREATE TABLE "Transcript" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES "Student" (id) NOT NULL,
    file_url TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('submitted', 'validated', 'rejected')) NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    validated_at TIMESTAMP
);

-- Progress Report Table
CREATE TABLE "ProgressReport" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES "Student" (id) ,
    report_date DATE NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pending', 'Validated', 'Rejected')) NOT NULL,
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validated_at TIMESTAMP,
    staff_id UUID REFERENCES "Staff" (id)
);

-- StudentProgress Table (Tracks academic and extracurricular progress)
CREATE TABLE "StudentProgress" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES "Student" (id)  ,
    progress_date DATE NOT NULL,
    academic_score DECIMAL(5,2) NOT NULL,
    activity_score DECIMAL(5,2) NOT NULL,
    comments TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pending', 'Reviewed', 'Finalized')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    staff_id UUID REFERENCES "Staff" (id)
);

-- AuditLog Table (Tracks all actions in the system)
CREATE TABLE "AuditLog" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "User" (id)  ,
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);