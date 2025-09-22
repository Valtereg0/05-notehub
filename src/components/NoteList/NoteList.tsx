import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import css from './NoteList.module.css';
import type { Note } from '../../types/note';

interface NoteListProps {
    notes: Note[];
}


export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => setDeletingId(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

    return (
        <ul className={css.list}>
	{notes.map(note => (
  <li key={note.id} className={css.listItem}>
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
                <button className={css.button}
                onClick={() => deleteMutation.mutate(note.id)}
              disabled={deletingId === note.id}
              aria-label={`Delete note ${note.title}`}>
                    {deletingId === note.id ? 'Deleting...' : 'Delete'}
                </button>
    </div>
        </li>
    ))}
</ul>)
}