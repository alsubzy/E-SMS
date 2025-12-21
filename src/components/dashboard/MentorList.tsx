'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { placeholderMentors } from '@/lib/data';

export default function MentorList() {
  return (
    <Card className="rounded-3xl shadow-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold">Your mentor</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-primary/10 text-primary rounded-full">
          <Plus className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {placeholderMentors.map((mentor) => (
          <div key={mentor.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mentor.avatarUrl} alt={mentor.name} data-ai-hint="person face" />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{mentor.name}</p>
                <p className="text-sm text-muted-foreground">Mentor</p>
              </div>
            </div>
            <Button variant="ghost" className="rounded-full text-primary hover:bg-primary/10 hover:text-primary">
              <UserPlus className="mr-2 h-4 w-4" />
              Follow
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-4">
        <Button variant="secondary" className="w-full rounded-full bg-primary/10 text-primary font-bold hover:bg-primary/20">
          See All
        </Button>
      </CardFooter>
    </Card>
  );
}
