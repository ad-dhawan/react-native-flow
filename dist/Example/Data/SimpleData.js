"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleData = void 0;
exports.simpleData = {
    id: '1',
    data: { title: 'Root' },
    children: [
        {
            id: '2',
            data: { title: 'Child 1' },
            children: [
                { id: '4', data: { title: 'Grandchild 1' } },
                { id: '5', data: { title: 'Grandchild 2' } },
            ],
        },
        {
            id: '3',
            data: { title: 'Child 2' },
            children: [
                { id: '6', data: { title: 'Grandchild 3' } },
            ],
        },
    ],
};
