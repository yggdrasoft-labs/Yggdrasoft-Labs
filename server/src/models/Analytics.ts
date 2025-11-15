import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  type: 'pageview' | 'event' | 'contact' | 'download';
  page?: string;
  eventName?: string;
  eventData?: Record<string, any>;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  timestamp: Date;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    type: {
      type: String,
      enum: ['pageview', 'event', 'contact', 'download'],
      required: true,
    },
    page: {
      type: String,
      trim: true,
    },
    eventName: {
      type: String,
      trim: true,
    },
    eventData: {
      type: Schema.Types.Mixed,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    referrer: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

analyticsSchema.index({ type: 1, timestamp: -1 });
analyticsSchema.index({ page: 1, timestamp: -1 });

export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
