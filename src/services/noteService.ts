import axios, { type AxiosInstance } from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';



export interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
    page?: number;
    perPage?: number;
    totalItems?: number;
}

export interface FetchNotesParams {
  page: number; 
  perPage: number;
  search?: string;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: NoteTag;
}

  const API_URL = "https://notehub-public.goit.study/api";
  const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
});

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const res: AxiosResponse<FetchNotesResponse> = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
}

export async function createNote(dto: CreateNoteDto): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post<Note>('/notes', dto);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}