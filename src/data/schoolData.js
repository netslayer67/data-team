const ROLE_GROUP_ORDER = ['Director', 'Head Unit', 'Staff', 'Teacher', 'Others'];
const STATUS_ORDER = ['Active', 'On Leave', 'Probation'];
const EMPLOYMENT_ORDER = ['Permanent', 'Contract', 'Honorary', 'Intern'];

const employees = [
    {
        _id: 'emp-001',
        fullName: 'Dr. Armanda Suryani',
        roleTitle: 'Director',
        roleGroup: 'Director',
        employeeId: 'DIR-001',
        unit: 'Executive Office',
        joinDate: '2017-08-10',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'armanda.suryani@insightacademy.id',
        phone: '0812-3456-7890',
        avatarColor: '#0ea5e9',
        highlights: ['Strategic Planning', 'Accreditation Lead']
    },
    {
        _id: 'emp-002',
        fullName: 'Bima Prasetyo',
        roleTitle: 'Head of Academic Affairs',
        roleGroup: 'Head Unit',
        employeeId: 'HU-101',
        unit: 'Academic Affairs',
        joinDate: '2018-01-15',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'bima.prasetyo@insightacademy.id',
        phone: '0813-4455-6677',
        avatarColor: '#0284c7',
        highlights: ['Curriculum Strategy', 'Quality Assurance']
    },
    {
        _id: 'emp-003',
        fullName: 'Nadia Rahman',
        roleTitle: 'Head of Student Services',
        roleGroup: 'Head Unit',
        employeeId: 'HU-102',
        unit: 'Student Services',
        joinDate: '2019-04-21',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'nadia.rahman@insightacademy.id',
        phone: '0812-8899-2211',
        avatarColor: '#06b6d4',
        highlights: ['Wellbeing Programs', 'Parent Relations']
    },
    {
        _id: 'emp-004',
        fullName: 'Irfan Satriya',
        roleTitle: 'Head of Operations',
        roleGroup: 'Head Unit',
        employeeId: 'HU-103',
        unit: 'Operations',
        joinDate: '2018-10-05',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'irfan.satriya@insightacademy.id',
        phone: '0812-5566-3344',
        avatarColor: '#0ea5e9',
        highlights: ['Operational Excellence', 'Risk Control']
    },
    {
        _id: 'emp-005',
        fullName: 'Kezia Putri',
        roleTitle: 'Head of Finance',
        roleGroup: 'Head Unit',
        employeeId: 'HU-104',
        unit: 'Finance',
        joinDate: '2020-02-12',
        employmentType: 'Permanent',
        status: 'On Leave',
        email: 'kezia.putri@insightacademy.id',
        phone: '0812-1144-7788',
        avatarColor: '#38bdf8',
        highlights: ['Budget Governance']
    },
    {
        _id: 'emp-006',
        fullName: 'Maya Kurnia',
        roleTitle: 'HR Specialist',
        roleGroup: 'Staff',
        employeeId: 'ST-201',
        unit: 'HR & People',
        joinDate: '2021-06-16',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'maya.kurnia@insightacademy.id',
        phone: '0813-6600-2211',
        avatarColor: '#38bdf8',
        highlights: ['Talent Development', 'Engagement']
    },
    {
        _id: 'emp-007',
        fullName: 'Rizky Purnama',
        roleTitle: 'Finance Analyst',
        roleGroup: 'Staff',
        employeeId: 'ST-202',
        unit: 'Finance',
        joinDate: '2022-01-20',
        employmentType: 'Contract',
        status: 'Active',
        email: 'rizky.purnama@insightacademy.id',
        phone: '0812-9900-7766',
        avatarColor: '#0ea5e9',
        highlights: ['Cashflow Monitor']
    },
    {
        _id: 'emp-008',
        fullName: 'Dewi Laksmi',
        roleTitle: 'Academic Administrator',
        roleGroup: 'Staff',
        employeeId: 'ST-203',
        unit: 'Academic Affairs',
        joinDate: '2020-09-12',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'dewi.laksmi@insightacademy.id',
        phone: '0813-1122-3311',
        avatarColor: '#22d3ee',
        highlights: ['Scheduling', 'Regulation']
    },
    {
        _id: 'emp-009',
        fullName: 'Teguh Saputra',
        roleTitle: 'IT Support Lead',
        roleGroup: 'Staff',
        employeeId: 'ST-204',
        unit: 'IT & Data',
        joinDate: '2019-11-28',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'teguh.saputra@insightacademy.id',
        phone: '0812-6677-5544',
        avatarColor: '#0ea5e9',
        highlights: ['Helpdesk', 'Infrastructure']
    },
    {
        _id: 'emp-010',
        fullName: 'Lia Wulandari',
        roleTitle: 'Student Affairs Officer',
        roleGroup: 'Staff',
        employeeId: 'ST-205',
        unit: 'Student Services',
        joinDate: '2021-03-18',
        employmentType: 'Contract',
        status: 'Active',
        email: 'lia.wulandari@insightacademy.id',
        phone: '0812-7788-3300',
        avatarColor: '#38bdf8',
        highlights: ['Discipline', 'Counseling Liaison']
    },
    {
        _id: 'emp-011',
        fullName: 'Seno Widodo',
        roleTitle: 'Facilities Coordinator',
        roleGroup: 'Staff',
        employeeId: 'ST-206',
        unit: 'Facilities',
        joinDate: '2018-07-07',
        employmentType: 'Contract',
        status: 'Active',
        email: 'seno.widodo@insightacademy.id',
        phone: '0812-3344-6655',
        avatarColor: '#22d3ee',
        highlights: ['Asset Readiness']
    },
    {
        _id: 'emp-012',
        fullName: 'Sari Anindita',
        roleTitle: 'Data Administration',
        roleGroup: 'Staff',
        employeeId: 'ST-207',
        unit: 'IT & Data',
        joinDate: '2024-02-05',
        employmentType: 'Intern',
        status: 'Probation',
        email: 'sari.anindita@insightacademy.id',
        phone: '0812-9911-8822',
        avatarColor: '#38bdf8',
        highlights: ['Data Cleansing']
    },
    {
        _id: 'emp-013',
        fullName: 'Yusuf Hidayat',
        roleTitle: 'Senior Mathematics Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-301',
        unit: 'Mathematics',
        joinDate: '2016-01-10',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'yusuf.hidayat@insightacademy.id',
        phone: '0812-5544-1111',
        avatarColor: '#0ea5e9',
        highlights: ['Olympiad Mentor']
    },
    {
        _id: 'emp-014',
        fullName: 'Nora Anjani',
        roleTitle: 'English Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-302',
        unit: 'Language',
        joinDate: '2019-08-19',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'nora.anjani@insightacademy.id',
        phone: '0812-4488-5599',
        avatarColor: '#38bdf8',
        highlights: ['Academic Writing']
    },
    {
        _id: 'emp-015',
        fullName: 'Fajar Mahesa',
        roleTitle: 'Science Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-303',
        unit: 'Science',
        joinDate: '2020-02-17',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'fajar.mahesa@insightacademy.id',
        phone: '0813-1100-2200',
        avatarColor: '#22d3ee',
        highlights: ['Lab Program']
    },
    {
        _id: 'emp-016',
        fullName: 'Dian Putri',
        roleTitle: 'History Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-304',
        unit: 'Social Studies',
        joinDate: '2018-05-03',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'dian.putri@insightacademy.id',
        phone: '0812-6677-9900',
        avatarColor: '#0ea5e9',
        highlights: ['Project Based Learning']
    },
    {
        _id: 'emp-017',
        fullName: 'Rani Siregar',
        roleTitle: 'Arts Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-305',
        unit: 'Arts',
        joinDate: '2021-07-11',
        employmentType: 'Honorary',
        status: 'Active',
        email: 'rani.siregar@insightacademy.id',
        phone: '0812-7788-4411',
        avatarColor: '#38bdf8',
        highlights: ['Exhibition Coach']
    },
    {
        _id: 'emp-018',
        fullName: 'Ilham Prakoso',
        roleTitle: 'Physics Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-306',
        unit: 'Science',
        joinDate: '2017-10-29',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'ilham.prakoso@insightacademy.id',
        phone: '0813-3344-1122',
        avatarColor: '#0ea5e9',
        highlights: ['STEM Projects']
    },
    {
        _id: 'emp-019',
        fullName: 'Dita Handayani',
        roleTitle: 'Chemistry Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-307',
        unit: 'Science',
        joinDate: '2019-12-14',
        employmentType: 'Permanent',
        status: 'On Leave',
        email: 'dita.handayani@insightacademy.id',
        phone: '0812-9090-7788',
        avatarColor: '#22d3ee',
        highlights: ['Curriculum Review']
    },
    {
        _id: 'emp-020',
        fullName: 'Bayu Wibowo',
        roleTitle: 'PE Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-308',
        unit: 'Sports',
        joinDate: '2022-09-02',
        employmentType: 'Contract',
        status: 'Active',
        email: 'bayu.wibowo@insightacademy.id',
        phone: '0812-6644-5500',
        avatarColor: '#0ea5e9',
        highlights: ['Fitness Program']
    },
    {
        _id: 'emp-021',
        fullName: 'Salsa Pramesti',
        roleTitle: 'Biology Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-309',
        unit: 'Science',
        joinDate: '2018-03-26',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'salsa.pramesti@insightacademy.id',
        phone: '0813-4477-2299',
        avatarColor: '#38bdf8',
        highlights: ['Ecology Club']
    },
    {
        _id: 'emp-022',
        fullName: 'Raka Nugroho',
        roleTitle: 'ICT Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-310',
        unit: 'Technology',
        joinDate: '2020-06-20',
        employmentType: 'Contract',
        status: 'Active',
        email: 'raka.nugroho@insightacademy.id',
        phone: '0812-7711-2233',
        avatarColor: '#22d3ee',
        highlights: ['Digital Literacy']
    },
    {
        _id: 'emp-023',
        fullName: 'Tika Maharani',
        roleTitle: 'Civics Teacher',
        roleGroup: 'Teacher',
        employeeId: 'TC-311',
        unit: 'Social Studies',
        joinDate: '2019-01-07',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'tika.maharani@insightacademy.id',
        phone: '0812-8866-4411',
        avatarColor: '#38bdf8',
        highlights: ['Student Council Advisor']
    },
    {
        _id: 'emp-024',
        fullName: 'Mira Santoso',
        roleTitle: 'Guidance Counselor',
        roleGroup: 'Others',
        employeeId: 'OT-401',
        unit: 'Counseling',
        joinDate: '2019-05-22',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'mira.santoso@insightacademy.id',
        phone: '0812-6688-2200',
        avatarColor: '#38bdf8',
        highlights: ['Student Wellbeing']
    },
    {
        _id: 'emp-025',
        fullName: 'Joko Surya',
        roleTitle: 'Security Supervisor',
        roleGroup: 'Others',
        employeeId: 'OT-402',
        unit: 'Security',
        joinDate: '2016-12-01',
        employmentType: 'Contract',
        status: 'Active',
        email: 'joko.surya@insightacademy.id',
        phone: '0812-5533-4400',
        avatarColor: '#0ea5e9',
        highlights: ['Safety Protocols']
    },
    {
        _id: 'emp-026',
        fullName: 'Melati Kusuma',
        roleTitle: 'School Nurse',
        roleGroup: 'Others',
        employeeId: 'OT-403',
        unit: 'Health & Safety',
        joinDate: '2018-08-09',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'melati.kusuma@insightacademy.id',
        phone: '0812-7700-3322',
        avatarColor: '#22d3ee',
        highlights: ['Clinic Services']
    },
    {
        _id: 'emp-027',
        fullName: 'Rifki Anwar',
        roleTitle: 'School Driver',
        roleGroup: 'Others',
        employeeId: 'OT-404',
        unit: 'Transport',
        joinDate: '2020-03-14',
        employmentType: 'Contract',
        status: 'Active',
        email: 'rifki.anwar@insightacademy.id',
        phone: '0812-9988-4400',
        avatarColor: '#0ea5e9',
        highlights: ['Route Safety']
    },
    {
        _id: 'emp-028',
        fullName: 'Lestari Kusuma',
        roleTitle: 'Librarian',
        roleGroup: 'Others',
        employeeId: 'OT-405',
        unit: 'Library',
        joinDate: '2017-04-18',
        employmentType: 'Permanent',
        status: 'Active',
        email: 'lestari.kusuma@insightacademy.id',
        phone: '0812-8877-5566',
        avatarColor: '#38bdf8',
        highlights: ['Literacy Program']
    }
];

