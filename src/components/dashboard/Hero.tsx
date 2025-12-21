'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative rounded-3xl bg-primary p-8 text-primary-foreground overflow-hidden">
        <div className="absolute -top-4 -left-4 h-20 w-20 text-white/20">
            <Star fill="currentColor" className="h-full w-full" />
        </div>
        <div className="absolute -bottom-8 -right-8 h-32 w-32 text-white/20">
            <Star fill="currentColor" className="h-full w-full" />
        </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white/20">
            <Star fill="currentColor" className="h-full w-full" />
        </div>

      <div className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-wider">Online Course</p>
        <h1 className="text-3xl md:text-4xl font-bold max-w-md mt-2">
          Sharpen Your Skills with Professional Online Courses
        </h1>
        <Button className="mt-6 bg-white text-primary hover:bg-white/90 rounded-full font-bold">
          Join Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
