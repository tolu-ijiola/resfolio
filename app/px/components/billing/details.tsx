import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Pencil, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import PaymentMethod from './method';
import Link from 'next/link';

const BillingDetails = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <Card className="shadow-sm border-neutral-200">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">Free plan</h3>
                            <Badge variant="outline" className="bg-teal-800 text-teal-50 ">
                                Monthly
                            </Badge>
                        </div>
                        <span className="flex items-end">
                            <span className="text-3xl font-bold">$0</span>
                            <span className="text-muted-foreground ml-1">per month</span>
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">1 out of 2 website and portfolio</span>
                        </div>
                        <Progress value={50} className="w-full" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            variant="ghost"
                            asChild
                            className="text-teal-800 hover:text-teal-900 hover:bg-teal-50 transition-all"
                        >
                            <Link href="/px/billing/plans">
                                <span>Upgrade plan</span>
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Payment method</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        You can edit your card details here.
                    </p>

                    {/* <div className="flex items-center justify-between bg-neutral-100 rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-white p-2 rounded-md shadow-sm">
                <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-visa">
                  <title id="pi-visa">Visa</title>
                  <path fill="#1434CB" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                  <path d="M12 12v-2h-1c-1.3 0-2 .7-2 1.5 0 1.6 1.8 1.5 1.8 2.3 0 .3-.5.5-.9.5-.5 0-1.1-.2-1.5-.6l-.6 1.1c.6.5 1.3.7 2 .7 1.3 0 2.2-.8 2.2-1.8 0-1.7-1.8-1.6-1.8-2.3 0-.2.3-.4.7-.4.5 0 1 .2 1.4.5l.7-1.5zm5.5 3.5h-1.5l-1.2-3-.8 3h-1.5l-1-5h1.7l.5 3 .8-3h1.4l.8 3 .5-3h1.6l-1.3 5zm5 0h-4v-5h1.5v3.7h2.5v1.3zm1.7 0l-2-5h1.7l1.2 3.5 1.2-3.5h1.7l-2 5h-1.8z" fill="#fff"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expiry 06/2024</p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </div> */}
                    <Dialog>
                        <DialogTrigger asChild>
                        <div className="flex cursor-pointer items-center justify-between bg-neutral-100 rounded-lg p-4 border border-neutral-200">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 bg-white p-2 rounded-md shadow-sm">
                                <Plus className="h-8 w-8 p-2 rounded-full bg-neutral-200 text-black" />
                            </div>
                            <div>
                                <p className="font-medium">Add new card</p>
                                <p className="text-sm text-muted-foreground"></p>
                            </div>
                        </div>

                        <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                            </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-white">
                            <PaymentMethod />
                        </DialogContent>
                    </Dialog>

                    
                </CardContent>
            </Card>
        </div>
    );
};

export default BillingDetails;
