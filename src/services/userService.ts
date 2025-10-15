interface User {
    id: number;
    name: string;
    email: string;
}

export const getAllUsers = (): User[] => {
    return [
        {id: 1, name:'Jane Doe', email: 'jane@example.com'},
        {id: 2, name:'Bas Smith', email: 'bas@example.com'}
    ];
}

