import { NextResponse } from 'next/server';

// In-memory storage for users
let users = [];

export async function POST(request) {
    console.log('Registration request received');
    
    try {
        const { email, password } = await request.json();
        console.log('Request data:', { email, password });

        // Check if user already exists
        if (users.some(user => user.email === email)) {
            console.log('User already exists:', email);
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Add new user
        const newUser = {
            id: Date.now().toString(),
            email,
            password
        };
        users.push(newUser);
        console.log('New user registered:', newUser);

        return NextResponse.json({ 
            message: 'User registered successfully',
            userId: newUser.id
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ 
            error: 'Registration failed',
            details: error.message 
        }, { status: 500 });
    }
}
