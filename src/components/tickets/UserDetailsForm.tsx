'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Ticket, Users, Utensils } from 'lucide-react';
import { PassDetails } from './PassSelectionForm';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  gender: z.enum(['male', 'female'], { required_error: 'Please select a gender.' }),
  foodType: z.string().optional(),
});

export type UserDetails = z.infer<typeof formSchema>;

interface UserDetailsFormProps {
  onSubmit: (data: UserDetails) => void;
  onGoBack: () => void;
  passDetails: PassDetails;
}

const passInfo = {
  'general-no-food': { name: 'General Pass', icon: Ticket, price: '₹550' },
  'general-with-food': { name: 'General Pass + Food', icon: Utensils, price: '₹700' },
  'couples-with-food': { name: 'Couples Entry + Food', icon: Users, price: '₹1200' },
};

export default function UserDetailsForm({ onSubmit, onGoBack, passDetails }: UserDetailsFormProps) {
  const form = useForm<UserDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const selectedPass = passInfo[passDetails.passType];
  const SelectedIcon = selectedPass.icon;

  const showFoodPreference = passDetails.passType === 'general-with-food' || passDetails.passType === 'couples-with-food';
  
  const handleFormSubmit = (data: UserDetails) => {
    onSubmit({
      ...data,
      foodType: showFoodPreference ? data.foodType : 'none',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onGoBack} className="flex-shrink-0" type="button">
              <ArrowLeft />
            </Button>
            <div>
              <CardTitle className="font-headline text-xl">2. Your Details</CardTitle>
              <CardDescription>Enter your info to continue.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SelectedIcon className="w-6 h-6 text-accent" />
                <span className="font-bold">{selectedPass.name}</span>
              </div>
              <Badge variant="secondary" className="text-lg">{selectedPass.price}</Badge>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormDescription className="text-yellow-500 font-bold">
                  Enter correct email for OTP. This will be your ticket.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 555-5555" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           {showFoodPreference && (
            <FormField
              control={form.control}
              name="foodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Preference</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your food preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full font-bold">Next: Payment</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
