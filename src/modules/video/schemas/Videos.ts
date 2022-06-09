import mongoose from '@shared/database';
import { Schema } from 'mongoose';

const videos = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
    },
    dataId: {
      type: String,
      required: true,
      ref: 'Lolinfos',
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  },
);

const Videos = mongoose.model('Videos', videos);

export default Videos;
