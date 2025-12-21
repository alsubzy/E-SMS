'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { placeholderCourses, placeholderMentors } from '@/lib/data';

export default function ContinueWatching() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Continue Watching</h2>
        <div className="flex gap-2">
           <CarouselPrevious className="relative -left-0 top-0 translate-y-0" />
           <CarouselNext className="relative -right-0 top-0 translate-y-0" />
        </div>
      </div>
      <Carousel opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent>
          {placeholderCourses.map((course) => (
            <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/2">
              <Card className="rounded-3xl shadow-lg border-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={course.imageHint}
                    />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 rounded-full h-8 w-8">
                       <Heart className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className={course.badgeColor}>
                      {course.category}
                    </Badge>
                    <h3 className="font-bold text-lg mt-2 truncate">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={course.mentor.avatarUrl} alt={course.mentor.name} data-ai-hint="person face" />
                        <AvatarFallback>{course.mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{course.mentor.name}</p>
                        <p className="text-xs text-muted-foreground">Mentor</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
