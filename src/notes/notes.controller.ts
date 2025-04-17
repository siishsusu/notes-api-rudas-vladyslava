import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {NotesService} from "./notes.service";
import ICreateNoteDto from "./dto/icreate.note.dto";
import IUpdateNoteDto from "./dto/iupdate.note.dto";

@Controller('notes')
export class NotesController {
    constructor(
        private readonly notesService: NotesService
    ) {
    }

    // GET /notes
    @Get()
    // findAll(): INoteListDto {
    //     return this.notesService.findAll();
    // }
    findAll() {
        return this.notesService.findAll();
    }

    // GET /notes/:id
    @Get(':id')
    // findOne(@Param('id') id: string): INoteDto {
    //     return this.notesService.findOne(id);
    // }
    findOne(@Param('id') id: string) {
        return this.notesService.findOne(id);
    }

    // POST /notes
    @Post()
    // create(@Body() createNote: ICreateNoteDto): INoteDto {
    //     return this.notesService.create(createNote);
    // }
    create(@Body() createNote: ICreateNoteDto) {
        return this.notesService.create(createNote);
    }

    // PUT /notes/:id
    @Put(':id')
    // update(@Body() updateNote: IUpdateNoteDto, @Param('id') id: string): INoteDto {
    //     return this.notesService.update(updateNote, id);
    // }
    update(@Body() updateNote: IUpdateNoteDto, @Param('id') id: string) {
        return this.notesService.update(updateNote, id);
    }

    // DELETE /notes/:id
    @Delete(':id')
    // delete(@Param('id') id: string): {success: boolean} {
    //     return this.notesService.delete(id);
    // }
    delete(@Param('id') id: string): Promise<{success: boolean}> {
        return this.notesService.delete(id);
    }
}
