// Tried to "npx shadcn@latest add form"

// Error message:

// Something went wrong. Please check the error below for more details.
// If the problem persists, please open an issue on GitHub.

// Command failed with exit code 1: npm install @radix-ui/react-label @radix-ui/react-slot @hookform/resolvers zod react-hook-form
// npm error code ERESOLVE
// npm error ERESOLVE unable to resolve dependency tree
// npm error
// npm error While resolving: top-tech-clones@0.1.0
// npm error Found: react@19.0.0-rc-65a56d0e-20241020
// npm error node_modules/react
// npm error   react@"19.0.0-rc-65a56d0e-20241020" from the root project
// npm error
// npm error Could not resolve dependency:
// npm error peer react@"^16.8.0 || ^17 || ^18 || ^19" from react-hook-form@7.53.1
// npm error node_modules/react-hook-form
// npm error   react-hook-form@"*" from the root project
// npm error   peer react-hook-form@"^7.0.0" from @hookform/resolvers@3.9.0
// npm error   node_modules/@hookform/resolvers
// npm error     @hookform/resolvers@"*" from the root project
// npm error
// npm error Fix the upstream dependency conflict, or retry
// npm error this command with --force or --legacy-peer-deps
// npm error to accept an incorrect (and potentially broken) dependency resolution.
// npm error
// npm error
// npm error For a full report see:
// npm error /Users/Q.Ph./.npm/_logs/2024-10-22T20_26_15_725Z-eresolve-report.txt
// npm error A complete log of this run can be found in: /Users/Q.Ph./.npm/_logs/2024-10-22T20_26_15_725Z-debug-0.log

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

// enum
export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phone-input',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}



const PatientForm = () => {
    const router = useRouter;

    // Define isLoading.
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
        name: "",
        email: "",
        phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);

        try {
            const userData = { name, email, phone }

            const user = await createUser(userData);

            if (user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there emoji</h1>
                    <p className="text-dark-700">Schedule your appointment</p>
                </section>

                {/* Name input. */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="ChipSa"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                {/* Email input. */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="ChipSa@overwatchsucks.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                {/* Phone input. */}
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="(555) 123-6789"
                />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm;