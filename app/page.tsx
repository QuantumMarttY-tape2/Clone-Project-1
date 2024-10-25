// Video followed:

// =========================================== //
//                                             //
// https://www.youtube.com/watch?v=lEflo_sc82g //
//                                             //
// =========================================== //


// Failed installation on my computer:

// ======================= //
//                         //
// npm install next-themes //
//                         //
// npx shadcn@latest init  //
//                         //
// ======================= //

// Error message for both:

// npm error code ERESOLVE
// npm error ERESOLVE unable to resolve dependency tree
// npm error
// npm error While resolving: top-tech-clones@0.1.0
// npm error Found: react@19.0.0-rc-65a56d0e-20241020
// npm error node_modules/react (node_modules/@radix-ui/react-icons for "npx shadcn@latest init")
// npm error   react@"19.0.0-rc-65a56d0e-20241020" from the root project
// npm error
// npm error Could not resolve dependency:
// npm error peer react@"^16.8 || ^17 || ^18" from next-themes@0.3.0
// npm error node_modules/next-themes
// npm error   next-themes@"*" from the root project
// npm error
// npm error Fix the upstream dependency conflict, or retry
// npm error this command with --force or --legacy-peer-deps
// npm error to accept an incorrect (and potentially broken) dependency resolution.
// npm error
// npm error
// npm error For a full report see:
// npm error /Users/Q.Ph./.npm/_logs/2024-10-22T20_18_33_320Z-eresolve-report.txt
// npm error A complete log of this run can be found in: /Users/Q.Ph./.npm/_logs/2024-10-22T20_18_33_320Z-debug-0.log


import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  // Check admin.
  const isAdmin = searchParams.admin === 'true';
  
  return (

    // Registration interface.
    <div className="flex h-screen max-h-screen">

      {/* If admin, then render a passkey. */}
      {isAdmin && <PasskeyModal />}
      
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">

          {/* Logo. */}
          <Image
            src="./assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* Patient form to fill. */}
          <PatientForm />

          {/* Copyright sign. */}
          <p className="copyright py-12">
            &copy; 2024 CarePulse
          </p>

        </div>
      </section>

      {/* Decorative image on the registration interface. */}
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />

    </div>
  );
}
