const express = require('express');
const router  = express.Router();
const fs = require('fs');

router.get('/login',(req,res) => {
    res.send(`<form method="POST" action="/" onsubmit="localStorage.setItem('username',document.getElementById('username').value)">
        <input type="text" id="username" name="username">
        <button type="submit">Login</button>
    </form>`)
});
router.post('/login',(res,req) => {
    console.log(req.body.username);
    res.redirect('/')
})

module.exports = router;