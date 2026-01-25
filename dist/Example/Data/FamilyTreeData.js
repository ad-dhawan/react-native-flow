"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.familyTreeData = void 0;
exports.familyTreeData = {
    id: 'grandpa',
    data: {
        name: 'George Smith',
        birthYear: 1940,
        gender: 'male',
        isAlive: false,
    },
    children: [
        {
            id: 'father',
            data: {
                name: 'John Smith',
                birthYear: 1965,
                gender: 'male',
                isAlive: true,
            },
            children: [
                {
                    id: 'child1',
                    data: {
                        name: 'Michael Smith',
                        birthYear: 1995,
                        gender: 'male',
                        isAlive: true,
                    },
                },
                {
                    id: 'child2',
                    data: {
                        name: 'Emma Smith',
                        birthYear: 1998,
                        gender: 'female',
                        isAlive: true,
                    },
                },
            ],
        },
        {
            id: 'uncle',
            data: {
                name: 'Robert Smith',
                birthYear: 1968,
                gender: 'male',
                isAlive: true,
            },
            children: [
                {
                    id: 'cousin',
                    data: {
                        name: 'Sarah Smith',
                        birthYear: 2000,
                        gender: 'female',
                        isAlive: true,
                    },
                },
            ],
        },
    ],
};