const uniqueSorted = (items, order = []) => {
    const set = new Set(items);
    const ordered = order.filter((item) => set.has(item));
    const rest = Array.from(set).filter((item) => !ordered.includes(item));
    return [...ordered, ...rest.sort((a, b) => a.localeCompare(b, 'en-US'))];
};

const groupCounts = (items, key, order = []) => {
    const counts = items.reduce((acc, current) => {
        const value = current[key];
        if (!value) return acc;
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    const keys = order.length ? order : Object.keys(counts).sort((a, b) => a.localeCompare(b, 'en-US'));
    return keys.map((item) => ({ _id: item, count: counts[item] || 0 }));
};

const matchesSearch = (employee, query) => {
    if (!query) return true;
    const normalized = query.toLowerCase();
    return [
        employee.fullName,
        employee.roleTitle,
        employee.employeeId,
        employee.unit
    ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(normalized));
};

const applyFilters = (filters = {}) => {
    const { search, unit, status, employmentType } = filters;
    return employees.filter((employee) => {
        if (search && !matchesSearch(employee, search)) return false;
        if (unit && employee.unit !== unit) return false;
        if (status && employee.status !== status) return false;
        if (employmentType && employee.employmentType !== employmentType) return false;
        return true;
    });
};

export const getSchoolOverview = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
    const teacherCount = employees.filter((employee) => employee.roleGroup === 'Teacher').length;
    const leadershipCount = employees.filter((employee) => ['Director', 'Head Unit'].includes(employee.roleGroup)).length;
    const unitsCount = new Set(employees.map((employee) => employee.unit)).size;

    const byRole = groupCounts(employees, 'roleGroup', ROLE_GROUP_ORDER);
    const byEmploymentType = groupCounts(employees, 'employmentType', EMPLOYMENT_ORDER);
    const byUnit = groupCounts(employees, 'unit')
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    return {
        metrics: {
            totalEmployees,
            activeEmployees,
            teacherCount,
            leadershipCount,
            unitsCount
        },
        byRole,
        byEmploymentType,
        byUnit
    };
};

export const getEmployeesHierarchy = (filters = {}) => {
    const filteredEmployees = applyFilters(filters);
    return ROLE_GROUP_ORDER.map((roleGroup) => {
        const members = filteredEmployees
            .filter((employee) => employee.roleGroup === roleGroup)
            .sort((a, b) => a.fullName.localeCompare(b.fullName, 'en-US'));

        return {
            roleGroup,
            total: members.length,
            members
        };
    });
};

export const getEmployees = (filters = {}) => {
    const { page = 1, limit = 50 } = filters;
    const filteredEmployees = applyFilters(filters);
    const start = (page - 1) * limit;
    const data = filteredEmployees.slice(start, start + limit);

    return {
        data,
        pagination: {
            totalRecords: filteredEmployees.length,
            pageSize: limit,
            currentPage: page,
            totalPages: Math.max(1, Math.ceil(filteredEmployees.length / limit))
        }
    };
};

export const getSchoolFilters = () => ({
    roleGroups: ROLE_GROUP_ORDER,
    units: uniqueSorted(employees.map((employee) => employee.unit)),
    statuses: uniqueSorted(employees.map((employee) => employee.status), STATUS_ORDER),
    employmentTypes: uniqueSorted(employees.map((employee) => employee.employmentType), EMPLOYMENT_ORDER)
});

export { employees, ROLE_GROUP_ORDER };

