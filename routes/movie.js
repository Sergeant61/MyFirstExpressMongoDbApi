const express = require("express");
const router = express.Router();

//Models
const Movie = require("../models/Movie");

//getAll
router.get("/", (req, res, next) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: "directors",
        localField: "director_id",
        foreignField: "_id",
        as: "director"
      }
    },
    {
      $unwind: {
        path: "$director",
        preserveNullAndEmptyArrays: true
      }
    }
  ]);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Top 10 list
router.get("/top10", (req, res, next) => {
  const promise = Movie.find({})
    .limit(10)
    .sort({ imdb_score: -1 });

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//getOnlyOne
router.get("/:movie_id", (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update
router.put("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true // bu yeni eklenen datayı dönbeyi sağlıyor
  });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete
router.delete("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Add
router.post("/", (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body;

  // const movie = new Movie({
  //   title: title,
  //   imdb_score: imdb_score,
  //   category: category,
  //   country: country,
  //   year: year
  // });

  const movie = new Movie(req.body);
  // movie.save((err, data) => {
  //   if (err) res.json(err);

  //   res.json({ status: 1 });
  // });

  const promise = movie.save();
  promise
    .then(data => {
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json(err);
    });
});

// Between
router.get("/between/:start_year/:end_year", (req, res, next) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: { $gte: parseInt(start_year), $lte: parseInt(end_year) }
  });

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
