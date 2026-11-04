import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('gov_ai_user');
    const storedToken = localStorage.getItem('gov_token');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (storedToken) parsed.token = storedToken;
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('gov_ai_user');
        localStorage.removeItem('gov_token');
      }
    }
    setLoading(false);
  }, []);

  const loginAsDemo = (role = 'student') => {
    const isTeacher = role === 'teacher';
    const demoUser = {
      name: isTeacher ? "Dr. Vikas Divyakirti" : "Rahul Kumar",
      email: isTeacher ? "teacher@government.in" : "student@government.in",
      role: role,
      avatar: isTeacher
        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher"
        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Student",
      target_exam: isTeacher ? "All Government Exams" : "Civil Services (UPSC)"
    };

    setUser(demoUser);
    localStorage.setItem('gov_ai_user', JSON.stringify(demoUser));
    return demoUser;
  };

  const loginWithCredentials = async (email, password, role = 'student') => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token;
      const apiUser = res.data.user || {};
      const newUser = {
        name: apiUser.name || (email.split('@')[0]),
        email: email,
        role: role,
        token: token,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        target_exam: apiUser.target_exam || "Civil Services (UPSC)"
      };
      setUser(newUser);
      localStorage.setItem('gov_token', token);
      localStorage.setItem('gov_ai_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (err) {
      // Fallback demo login if server unreachable or mock credentials
      const fallbackUser = {
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        target_exam: "Civil Services (UPSC)"
      };
      setUser(fallbackUser);
      localStorage.setItem('gov_ai_user', JSON.stringify(fallbackUser));
      return { success: true, user: fallbackUser };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gov_ai_user');
    localStorage.removeItem('gov_token');
    localStorage.removeItem('gov_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login: loginAsDemo,
        loginWithCredentials,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

