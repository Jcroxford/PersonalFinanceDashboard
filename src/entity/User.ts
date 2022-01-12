import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm'
import { hash } from 'bcryptjs'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  passwordUpdatedAt: Date

  private prevPassword: string

  @AfterLoad()
  private cacheOldPassword () {
    this.prevPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword () {
    if (this.password === this.prevPassword) return
    this.password = await hash(this.password, 12)
    this.passwordUpdatedAt = new Date()
  }
}
