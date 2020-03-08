const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, "{PATH} alanı zorunludur."],
    maxlength: [
      15,
      "{PATH} alanı ({VALUE}), ({MAXLENGTH}) karakterden küçük olmalıdır."
    ],
    minlength: [
      5,
      "{PATH} alanı ({VALUE}), ({MINLENGTH}) karakterden büyük olmalıdır."
    ]
  },
  category: String,
  country: String,
  year: String,
  imdb_score: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("movie", MovieSchema);
