'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Invoice {
  id: string;
  number: string;
  plan: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
}

const invoices: Invoice[] = [
  {
    id: '1',
    number: '#005',
    plan: 'Basic Plan',
    amount: '11 USD',
    status: 'paid',
    date: '1 December 2020'
  },
  {
    id: '2',
    number: '#004',
    plan: 'Basic Plan',
    amount: '11 USD',
    status: 'paid',
    date: '1 November 2020'
  },
  {
    id: '3',
    number: '#003',
    plan: 'Basic Plan',
    amount: '11 USD',
    status: 'paid',
    date: '1 October 2020'
  },
  {
    id: '4',
    number: '#002',
    plan: 'Basic Plan',
    amount: '11 USD',
    status: 'paid',
    date: '1 September 2020'
  },
  {
    id: '5',
    number: '#001',
    plan: 'Basic Plan',
    amount: '11 USD',
    status: 'paid',
    date: '1 August 2020'
  }
];

const BillingHistory = () => {

    const [selectedInvoice, setSelectedInvoice] = useState<null | typeof invoices[0]>(null);
    // Controls dialog open state
    const [open, setOpen] = useState(false);
  
    // Handler when "View invoice" button is clicked
    const handleViewInvoice = (invoice: typeof invoices[0]) => {
      setSelectedInvoice(invoice);
      setOpen(true);
    };

  return (
    <>
    <Card className="mt-8 shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle>Billing history</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">INVOICE</TableHead>
                <TableHead className="w-[150px]">AMOUNT</TableHead>
                <TableHead className="w-[150px]">STATUS</TableHead>
                <TableHead className="w-[200px]">DATE</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-secondary/50 transition-colors">
                  <TableCell className="font-medium">
                    <div>
                      <div>{invoice.number}</div>
                      <div className="text-sm text-muted-foreground">{invoice.plan}</div>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30 hover:bg-success/20">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="text-right">
                  <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/90 hover:bg-primary/10"
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <span>View invoice</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    <Dialog open={open}  onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>   INVOICE {selectedInvoice?.number}</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <strong>Plan:</strong> {selectedInvoice?.plan}
            </div>
            <div>
              <strong>Amount:</strong> {selectedInvoice?.amount}
            </div>
            <div>
              <strong>Status:</strong> {selectedInvoice?.status}
            </div>
            <div>
              <strong>Date:</strong> {selectedInvoice?.date}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BillingHistory;
