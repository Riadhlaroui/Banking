"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Divide, Loader, Loader2 } from "lucide-react";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import SignUp from "@/app/(auth)/sign-up/page";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/user.actions";
import SignIn from "@/app/(auth)/sign-in/page";


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setisLoading(true);
    try {
      //sign up with app-write
      if(type === 'sign-up') {
        const newUser = await signUp(data);

        setUser(newUser);
      }

      if(type === 'sign-in') {
        // const response = await SignIn({
        //   email: data.email,
        //   password: data.password,
        // });

        // if(response) router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1 px-4 flex">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Atlas Logo"
          />
          <h1 className="text-26 font-poppins font-bold text-black-1">Atlas</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/*Plaid Link*/}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' &&(
                <>
                  <div className="flex gap-4">
                    <CustomInput 
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput 
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput 
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your address"
                  />
                  <CustomInput 
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput 
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Ex: laghouat"
                    />
                    <CustomInput 
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Enter your postal code"
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput 
                      control={form.control}
                      name="dateOfBrith"
                      label="Date of Birth"
                      placeholder="Ex: YYYY-MM-DD"
                    />
                    <CustomInput 
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Ex: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput 
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin"/> &nbsp;
                      Loading...
                    </>
                  ): type === 'sign-in' ?'Sign In' : 'Sign Up'
                  }
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-semibold text-gray-600">{
            type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"
              }
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' :
              '/sign-in'
            } className="form-link" >
            {type === 'sign-in' ? ' Sign Up' :
              'Sign In'
            }
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
