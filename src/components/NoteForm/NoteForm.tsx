import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, type CreateNoteDto } from '../../services/noteService';
import type { NoteTag } from '../../types/note';

export interface NoteFormProps {
  onCancel: () => void;
  onCreated: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const Schema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500, 'Max 500 characters'),
  tag: Yup.mixed<NoteTag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

const initialValues: FormValues = { title: '', content: '', tag: 'Todo' };

export default function NoteForm({ onCancel, onCreated }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mut = useMutation({
    mutationFn: (dto: CreateNoteDto) => createNote(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCreated();
    },
  });

const handleSubmit = async (
  values: FormValues,
  { setSubmitting, resetForm }: FormikHelpers<FormValues>,
) => {
  await mut.mutateAsync({
    title: values.title.trim(),
    content: values.content.trim() || undefined,
    tag: values.tag,
  });
  resetForm();
  setSubmitting(false);
};


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Schema}>
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting || !isValid}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}