import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { QRCodeGenerator } from "@/components/qr-code-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserNav } from "@/components/auth/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListFilter } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="container mx-auto py-8 px-4 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/qr-list">
            <Button variant="outline">
              <ListFilter className="h-4 w-4 mr-2" />
              Ver Mis QRs
            </Button>
          </Link>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <Card className="max-w-5xl mx-auto flex-grow">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Generador de Códigos QR</CardTitle>
          <CardDescription className="text-center">
            Genera códigos QR para URLs, tarjetas de contacto o mensajes de WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QRCodeGenerator />
        </CardContent>
      </Card>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        Desarrollado por{" "}
        <a
          href="https://puer.to"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-foreground transition-colors"
        >
          Agencia Puerto
        </a>
      </footer>
    </main>
  );
}