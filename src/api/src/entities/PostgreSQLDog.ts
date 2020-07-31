import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({
    name: 'dogs',
})
export class PostgreSQLDog {
    @IsEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    // class-validator validation
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    // class-validator validation
    @IsString()
    @IsNotEmpty()
    // exclude property when object is sent to user
    @Exclude({
        toPlainOnly: true,
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    secret?: string;
}
