'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Ticket, Users, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  passType: z.enum(['general-no-food', 'general-with-food', 'couples-with-food'], {
    required_error: 'You need to select a pass type.',
  }),
});

export type PassDetails = z.infer<typeof formSchema>;

interface PassSelectionFormProps {
  onSubmit: (data: PassDetails) => void;
}

export default function PassSelectionForm({ onSubmit }: PassSelectionFormProps) {
  const form = useForm<PassDetails>({
    resolver: zodResolver(formSchema),
  });

  const selectedPassType = form.watch('passType');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="font-headline text-xl">1. Select Your Pass</CardTitle>
          <CardDescription>Choose the experience you want.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="passType"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="general-no-food" id="general-no-food" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        htmlFor="general-no-food"
                        className={cn(
                          'relative flex justify-between items-center p-4 rounded-lg bg-muted/30 cursor-pointer border-2 border-transparent transition-all duration-200 hover:border-primary/50',
                          selectedPassType === 'general-no-food' && 'scale-[1.02] ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_0_20px_hsl(var(--primary)/0.4)] border-primary'
                        )}
                      >
                        {selectedPassType === 'general-no-food' && (
                          <div className="absolute -top-3 -right-3 bg-primary rounded-full p-1.5 shadow-lg">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-lg flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-accent" /> General Pass
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Entry to the event. Food not included.
                          </p>
                        </div>
                        <div className="text-xl font-bold text-primary">₹550</div>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="general-with-food" id="general-with-food" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        htmlFor="general-with-food"
                         className={cn(
                          'relative flex justify-between items-center p-4 rounded-lg bg-muted/30 cursor-pointer border-2 border-transparent transition-all duration-200 hover:border-primary/50',
                          selectedPassType === 'general-with-food' && 'scale-[1.02] ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_0_20px_hsl(var(--primary)/0.4)] border-primary'
                        )}
                      >
                         {selectedPassType === 'general-with-food' && (
                          <div className="absolute -top-3 -right-3 bg-primary rounded-full p-1.5 shadow-lg">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-lg flex items-center gap-2">
                            <Utensils className="w-5 h-5 text-accent" /> General Pass + Food
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Event entry with a food coupon included.
                          </p>
                        </div>
                        <div className="text-xl font-bold text-primary">₹700</div>
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="couples-with-food" id="couples-with-food" className="sr-only" />
                      </FormControl>
                      <FormLabel
                        htmlFor="couples-with-food"
                        className={cn(
                          'relative flex justify-between items-center p-4 rounded-lg bg-muted/30 cursor-pointer border-2 border-transparent transition-all duration-200 hover:border-primary/50',
                          selectedPassType === 'couples-with-food' && 'scale-[1.02] ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_0_20px_hsl(var(--primary)/0.4)] border-primary'
                        )}
                      >
                        {selectedPassType === 'couples-with-food' && (
                           <div className="absolute -top-3 -right-3 bg-primary rounded-full p-1.5 shadow-lg">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-lg flex items-center gap-2">
                            <Users className="w-5 h-5 text-accent" /> Couples Entry + Food
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Entry for two with food coupons included.
                          </p>
                        </div>
                        <div className="text-xl font-bold text-primary">₹1200</div>
                      </FormLabel>
                    </FormItem>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full font-bold" disabled={!selectedPassType}>
            Next: Your Details
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
