'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';

export default function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-full max-w-md mx-auto p-6 bg-[#1c1d22] border border-border rounded-2xl shadow-xl">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#2b2d36]">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <LoginForm />
      </TabsContent>

      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
