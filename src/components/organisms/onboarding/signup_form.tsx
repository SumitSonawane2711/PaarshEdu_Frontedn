import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, signupSchema } from '@/core/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Container from '@/components/templates/Container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Logo from '@/components/atoms/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/core/redux/store'
import { registerUser } from '@/core/redux/slices/user_slice'

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: ""
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // console.log(values)
  
    try {
      const response = await dispatch(registerUser(values)).unwrap(); // unwrap to get the payload or throw error
  
      console.log('Response after registration', response);
  
      if (response) {
        toast({ title: "Sign up successful!", description: "You have been registered.",className:'bg-green-600' });
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      const errorMessage = "Sign up failed. Please try again.";
      toast({ title: "Sign up failed", description: errorMessage,className:'bg-red-600' });
    }
  }

  return (
    <Container>
      <Card className="sm:w-1/3 my-20  ">
        <CardHeader>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[200px]">
              <Logo className="" width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Create an account </h2>

          <p className="mt-2 text-center text-base">
            alredy have an account?&nbsp;
            <Link
              to="/signin"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl font-semibold'>Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='paarsh' {...field} />
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
                    <FormLabel className='text-xl font-semibold'>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl font-semibold'>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl font-semibold'>Phone</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className=' text-xl font-semibold text-white'>Submit</Button>
            </form>
          </Form>
        </CardContent>

      </Card>
    </Container>
  )
}

export default SignupForm
