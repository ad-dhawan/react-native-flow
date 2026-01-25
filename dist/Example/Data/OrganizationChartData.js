"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationData = void 0;
exports.organizationData = {
    id: 'ceo',
    data: {
        title: 'CEO',
        name: 'John Smith',
        department: 'Executive',
        email: 'john.smith@company.com',
    },
    children: [
        {
            id: 'cto',
            data: {
                title: 'CTO',
                name: 'Sarah Johnson',
                department: 'Technology',
            },
            children: [
                {
                    id: 'dev-lead-1',
                    data: {
                        title: 'Dev Lead',
                        name: 'Mike Chen',
                        department: 'Engineering',
                    },
                    children: [
                        {
                            id: 'dev-1',
                            data: {
                                title: 'Senior Developer',
                                name: 'Alex Kumar',
                                department: 'Engineering',
                            },
                        },
                        {
                            id: 'dev-2',
                            data: {
                                title: 'Developer',
                                name: 'Jessica Lee',
                                department: 'Engineering',
                            },
                        },
                    ],
                },
                {
                    id: 'qa-lead',
                    data: {
                        title: 'QA Lead',
                        name: 'Emma Davis',
                        department: 'Quality',
                    },
                    children: [
                        {
                            id: 'qa-1',
                            data: {
                                title: 'QA Engineer',
                                name: 'Tom Wilson',
                                department: 'Quality',
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 'cfo',
            data: {
                title: 'CFO',
                name: 'Robert Brown',
                department: 'Finance',
            },
            children: [
                {
                    id: 'accountant',
                    data: {
                        title: 'Senior Accountant',
                        name: 'Lisa Wang',
                        department: 'Accounting',
                    },
                },
                {
                    id: 'analyst',
                    data: {
                        title: 'Financial Analyst',
                        name: 'David Martinez',
                        department: 'Finance',
                    },
                },
            ],
        },
        {
            id: 'cmo',
            data: {
                title: 'CMO',
                name: 'Jennifer Taylor',
                department: 'Marketing',
            },
            children: [
                {
                    id: 'marketing-lead',
                    data: {
                        title: 'Marketing Lead',
                        name: 'Chris Anderson',
                        department: 'Marketing',
                    },
                },
            ],
        },
    ],
};
