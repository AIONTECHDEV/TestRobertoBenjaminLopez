import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm-plus";

@Entity()
export class Account extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    account: number;
    @Column({type:"float8", nullable:true})
    balance: number;
    @Column()
    owner: number;
    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    constructor() {
        super();
    }
}
