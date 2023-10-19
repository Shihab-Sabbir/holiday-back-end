import { Schema, model } from 'mongoose';
import { IService, IServiceModel, SERVICE_TYPE } from './service.interface';

const serviceSchema = new Schema<IService, Record<string, unknown>, IServiceModel>(
  {
    service: { type: String, enum: Object.values(SERVICE_TYPE), required: true },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String },
    startDate: { type: Date, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number },
    location: { type: String },
    time: { type: String },
    description: { type: String },
    country: { type: String, required: true },
    image: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IService, IServiceModel>('Service', serviceSchema);
