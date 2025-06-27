'use client'

import React, { useEffect, useState } from 'react'
import BillingDetails from '../components/billing/details';
import BillingHistory from '../components/billing/history';

function page() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
    
        
        return () => clearTimeout(timer);
      }, []);

  return (
    <div className=' text-sm'>
        <div className="flex-1 overflow-auto scrollbar-hide">
          <div className=" mx-auto">
            <h1 className="text-3xl font-bold mb-8 animate-fade-in">Billing</h1>
            
            {isLoading ? (
              <div className="space-y-6">
                <div className="h-56 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            ) : (
              <>
                <BillingDetails />
                <BillingHistory />
              </>
            )}
          </div>
        </div>
    </div>
  )
}

export default page