import { EntitySchema, ObjectId } from '@mikro-orm/mongodb';

import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  ManyToOne,
  Opt,
  PrimaryKey,
  Unique,
  BaseEntity,
  SerializedPrimaryKey,
  Index,
} from '@mikro-orm/core';

@Entity()
export class Url extends BaseEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Index()
  @Property()
  hashedID: string;

  @Property({
    type: 'text',
  })
  targetURL: string;

  @Property({
    nullable: true,
  })
  ip?: string;

  @Property({
    default: 0,
  })
  visits_count?: number;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
