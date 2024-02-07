const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const messageRoute = require('./routes/message');
app.use(bodyParser.urlencoded({extended:false}));


// app.get('/login',loginRoute);

// app.use('/',messageRoute);

// app.use((req,res) => {
//     res.status(404).send('<h1>Page not found</h1>')
// })

app.get('/login',(req,res) => {
    res.send(`<form method="POST" action="/login" onsubmit="localStorage.setItem('username',document.getElementById('username').value)">
        <input type="text" id="username" name="username">
        <button type="submit">Login</button>
    </form>`
    )
});
app.post('/login', (req,res) => {
    const {username} = req.body;
    if(username){
        // res.send(`<script>localStorage.setItem('username',${username})</script>`)
        res.redirect('/');
    } else {
        res.status(400).send('username is required');
    }
})

app.get('/',(req,res) => {
    fs.readFile('message.txt',(err,data) => {
        if(err) {
            data = "No chat exists";
            console.log(err);
        }
        res.send(`<h3>${data}</h3><form onsubmit = "document.getElementById('username').value =  localStorage.getItem('username')"  method="POST" action="/">
            <label for="message">Message:</label>
            <input id="message" name="message">
            <input id="username" type="hidden" name="username">
            <br>
            <button type="submit">Send</button>
        </form>`
    )
    })
    // const username = localStorage.getItem('username');
    
})

app.post('/',(req,res) => {
    console.log(req.body)
    const {username} = req.body;
    const {message} = req.body;
    const data = `${username}: ${message}` ? `${username}: ${message}` : "No chat exists!"
    fs.writeFile('message.txt', data, {flag:'a'}, (err) => {
        if(err) {
            console.log("error in storing message to file", err);
            return res.status(404).send('error in storing message')
        }
        res.redirect('/login');

    })
})

app.listen(4000);