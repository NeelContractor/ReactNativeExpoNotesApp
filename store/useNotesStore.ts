import { storage } from "@/storage/mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Note = {
    id: string
    text: string
}

type NotesStore = {
    notes: Note[]
    addNote: (text: string) => void;
    deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
    persist(
        (set) => ({
            notes: [],
            addNote: (text) => 
                set((state) => ({
                    notes: [
                        ...state.notes,
                        { id: Date.now().toString(), text },
                    ],
                })),
            deleteNote: (id) =>
                set((state) => ({
                    notes: state.notes.filter((n) => n.id !== id),
                })),
        }),
        {
            name: "notes-storage",
            storage: createJSONStorage(() => ({
                getItem: (name: string) => {
                    const value = storage.getString(name);
                    return value ?? null;
                },
                setItem: (name: string, value: string) => {
                    storage.set(name, value)
                },
                removeItem: (name: string) => {
                    storage.remove(name);
                },
            }))
        }
    )
)