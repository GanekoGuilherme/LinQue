import mongoose from "@shared/database";
import { Schema } from "mongoose";

const players = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    fullName: { type: String },
    role: { type: String },
    roleKey: { type: String },
    img: { type: String },
    champ1: { type: String },
    champ2: { type: String },
    badge1: { type: String },
    imgBadge1: { type: String },
    badge2: { type: String },
    imgBadge2: { type: String },
    badge3: { type: String },
    imgBadge3: { type: String },
    score: { type: String },
    kdaAverage: { type: String },
    kdaLastGame: { type: String },
    colorLastKda: { type: String },
    kdaPenultimateGame: { type: String },
    colorPenultimateKda: { type: String },
    player: { type: String },
    country: { type: String },
    team: { type: String },
  },
  {
    timestamps: true,
    autoCreate: true,
    versionKey: false,
  }
);

const Players = mongoose.model("Players", players);

export default Players;
