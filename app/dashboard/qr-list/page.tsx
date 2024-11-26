import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { QRCodesList } from "@/components/qr-codes-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserNav } from "@/components/auth/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function QRListPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="container mx-auto py-8 px-4 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Mis Códigos QR</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Historial de Códigos QR</CardTitle>
        </CardHeader>
        <CardContent>
          <QRCodesList />
        </CardContent>
      </Card>
    </main>
  );
}