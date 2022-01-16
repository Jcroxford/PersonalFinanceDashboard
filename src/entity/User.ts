import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm'
import { hash } from 'bcryptjs'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
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
