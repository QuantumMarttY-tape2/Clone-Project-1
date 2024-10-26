"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"

import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
    // Appointment ID.
    {
        header: 'ID',
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    },

    // Patient name for the registered appointment.
    {
        accessorKey: 'patient',
        header: 'Patient',
        cell: ({ row }) => {
            return <p className="text-14-medium">{row.original.patient.name}</p>
        }
    },
    
    // Status of the appointment.
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="min-w-[115px]">
                <StatusBadge status={row.original.status} />
            </div>
        )
    },

    // Schedule of the appointment.
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        )
    },

    // Doctor of the appointment.
    {
        accessorKey: "primaryPhysician",
        header: () => 'Doctor',
        cell: ({ row }) => {
        const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

        return (
            <div className="flex items-center gap-3">
                <Image
                    src={doctor?.image!}
                    alt="doctor"
                    width={100}
                    height={100}
                    className="size-8"
                />
                <p className="whitespace-nowrap">
                    Dr. {doctor?.name}
                </p>
            </div>
        )},
    },

    // Actions doctors can do on specific appointments.
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row: { original: data } }) => {
            return(
                <div className="flex gap-1">
                    <AppointmentModal
                        type="schedule"
                        patientId={data.patient.$id}
                        userId={data.userId}
                        appointment={data}
                    />

                    <AppointmentModal
                        type="cancel"
                        patientId={data.patient.$id}
                        userId={data.userId}
                        appointment={data}
                    />
                </div>
            )
        }
    },
]
