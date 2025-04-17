import {Injectable, NotFoundException} from "@nestjs/common";
import ICreateNoteDto from "./dto/icreate.note.dto";
import IUpdateNoteDto from "./dto/iupdate.note.dto";
import {Repository} from "typeorm";
import {Note} from "./entities/note.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class NotesService {
    // private notes: INoteDto[] = [];
    constructor(
      @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>
    ) {
    }

    /*
    GET /notes — отримання списку всіх нотаток.
    Відповідь: INoteListDto
    */
    // findAll(): INoteListDto {
    //     return { items: this.notes };
    // }

    async findAll() {
      const data = await this.noteRepository.find();
      return { items: data };
    }

  /*
  GET /notes/:id — отримання конкретної нотатки за ID.
  Відповідь: INoteDto
  */
    // findOne(id: string): INoteDto {
    //     const note = this.notes.find((note) =>
    //         note.id === id
    //     );
    //     if (!note) {
    //         throw new NotFoundException(`Note with given id (${id}) was not found!`)
    //     }
    //     return note;
    // }

    async findOne(id: string) {
        const noteToFind = await this.noteRepository.findOne(
            {where: {id: id}}
        );
        if (!noteToFind) {
            throw new NotFoundException(`Note with given id (${id}) was not found!`)
        }
        return noteToFind;
    }

    /*
    POST /notes — створення нової нотатки.
    Тіло запиту: ICreateNoteDto
    Відповідь: INoteDto
    */
    // create(createNote: ICreateNoteDto): INoteDto {
    //     const createdNote: INoteDto = {
    //         /*
    //         id: string;
    //         title: string;
    //         content: string;
    //         */
    //         id: `note_${Date.now()}`,
    //         title: createNote.title,
    //         content: createNote.content ?? ''
    //     }
    //     this.notes.push(createdNote);
    //     return createdNote;
    // }
    create(createNote: ICreateNoteDto) {
        const createdNote = {
            /*
            id: string;
            title: string;
            content: string;
            */
            id: `note_${Date.now()}`,
            title: createNote.title,
            content: createNote.content ?? ''
        }
        return this.noteRepository.save(createdNote);
    }

    /*
    PUT /notes/:id — оновлення вмісту існуючої нотатки.
    Тіло запиту: IUpdateNoteDto
    Відповідь: INoteDto
    */
    // update(updateNote: IUpdateNoteDto, id: string): INoteDto {
    //     const noteToUpdate:INoteDto = this.findOne(id);
    //     if (!noteToUpdate) {
    //       throw new NotFoundException(`Note with given id (${id}) was not found!`);
    //     }
    //
    //     noteToUpdate.title = updateNote.title ?? noteToUpdate.title;
    //     noteToUpdate.content = updateNote.content ?? noteToUpdate.content;
    //
    //     return noteToUpdate;
    // }
    async update(updateNote: IUpdateNoteDto, id: string) {
        const noteToUpdate = await this.noteRepository.findOne(
            {where: {id: id}}
        );
        if (!noteToUpdate) {
          throw new NotFoundException(`Note with given id (${id}) was not found!`);
        }
        noteToUpdate.title = updateNote.title ?? noteToUpdate.title;
        noteToUpdate.content = updateNote.content ?? noteToUpdate.content;

        return this.noteRepository.save(noteToUpdate);
    }

    /*
    DELETE /notes/:id — видалення нотатки за ID.
    Відповідь: { success: boolean }
    */
    // delete(id: string) : { success: boolean } {
    //     const index = this.notes.findIndex((note) =>
    //         note.id === id
    //     );
    //     if (index === -1) {
    //         throw new NotFoundException(`Note with given id (${id}) was not found!`);
    //     }
    //     this.notes = this.notes.slice(index, 1);
    //     return { success: true }
    // }
    async delete(id: string) : Promise<{ success: boolean }> {
        const noteToDelete = await this.noteRepository.findOne({
            where: {id: id}
        });
        if (!noteToDelete) {
          throw new NotFoundException(`Note with given id (${id}) was not found!`);
        }
        this.noteRepository.delete(id).then();

        return { success: true };
    }
}
