import mongoose from 'mongoose';
import uuid from 'uuid';

// Create a new schema for our app data
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true, default: 'outdated', enum: ['ok', 'failed', 'outdated'] },
  timeout: { type: Number, default: 5 },
  isActive: { type: Boolean, default: false },
  uuid: { type: String, index: { unique: true } },
  payload: [{
    data: mongoose.Schema.Types.Mixed,
    created_at: Date,
  }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

ServiceSchema.pre('save', function save(next) {
  // get the current date
  const currentDate = new Date();

  if (!this.uuid) {
    this.uuid = uuid.v1();
  }

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

ServiceSchema.statics = {
  // deprecated
  getById(id) {
    return this.findById(id)
      .exec();
  },

   // deprecated
  changeActivation(serviceId, shouldBeActive) {
    return this.findByIdAndUpdate(serviceId, { $set: { isActive: shouldBeActive } }, { new: true })
      .exec();
  },
};

// Return a Service model based upon the defined schema
const Service = mongoose.model('Service', ServiceSchema);

/**
 * Get single service by id
 * @param {id} string
 * @api public
 */
export function getById(root, { id }) {
  return Service.findById(id);
}

/**
 * Changes activation status for service
 * @param {id} string
 * @param {isActive} boolean
 * @api protected
 */
export function changeActivationStatus(root, { id, isActive }) {
  return Service.findByIdAndUpdate(
    id,
    { $set: { isActive } },
    { new: true },
  );
}

export default Service;
