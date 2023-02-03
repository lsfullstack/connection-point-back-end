import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Client } from "./clients.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 11})
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  client: Client
}

export { Contact };
