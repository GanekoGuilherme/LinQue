import mongoose from '@shared/database';
import { Schema } from 'mongoose';

const competitiveClassifications = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    classifications: [
      {
        _id: false,
        placing: { type: Number },
        name: { type: String },
        wins: { type: Number },
        loses: { type: Number },
        time: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  },
);

const CompetitiveClassifications = mongoose.model('CompetitiveClassifications', competitiveClassifications);

export default CompetitiveClassifications;
