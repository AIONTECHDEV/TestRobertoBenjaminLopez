import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm-plus";

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fromAccount: number;
    @Column()
    toAccount: number;
    @Column({type: "float"})
    amount: number;
    @CreateDateColumn({type: "timestamp"})
    sentAt: Date;

    constructor(transaction?) {
        super();
        if (transaction){
            this.fromAccount = parseInt(transaction.fromAccount);
            this.toAccount = parseInt(transaction.toAccount);
            this.amount = parseFloat(transaction.amount);
        }
    }

}
