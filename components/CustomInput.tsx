import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {Control, FieldPath} from 'react-hook-form'

import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const formSchema = authFormSchema('sign-up');



interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
}

const CustomInput = ({control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
            <FormLabel className='form-label'>{label}</FormLabel>
                <div className='flex w-full flex-col'>
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            className='input-class'
                            type={name === 'password' ? 'Password' : 'text'}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className='form-message mt-2'></FormMessage>
                </div>
            </div>
        )}
    />
  )
}

export default CustomInput