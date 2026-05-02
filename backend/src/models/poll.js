const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema(
  {
    pollId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    options: [{ type: String, required: true }],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    visible: { type: Boolean, default: true },
    status: { type: String, enum: ['ACTIVE', 'CLOSED'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Poll', pollSchema);