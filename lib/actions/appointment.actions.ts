'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config";
import { parseStringify, formatDateTime } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try{
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment,
        )

        return parseStringify(newAppointment)
    } catch (error) {
        console.log(error);
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,               // Which database to get from.
            APPOINTMENT_COLLECTION_ID!, // Which appointment collection to fetch.
            appointmentId,              // Which specific appointment.
        )

        return parseStringify(appointment);
    } catch (error) {
        console.log(error)
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        // Set initial count numbers.
        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        // Iterate the counts.
        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled') {
                acc.scheduledCount += 1;
            } else if (appointment.status === 'pending') {
                acc.pendingCount += 1;
            } else if (appointment.status === 'cancelled') {
                acc.cancelledCount += 1;
            }

            return acc;
        }, initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type}: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.update.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        // If there is no updated appointment:
        if (!updatedAppointment) {
            throw new Error('Appointment not found.')
        }

        // Else send SMS notification.
        const smsMessage = `
            Hi, it is CarePulse.
            ${type === 'schedule' ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}.`
            : `We regret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationReason}.`}
        `

        revalidatePath('/admin');
        return parseStringify(updatedAppointment);
    } catch (error) {
        console.log(error)
    }
}

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique,
            content,
            [],
            [userId]
        )

        return parseStringify(message);
    } catch (error) {
        console.log(error)
    }
}