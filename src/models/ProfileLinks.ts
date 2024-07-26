import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProfileLink extends Document {
  user: mongoose.Schema.Types.ObjectId; 
  platformLinks: {
    platformName: string;
    userLinks: string[];
  }[];
}

const ProfileLinkSchema: Schema<IProfileLink> = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platformLinks: [
      {
        platformName: {
          type: String,
          required: true,
        },
        userLinks: {
          type: [String], 
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const ProfileLink: Model<IProfileLink> =
  mongoose.models.ProfileLink || mongoose.model<IProfileLink>("ProfileLink", ProfileLinkSchema);

export default ProfileLink;
