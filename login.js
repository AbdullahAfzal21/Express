const express=require("express");
const bodyParser=require("body-parser");
var jwt=require("jsonwebtoken");
const app=express();
const port=5000;
const mykey="okytheakhy";

app.use(bodyParser.json());

const userData = {
    abdullah: {
      email: "abdullah@gmail.com",
      password: "a123",
      posts: [
        {
          post: 1,
          content: "This is Abdullah's first post.",
          category: "text",
          likes: {
            likedNumber: 3,
            likedBy: ["ahmed", "ali", "uzair"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "ahmed",
              comment: "I love this text.",
            },
          ],
        },
        {
          post: 2,
          content: "This is Abdullah's second post.",
          category: "text",
          likes: {
            likedNumber: 1,
            likedBy: ["gilman"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "gilman",
              comment: "Great post!",
            },
          ],
        },
      ],
    },
    ahmed: {
      email: "ahmed@gmail.com",
      password: "a123",
      posts: [
        {
          post: 1,
          content: "This is Ahmed's first post.",
          category: "text",
          likes: {
            likedNumber: 5,
            likedBy: ["abdullah", "ali", "uzair", "gilman"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "abdullah",
              comment: "Well written!",
            },
          ],
        },
        {
          post: 2,
          content: "This is Ahmed's second post.",
          category: "text",
          likes: {
            likedNumber: 2,
            likedBy: ["uzair"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "uzair",
              comment: "Nice!",
            },
          ],
        },
      ],
    },
    ali: {
      email: "ali@gmail.com",
      password: "a123",
      posts: [
        {
          post: 1,
          content: "This is Ali's first post.",
          category: "text",
          likes: {
            likedNumber: 4,
            likedBy: ["abdullah", "ahmed"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "ahmed",
              comment: "Awesome!",
            },
          ],
        },
        {
          post: 2,
          content: "This is Ali's second post.",
          category: "text",
          likes: {
            likedNumber: 2,
            likedBy: ["uzair", "gilman"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "gilman",
              comment: "Interesting read.",
            },
          ],
        },
      ],
    },
    uzair: {
      email: "uzair@gmail.com",
      password: "u123",
      posts: [
        {
          post: 1,
          content: "This is Uzair's first post.",
          category: "text",
          likes: {
            likedNumber: 1,
            likedBy: ["gilman"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "gilman",
              comment: "Nice work!",
            },
          ],
        },
        {
          post: 2,
          content: "This is Uzair's second post.",
          category: "text",
          likes: {
            likedNumber: 0,
            likedBy: [],
          },
          comments: [],
        },
      ],
    },
    gilman: {
      email: "gilman@gmail.com",
      password: "g123",
      posts: [
        {
          post: 1,
          content: "This is Gilman's first post.",
          category: "text",
          likes: {
            likedNumber: 3,
            likedBy: ["abdullah", "ali"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "ahmed",
              comment: "Well done!",
            },
          ],
        },
        {
          post: 2,
          content: "This is Gilman's second post.",
          category: "text",
          likes: {
            likedNumber: 1,
            likedBy: [],
          },
          comments: [],
        },
      ],
    },
    bilal: {
      email: "bilal@gmail.com",
      password: "b123",
      posts: [
        {
          post: 1,
          content: "This is Bilal's first post.",
          category: "text",
          likes: {
            likedNumber: 2,
            likedBy: ["sami"],
          },
          comments: [],
        },
        {
          post: 2,
          content: "This is Bilal's second post.",
          category: "text",
          likes: {
            likedNumber: 3,
            likedBy: ["ahmed", "ali"],
          },
          comments: [
            {
              commentNumber: 1,
              userId: "sami",
              comment: "Great post!",
            },
          ],
        },
      ],
    },
    sami: {
      email: "sami@gmail.com",
      password: "s123",
      posts: [
        {
          post: 1,
          content: "This is Sami's first post.",
          category: "text",
          likes: {
            likedNumber: 1,
            likedBy: ["bilal"],
          },
          comments: [],
        },
        {
          post: 2,
          content: "This is Sami's second post.",
          category: "text",
          likes: {
            likedNumber: 0,
            likedBy: [],
          },
          comments: [],
        },
      ],
    },
    ishfaq: {
      email: "ishfaq@gmail.com",
      password: "i123",
      posts: [
        {
          post: 1,
          content: "This is Ishfaq's first post.",
          category: "text",
          likes: {
            likedNumber: 4,
            likedBy: ["ahmed", "ali"],
          },
          comments: [],
        },
        {
          post: 2,
          content: "This is Ishfaq's second post.",
          category: "text",
          likes: {
            likedNumber: 2,
            likedBy: ["bilal"],
          },
          comments: [],
        },
      ],
    },
    zubair: {
      email: "zubair@gmail.com",
      password: "z123",
      posts: [
        {
          post: 1,
          content: "This is Zubair's first post.",
          category: "text",
          likes: {
            likedNumber: 2,
            likedBy: ["sami"],
          },
          comments: [],
        },
        {
          post: 2,
          content: "This is Zubair's second post.",
          category: "text",
          likes: {
            likedNumber: 0,
            likedBy: [],
          },
          comments: [],
        },
      ],
    },
  };
  
  app.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    for(let name in userData){
        if(userData[name].email==email && userData[name].password==password){
            let useremail=userData[name].email;

            var token=jwt.sign({email:useremail},mykey);
            return res.status(200).json({
                message:"Loged In",
             token
            });
        }
    }
    return res.status(401).json({
        message:"User not found",
    });
  })

//   app.get("/login",(req,res)=>{
//     let email=req.headers.email;
//     let password=req.headers.password;
//     for(let name in userData){
//         if(userData[name].email==email && userData[name].password==password){
//             let useremail=userData[name].email;

//             var token=jwt.sign({email:useremail},mykey);
//             return res.status(200).json({
//                 message:"Loged In",
//              token
//             });
//         }
//     }
//     return res.status(401).json({
//         message:"User not found",
//     });
//   })

  // app.get("/login",(req,res)=>{
  //   let email=req.query.email;
  //   let password=req.query.password;
  //   for(let name in userData){
  //       if(userData[name].email==email && userData[name].password==password){
  //           let useremail=userData[name].email;

  //           var token=jwt.sign({email:useremail},mykey);
  //           return res.status(200).json({
  //               message:"Loged In",
  //            token
  //           });
  //       }
  //   }
  //   return res.status(401).json({
  //       message:"User not found",
  //   });
  // })
  app.get("/isloggedin",authenticate,(req,res)=>{
    let user = req.user;
    return res.status(200).json({
      message: "is logged in",
      user,
    });
  })

  
  function authenticate(req,res,next){
if(req.headers.token){
    try{
        var decoded=jwt.verify(req.headers.token,mykey);
        req.user=decoded;
        next();
    } catch (err) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
  }else{
    return res.status(401).json({
        message:"User not login"
    });
  }
  }

  app.listen(port, () => {
    console.log(`Example  app listening on port ${port}`);
  });