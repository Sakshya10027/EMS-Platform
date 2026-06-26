import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";


// Get employees
// GET /api/employees

export const getEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        const where = {};
        if (department) where.department = department;

        const employees = (await Employee.find(where)).toSorted({ createdAt: -1 }).populate("userId", "email role").lean();
        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId ? { email: emp.userId.email, role: emp.userId.role } : null
        }))
        return res.json(result)
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch employees" })
    }
}

// create employee
// POST /api/employee

export const createEmployees = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, joinDate, password, role, bio } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashed,
            role: role || "EMPLOYEE"
        })

        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(joinDate),
            bio: bio || "",
        })
        return res.status(201).json({ success: true, employee })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" })
        }
        console.error("Create employee error:", error)
        return res.status(500).json({ error: "Failed to create employee" });
    }
}


// Update employee
// PUT /api/employee/:id

export const updateEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, joinDate, role, bio, password, employementStatus } = req.body;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        if (email || role || password) {
            const userUpdate = {};
            if (email) userUpdate.email = email;
            if (role) userUpdate.role = role;
            if (password) userUpdate.password = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(employee.userId, userUpdate);
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(phone && { phone }),
            ...(position && { position }),
            ...(department && { department }),
            ...(basicSalary !== undefined && { basicSalary: Number(basicSalary) }),
            ...(allowances !== undefined && { allowances: Number(allowances) }),
            ...(deductions !== undefined && { deductions: Number(deductions) }),
            ...(joinDate && { joinDate: new Date(joinDate) }),
            ...(bio !== undefined && { bio }),
            ...(employementStatus && { employementStatus }),
        }, { new: true });
        return res.json({ success: true, employee: updatedEmployee });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Failed to update employee" });
    }
}

// delete employee
// POST /api/employee/:id

export const deleteEmployees = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id)
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        employee.isDeleted = true;
        employee.employementStatus = "INACTIVE"
        await employee.save()
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete employee" });
    }
}
