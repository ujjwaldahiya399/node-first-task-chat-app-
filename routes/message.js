const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', function (req, res) {
    console.log(localStorage.getItem('username'));
    res.send(`<form method="POST" action="/" onsubmit="document.getElementById('username').value = localStorage.getItem('username') ? localStorage.getItem('username')" : "" ">
        <input placeHolder="enter message" type="text" id="message" name="message">
        <input type="hidden" id="username" name="username">
        <button type="submit">send</button>
    </form>`)
});
router.post('/', (res, req) => {
    console.log(req);
    // fs.writeFileSync("username.txt",`${req.body.username}:${req.body.message}`,(err) => err? console.log(err) : res.redirect('/'));

})


module.exports = router;