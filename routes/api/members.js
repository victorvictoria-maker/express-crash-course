const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');


// get all members
router.get('/', (req, res) => {
    res.json(members);
});

// get a single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// create member
router.post('/', (req, res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        res.status(400).json({msg: 'Please, include a name or email'});
    } else {
        members.push(newMember);
        res.json(members);
    };
});


// update member
// updating sometjing on the server is most cases a put request
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;
        
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                // res.send(updateMember);
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                // res.send("Hello");

                res.json({msg: 'Member updated', member});
            };
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});


module.exports = router;