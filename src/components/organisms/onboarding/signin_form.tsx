import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/core/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Container from '@/components/templates/Container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Logo from '@/components/atoms/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/core/redux/slices/user_slice'
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/core/redux/store'

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)

    try {
      const response = await dispatch(loginUser(values)).unwrap(); // Unwrap to handle success or error
      console.log('Response after login', response.role);
      if (response) {
        navigate('/admin');
        toast({ title: "Sign in successful!", description: "You have been signed in.", className:'bg-green-600' });
      }

    } catch (err) {
      console.log(err);
      
      toast({ title: "Sign in failed", description: "Sign in failed. Please try again.", className:'bg-red-600' });
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
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in </h2>

          <p className="mt-2 text-center text-base">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
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
              <Button type="submit" className=' text-xl font-semibold text-white'>Submit</Button>
            </form>
          </Form>
        </CardContent>

      </Card>
    </Container>
  )
}

export default SignInForm
