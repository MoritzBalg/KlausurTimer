import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { NotesService } from '../../services/notes.service';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { Note } from '../../models/note';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-note-display',
  standalone: true,
  imports: [
    NoteComponent,
    NgForOf,
    KeyValuePipe,
    ModalComponent,
  ],
  templateUrl: './notes-display.component.html',
  styleUrl: './notes-display.component.scss'
})
export class NotesDisplayComponent{
  @Input() collapsed: boolean = false;
  @Input() editable: boolean = false;
  @Output() editNote: EventEmitter<{id: string, note: Note}> = new EventEmitter<{id: string, note: Note}>();
  @ViewChild('deleteModal') deleteModal!: ModalComponent;

  selectedNote?: string;
  deletionModalTitle: string = $localize`Hinweis löschen`;

  constructor(public notesService: NotesService, private elementRef: ElementRef) {
  }

  public handleEditNote(id: string, note: Note): void{
    this.editNote.emit({id, note});
  }

  public handleDeleteNote(id: string): void{
    this.selectedNote = id;
    this.deleteModal.open();
  }

  public performDeletion(): void{
    this.notesService.deleteNote(this.selectedNote as string);
    this.deleteModal.close();
  }

  public onDeleteModalClose(): void{
    this.selectedNote = undefined;
  }
}
