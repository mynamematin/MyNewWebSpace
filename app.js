const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "I am thrilled to share my work and experiences with you. This website serves as a platform to showcase my skills and expertise in data science and machine learning. As you browse through the different sections, you will find information about my education, skills, and past projects. I am passionate about using data to solve real-world problems and I have worked on several exciting projects that I am proud to share with you. In addition to showcasing my work, I also want to use this website to demonstrate my technical abilities. I built this website entirely by myself, using my knowledge of HTML, CSS, and Bootstrap. I believe that my technical skills and ability to learn quickly set me apart from other candidates and make me a valuable asset to any organization. Thank you for taking the time to visit my website. I hope you enjoy browsing through my work and learning more about me. If you have any questions or would like to get in touch, please don't hesitate to reach out.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));

const password = "Matin@000";
const encodedPassword = encodeURIComponent(password);

mongoose.connect(`mongodb+srv://matinahmed000:${encodedPassword}@cluster0.zckxhi6.mongodb.net/blogDB`, { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get('/', function (req, res) {
  res.render("home", { starting: homeStartingContent });
});

app.get('/resume', function (req, res) {
  res.render("resume");
});

app.get('/project', function (req, res) {
  res.render("project");
});

app.get('/blogs', function (req, res) {
  Post.find({})
    .then(foundPosts => {
      res.render("blogs", { starting: homeStartingContent, posts: foundPosts });
    })
    .catch(err => {
      console.log(err);
      // Handle the error
    });
});

app.get('/compose', function (req, res) {
  res.render("compose");
});

app.post('/compose', function (req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  newPost.save()
  .then(() => {
    res.redirect("/blogs");
  })
  .catch((err) => {
    // Handle the error
  });

});

app.get("/blogs/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId })
    .then(post => {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    })
    .catch(err => {
      console.log(err);
      // Handle the error
    });
});

app.listen(1800, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening on PORT 1800");
  }
});
 