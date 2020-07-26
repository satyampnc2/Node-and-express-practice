const express = require('express');
const members = require('../../Members');
const router = express.Router();
const uuid = require('uuid');
//Gets all members
router.get('/',(req,res)=>{
    //res.send(JSON.stringify(members));  or we can write in shorthand
    res.json(members);
})

//Get Single member
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({msg: 'Member not found'});
    }
})

//Create member
router.post('/', (req,res)=>{
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        age : req.body.age,
        status: 'active'
    }
    if(!newMember.name || !newMember.age){
        res.status(400).json({msg: 'Please include name and email'});
    }

    members.push(newMember);
    res.json(members);
});

//Update Member
router.put('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.age = updMember.age ? updMember.age : member.age;
                res.json({msg :'Member updated',member});
            }
            
        })
    } else{
        res.status(400).json({msg: 'Member not found'});
    }
});

module.exports = router;