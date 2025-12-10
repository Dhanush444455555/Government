"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type UserRole = 'student' | 'teacher' | null;

interface User {
    name: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: 'student' | 'teacher') => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("gov_ai_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (role: 'student' | 'teacher') => {
        const newUser: User = {
            name: role === 'teacher' ? "Dr. Vikas Divyakirti" : "Rahul Kumar",
            role: role,
            avatar: role === 'teacher'
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher"
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"
        };

        setUser(newUser);
        localStorage.setItem("gov_ai_user", JSON.stringify(newUser));
        router.push("/courses"); // Redirect to course selection page
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("gov_ai_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
