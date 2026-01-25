"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roadmapData = void 0;
exports.roadmapData = {
    id: 'q1',
    data: {
        title: 'Q1 Planning',
        status: 'completed',
        date: 'Jan 2024',
        team: 'Management',
        priority: 'high',
    },
    children: [
        {
            id: 'design',
            data: {
                title: 'Design Phase',
                status: 'completed',
                date: 'Feb 2024',
                team: 'Design',
                priority: 'high',
            },
            children: [
                {
                    id: 'prototype',
                    data: {
                        title: 'Prototype',
                        status: 'completed',
                        date: 'Mar 2024',
                        team: 'Design',
                        priority: 'medium',
                    },
                },
                {
                    id: 'user-testing',
                    data: {
                        title: 'User Testing',
                        status: 'in-progress',
                        date: 'Apr 2024',
                        team: 'QA',
                        priority: 'high',
                    },
                },
            ],
        },
        {
            id: 'development',
            data: {
                title: 'Development',
                status: 'in-progress',
                date: 'Mar 2024',
                team: 'Engineering',
                priority: 'high',
            },
            children: [
                {
                    id: 'backend',
                    data: {
                        title: 'Backend API',
                        status: 'in-progress',
                        date: 'Apr 2024',
                        team: 'Backend',
                        priority: 'high',
                    },
                },
                {
                    id: 'frontend',
                    data: {
                        title: 'Frontend UI',
                        status: 'pending',
                        date: 'May 2024',
                        team: 'Frontend',
                        priority: 'medium',
                    },
                },
            ],
        },
        {
            id: 'launch',
            data: {
                title: 'Launch Prep',
                status: 'pending',
                date: 'Jun 2024',
                team: 'Marketing',
                priority: 'high',
            },
        },
    ],
};
