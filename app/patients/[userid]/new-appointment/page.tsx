import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from '@sentry/nextjs';

export default async function NewAppointment({ params: { userId }}: SearchParamProps) {
    const patient = await getPatient(userId);

    // Sentry (app) metrics.
    Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (

    // Registration interface.
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">

          {/* Logo. */}
          <Image
            src="./assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* Patient form to fill. */}
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          {/* Copyright sign. */}
          <p className="copyright mt-10 py-12">
            &copy; 2024 CarePulse
          </p>

        </div>
      </section>

      {/* Decorative image on the registration interface. */}
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />

    </div>
  );
}
