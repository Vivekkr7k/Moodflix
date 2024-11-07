const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: { type: String, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  actors: { type: String },
  directors: { type: String },
  writers: { type: String },
  imdbRating: { type: String },
  releaseDate: { type: Date },
  countries: { type: String, default: 'India' },
  genres: { type: String },
  runtime: { type: String },
  freePaid: { type: String, enum: ['Free', 'Paid'], default: 'Paid' },
  trailerUrl: { type: String },
  videoQuality: { type: String, default: '4K' },
  thumbnail: { type: String }, // Store the base64 image URL
  poster: { type: String }, // Store the base64 image URL
  sendNewsletter: { type: Boolean, default: false },
  sendPushNotification: { type: Boolean, default: false },
  publish: { type: Boolean, default: false },
  enableDownload: { type: Boolean, default: false },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
