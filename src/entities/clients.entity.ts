import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./users.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 11})
  phone: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User
 
  @OneToMany(() => Contact, contact => contact.client)
  contact: Contact[]
}

export { Client };