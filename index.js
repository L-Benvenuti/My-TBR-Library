import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

// All libraries
app.post("/all", async (req, res) => {
    try {
        const result = await axios.get('https://openlibrary.org/people/luiza_benvenuti_hernandez/books/want-to-read.json');
        
        //random index based of data/object length
        const index = Math.floor(Math.random()*result.data['reading_log_entries'].length);
        const randomBook = result.data['reading_log_entries'][index];

        //need to find number of pages through another request after the book has been selected by the randomizer
        const pages = await axios.get(`https://openlibrary.org/search.json?q=${randomBook.work.title}&fields=*,availability&limit=1`);

        res.render("index.ejs", {
            title: JSON.stringify(randomBook.work.title),
            author: JSON.stringify(randomBook.work['author_names']),
            numberOfPages: JSON.stringify(pages.data.docs[0]['number_of_pages_median']),
            cover: JSON.stringify(randomBook.work['cover_id'])
        })

    } catch (error) {
        console.log(error.message)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});