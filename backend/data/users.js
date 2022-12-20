import bcrypte from 'bcryptjs'
const users=[
    {   name:'Admin User',
        email:'admin@exampl.com',
        password:bcrypte.hashSync('123456',10),
        isAdmin:true
    },
    {   
        name:'John Doa',
        email:'john@exampl.com',
        password:bcrypte.hashSync('123456',10)
},
    {
        name:'Jan Doa',
        email:'jan@exampl.com',
        password:bcrypte.hashSync('123456',10)
    }
]

export default users