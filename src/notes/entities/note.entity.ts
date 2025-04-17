import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Note {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;
}
