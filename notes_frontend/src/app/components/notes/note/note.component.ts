import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/entities/models/models';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() noteData!: Note;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() editRequest = new EventEmitter<Note>();

  public handleEditRequest () : void {
    this.editRequest.emit(this.noteData);
  }

  public handleDeleteRequest () : void {
    this.deleteRequest.emit(this.noteData.id);
  }
}
