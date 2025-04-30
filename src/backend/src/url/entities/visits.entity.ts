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
} from '@mikro-orm/core';

@Entity()
export class UrlVisit extends BaseEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Unique()
  @Property()
  hashedID: string;

  @Property({
    nullable: true,
  })
  ip?: string;

  @Property({
    default: 0,
  })
  visits_count: number;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
