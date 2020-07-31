import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty, IsEmpty, IsEmail, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class Administrator {
    static names = {
        parent: 'parent',
    };

    @IsEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Column({
        type: 'varchar',
        nullable: false,
    })
    email: string;

    @Exclude({ toPlainOnly: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Column({
        type: 'varchar',
        nullable: false,
    })
    passwordHash: string;

    @ManyToOne(() => Administrator, {})
    parent: Administrator;
}
