import axios from "axios";
import express, { query } from "express";
import bodyParser from "body-parser";
const port = 3000;
const app = express();
const APIkey = "ZBynmw1imK9dvJ0Jc6LwuoU8mJTHiOmDacf6MSdu3pSVNwtIfzrzu4BV";
const APIURL = "https://api.pexels.com/v1";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON request bodies

const config = { headers: { Authorization: APIkey } };

app.get("/", async (req, res) => {
  try {
    const page = Math.trunc(Math.random() * 100);
    const response = await axios.get(APIURL + "/curated", {
      headers: { Authorization: APIkey },
      params: { page: page, per_page: 80 },
    });
    console.log(response.data);

    res.render("index.ejs", { photos: response.data.photos });
  } catch (error) {
    console.error(error);
  }
});

app.get("/search", (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  try {
    console.log(req.body.query);
    const response = await axios.get(APIURL + "/search", {
      headers: { Authorization: APIkey },
      params: { query: req.body.query, per_page: 80, page: req.body.page },
    });
    console.log(response.data);
    res.json({
      photos: response.data.photos,
      query: req.body.query,
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
