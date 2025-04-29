import { ObjectId, EntitySchema } from '@mikro-orm/mongodb';

export interface IUser {
  _id: ObjectId;
  id: string;
  name: string;
  email: string;
}

export const User = new EntitySchema<IUser>({
  name: 'User',
  properties: {
    _id: { type: 'ObjectId', primary: true },
    id: { type: String, serializedPrimaryKey: true },
    email: { type: String, unique: true },
    name: { type: String },
  },
});
