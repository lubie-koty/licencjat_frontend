import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Note } from '../entities/models/models';
import { ActionResponseDTO } from '../entities/data_transfer_objects/response_dtos';
import { NoteDTO } from '../entities/data_transfer_objects/model_dtos';
import { getApiURI } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private getNotesApiURI = getApiURI('api/notes');

  constructor(private httpClient: HttpClient) { }

  public getNotes () : Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.getNotesApiURI());
  }

  public addNote (body: NoteDTO) : Observable<ActionResponseDTO> {
    return this.httpClient.post<ActionResponseDTO>(this.getNotesApiURI(), body);
  }

  public editNote (noteId: number, body: NoteDTO) : Observable<ActionResponseDTO> {
    return this.httpClient.post<ActionResponseDTO>(this.getNotesApiURI(noteId), body);
  }

  public deleteNote (noteId: number) : Observable<ActionResponseDTO> {
    return this.httpClient.delete<ActionResponseDTO>(this.getNotesApiURI(noteId));
  }
}
