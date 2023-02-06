const fs=require('fs')
const User={
    fileName:'./data/UsersList.json',
    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf8'));
        
    },
    findALL:function(){
        return this.getData();
    },
    findByField:function(field,text){
        let allUsers=this.findALL();
        let userFound=allUsers.find(oneUser=>oneUser[field]===text)
        return userFound;
    }
}
module.exports=User