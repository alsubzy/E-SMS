
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceService } from '@/lib/services/finance';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function AccountingPage() {
  const invoices = await FinanceService.getInvoices();

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Invoices</CardTitle>
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Invoice</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.length === 0 ? <p className="text-muted-foreground">No invoices found.</p> : (
              <div className="border rounded-md divide-y">
                {invoices.map(inv => (
                  <div key={inv.id} className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{inv.student.user.name}</div>
                      <div className="text-sm text-muted-foreground">Due: {inv.dueDate.toLocaleDateString()}</div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="font-bold">${inv.amount}</div>
                      <Badge variant={inv.status === 'PAID' ? 'default' : 'destructive'}>{inv.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}