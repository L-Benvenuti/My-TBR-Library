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
            title: randomBook.work.title,
            author: randomBook.work['author_names'],
            numberOfPages: pages.data.docs[0]['number_of_pages_median'],
            cover: randomBook.work['cover_id']
        })

    } catch (error) {
        console.log(error.message)
    }
});

// Physical library
app.post("/physical", async (req, res) => {
    try {
        const result = await axios.get('https://openlibrary.org/people/luiza_benvenuti_hernandez/lists/OL246178L/seeds.json');
        
        //random index based of data/object length
        const index = Math.floor(Math.random()*result.data.entries.length);
        const randomBook = result.data.entries[index];

        //in this case, the data from lists does not provide the info I want so I am making a search which will allow me to access that info
        const moreResults = await axios.get(`https://openlibrary.org/search.json?q=${randomBook.title}&fields=*,availability&limit=1`);
        const extraInfo = moreResults.data.docs[0];

        res.render("index.ejs", {
            title: randomBook.title,
            author: extraInfo['author_name'],
            numberOfPages: extraInfo['number_of_pages_median'],
            cover: extraInfo['cover_i']
        })

    } catch (error) {
        console.log(error.message)
    }
});

// Kindle library
app.post("/kindle", async (req, res) => {
    try {
        const result = await axios.get('https://openlibrary.org/people/luiza_benvenuti_hernandez/lists/OL246176L/seeds.json');
        
        //random index based of data/object length
        const index = Math.floor(Math.random()*result.data.entries.length);
        const randomBook = result.data.entries[index];

        //in this case, the data from lists does not provide the info I want so I am making a search which will allow me to access that info
        const moreResults = await axios.get(`https://openlibrary.org/search.json?q=${randomBook.title}&fields=*,availability&limit=1`);
        const extraInfo = moreResults.data.docs[0];

        res.render("index.ejs", {
            title: randomBook.title,
            author: extraInfo['author_name'],
            numberOfPages: extraInfo['number_of_pages_median'],
            cover: extraInfo['cover_i']
        })

    } catch (error) {
        console.log(error.message)
    }
});

// Apple library
app.post("/apple", async (req, res) => {
    try {
        const result = await axios.get('https://openlibrary.org/people/luiza_benvenuti_hernandez/lists/OL246177L/seeds.json');
        
        //random index based of data/object length
        const index = Math.floor(Math.random()*result.data.entries.length);
        const randomBook = result.data.entries[index];

        //in this case, the data from lists does not provide the info I want so I am making a search which will allow me to access that info
        const moreResults = await axios.get(`https://openlibrary.org/search.json?q=${randomBook.title}&fields=*,availability&limit=1`);
        const extraInfo = moreResults.data.docs[0];

        res.render("index.ejs", {
            title: randomBook.title,
            author: extraInfo['author_name'],
            numberOfPages: extraInfo['number_of_pages_median'],
            cover: extraInfo['cover_i']
        })

    } catch (error) {
        console.log(error.message)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});