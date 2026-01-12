/**
 * User Model - Mongoose Schema
 * Defines user document structure and methods
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

// Enums
export enum UserType {
  RETAIL = 'RETAIL',
  WHOLESALE_PENDING = 'WHOLESALE_PENDING',
  WHOLESALE_VERIFIED = 'WHOLESALE_VERIFIED',
  DISTRIBUTOR_PENDING = 'DISTRIBUTOR_PENDING',
  DISTRIBUTOR_VERIFIED = 'DISTRIBUTOR_VERIFIED',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

// Interface for User document
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  userType: UserType;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  refreshToken?: string;
  emailVerifyToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Don't include password in queries by default
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    userType: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.RETAIL,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    emailVerifyToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.refreshToken;
        return ret;
      },
    },
  }
);

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ userType: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

// Create and export model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
