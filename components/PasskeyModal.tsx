// Failed to install "npx shadcn@latest add input-otp" OTP.

'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { encryptKey } from "@/lib/utils";
  


// Two parts: modal and passkey.

const PasskeyModal = () => {
    const router = useRouter();

    // Determine whether the webpage already has passkey entered or not.
    const path = usePathname();

    const [open, setOpen] = useState(false);

    const [passkey, setPasskey] = useState('');

    // Need to show errors when entering invalid passkey.
    const [error, setError] = useState('');

    // Do not need to fill in the access key again if already did.
    const encryptedKey = typeof window!== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        // Decrypt the encrypted key.
        const accessKey = encryptedKey && decryptKey(encryptedKey);
        if (path) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false);

                router.push('/admin');
            }
            else {
                setOpen{true};
            }
        }
    }, [encryptedKey])

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            // Get encrypted key.
            const encryptedKey = encryptKey(passkey);

            localStorage.setItem('accessKey', encryptedKey);

            setOpen(false);
        }
        else {
            setError{"Invalid passkey. Please try again."}
        }
    }

    const closeModal = () => {
        setOpen(false);
        router.push('/')
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>

                    <AlertDialogTitle className="flex items-staart justify-between">
                        Admin Access Verification

                        <Image
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={20}
                            height={20}
                            onClick={() => closeModal()}
                            className="cursor-pointer"
                        />
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey.
                    </AlertDialogDescription>

                </AlertDialogHeader>

                {/* Enter the passkey. */}
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot className="shad-otp-slot" index={0} />
                            <InputOTPSlot className="shad-otp-slot" index={1} />
                            <InputOTPSlot className="shad-otp-slot" index={2} />
                            <InputOTPSlot className="shad-otp-slot" index={3} />
                            <InputOTPSlot className="shad-otp-slot" index={4} />
                            <InputOTPSlot className="shad-otp-slot" index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    {error && <p className="shad-error text-14-regular mt-4 flex justify-center">
                        {error}
                        </p>}
                </div>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={(e) => validatePasskey(e)}
                        className="shad-primary-btn w-full"
                        >
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );
}

export default PasskeyModal;