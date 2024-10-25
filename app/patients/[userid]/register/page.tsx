import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import * as Sentry from '@sentry/nextjs';
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }) => {
    const user = await getUser(userId);

    // Sentry (app) metrics.
    Sentry.metrics.set("user_view_register", user.name);

    return (
        // Registration interface.
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">

                    {/* Logo. */}
                    <Image
                    src="./assets/icons/logo-full.svg"
                    height={1000}
                    width={1000}
                    alt="patient"
                    className="mb-12 h-10 w-fit"
                    />

                    {/* Patient form to fill. */}
                    <RegisterForm user={user} />

                    {/* Copyright sign. */}
                    <div className="text-14-regular mt-20 flex justify-between">
                    <p className="justify-items-end text-dark-600 xl:texxt-left">
                        &copy; 2024 CarePulse
                    </p>
                    <Link href="/?admin=true" className="text-green-500">
                        Admin
                    </Link>
                    </div>

                </div>
            </section>

            {/* Decorative image on the registration interface. */}
            <Image
            src="/assets/images/register-img.png"
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[390px]"
            />

        </div>
    );
}

export default Register