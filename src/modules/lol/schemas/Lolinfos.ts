import mongoose from '@shared/database';
import { Schema } from 'mongoose';

const lolinfos = new Schema(
  {
    _id: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
      default: '',
    },
    puuid: {
      type: String,
      required: true,
      unique: true,
    },
    summonerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileIconId: {
      type: String,
    },
    revisionDate: {
      type: Number,
    },
    summonerLevel: {
      type: String,
    },
    statusMatchesUpdate: {
      type: String,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  },
);

const Lolinfos = mongoose.model('Lolinfos', lolinfos);

export default Lolinfos;
