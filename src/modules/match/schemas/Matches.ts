import mongoose from '@shared/database';
import { Schema } from 'mongoose';

const matches = new Schema(
  {
    _id: {
      type: String,
    },
    matchId: {
      type: String,
      required: true,
      unique: true,
    },
    info: {
      gameCreation: Number,
      gameDuration: Number,
      gameEndTimestamp: Number,
      gameId: Number,
      gameMode: String,
      gameName: String,
      gameStartTimestamp: Number,
      gameType: String,
      gameVersion: String,
      mapId: Number,
      participants: [{ _id: false, type: Object }],
      platformId: String,
      queueId: Number,
      teams: [{ _id: false, type: Object }],
      tournamentCode: String,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  },
);

const Matches = mongoose.model('Matches', matches);

export default Matches;
