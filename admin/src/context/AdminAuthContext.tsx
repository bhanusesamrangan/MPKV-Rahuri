import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'SUPER_ADMIN' | 'MAKER' | 'CHECKER';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

interface AdminAuthContextType {
  currentUser: AdminUser;
  switchRole: (role: UserRole) => void;
  hasPermission: (action: 'publish' | 'review' | 'create_draft' | 'edit_settings') => boolean;
}

const mockUsers: Record<UserRole, AdminUser> = {
  SUPER_ADMIN: {
    id: 'user_super_admin',
    name: 'Dr. V. K. Kharche (Super Admin)',
    email: 'superadmin.mpkv@gov.in',
    role: 'SUPER_ADMIN',
    department: 'Central Administration, MPKV Rahuri'
  },
  CHECKER: {
    id: 'user_checker',
    name: 'Prof. S. R. Patil (Checker)',
    email: 'checker.akmu@mpkv.ac.in',
    role: 'CHECKER',
    department: 'AKMU & Information Review Cell'
  },
  MAKER: {
    id: 'user_maker',
    name: 'Er. R. D. Shinde (Maker)',
    email: 'maker.content@mpkv.ac.in',
    role: 'MAKER',
    department: 'Central Seed & Nursery Department, Rahuri'
  }
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser>(() => {
    const savedRole = localStorage.getItem('mpkv_admin_role') as UserRole;
    return mockUsers[savedRole] || mockUsers.SUPER_ADMIN;
  });

  const switchRole = (role: UserRole) => {
    const newUser = mockUsers[role];
    setCurrentUser(newUser);
    localStorage.setItem('mpkv_admin_role', role);
  };

  const hasPermission = (action: 'publish' | 'review' | 'create_draft' | 'edit_settings'): boolean => {
    if (currentUser.role === 'SUPER_ADMIN') return true;
    if (currentUser.role === 'CHECKER') {
      return action === 'review' || action === 'publish';
    }
    if (currentUser.role === 'MAKER') {
      return action === 'create_draft';
    }
    return false;
  };

  return (
    <AdminAuthContext.Provider value={{ currentUser, switchRole, hasPermission }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
