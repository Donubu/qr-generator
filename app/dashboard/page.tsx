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
    <main className="w-full py-8 px-4 min-h-screen flex flex-col">
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
          <UserNav userSession={session.user} />
        </div>
      </div>
      <Card className="w-full flex-grow">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Generador de Códigos QR</CardTitle>
          <CardDescription className="text-center">
            Genera códigos QR para URLs, tarjetas de contacto o mensajes de WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QRCodeGenerator userSession={session.user} />
        </CardContent>
      </Card>

    </main>
  );
}
