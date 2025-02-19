import { z } from "zod";

export const firestoreDateSchema = z.object({
  seconds: z.number()
    .int("Seconds must be an integer")
    .min(0, "Seconds cannot be negative"),
  nanoseconds: z.number()
    .int("Nanoseconds must be an integer")
    .min(0, "Nanoseconds cannot be negative")
    .max(999999999, "Nanoseconds must be less than 1 second"),
});

export type FirestoreDate = z.infer<typeof firestoreDateSchema>;

export const firestoreDateUtils = {
  toDate: (firestoreDate: FirestoreDate): Date => {
    return new Date(
      firestoreDate.seconds * 1000 + Math.floor(firestoreDate.nanoseconds / 1000000)
    );
  },
  fromDate: (date: Date): FirestoreDate => {
    const milliseconds = date.getTime();
    const seconds = Math.floor(milliseconds / 1000);
    const nanoseconds = (milliseconds % 1000) * 1000000;
    return { seconds, nanoseconds };
  },
  now: (): FirestoreDate => {
    return firestoreDateUtils.fromDate(new Date());
  },
}; 