import mongoose from '@shared/database';
import { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';

const users = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordToken: {
      type: String,
      unique: true,
    },
    passwordTokenExpires: {
      type: Date,
    },
    passwordTokenActive: {
      type: Boolean,
    },
    verify: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  },
);

users.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
  next();
});

const Users = mongoose.model('Users', users);

export default Users;
