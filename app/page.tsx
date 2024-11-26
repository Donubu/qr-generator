import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Generador de Códigos QR</h1>
          <p className="mt-2 text-muted-foreground">
            Inicia sesión para comenzar a generar códigos QR
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}