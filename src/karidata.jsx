export const posts = [
        {id:101, authorId:1, title:"101",description:"自分の投稿", image:"/default.png" ,liked:false, noteStyle:{
            color:"rgba(248, 196, 221, 1)",
            shape:"square",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"pencil"
        },replies:[
            {id:201, authorId:2, title:"201",description:"他人からの返信", image:"/default.png" ,liked:true,noteStyle:{
                color:"#f7edc7",
                shape:"circle",
                strokeColor:"#f44336",
                strokeWidth:3,
                pentype:"pen"
            }},
            {id:202, authorId:1, title:"202",description:"自分からの返信",image:"/default.png" , liked:false,noteStyle:{
                color:"#e3d4ff",
                shape:"square",
                strokeColor:"#2196f3",
                strokeWidth:1,
                pentype:"pencil"
            }}
        ]},
        {id:102, authorId:2, title:"102",description:"他人の投稿",image:"/default.png" , liked:false, noteStyle:{
            color:"#bfdbd4",
            shape:"circle",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"crayon"
        }, replies:[
            {id:203, authorId:1, title:"203",description:"自分からの返信",image:"/default.png" , liked:false,noteStyle:{
                color:"#f7edc7",
                shape:"square",
                strokeColor:"#2196f3",
                strokeWidth:1,
                pentype:"pen"
            }}
        ]},
        {id:103, authorId:3, title:"103",description:"他人の投稿",image:"/default.png" , liked:true, noteStyle:{
            color:"#e3d4ff",
            shape:"star",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"pen"
        }, replies:[]},
        {id:104, authorId:4, title:"104",description:"他人の投稿",image:"/default.png" , liked:false, noteStyle:{
            color:"#bfdbd4",
            shape:"heart",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"pencil"
        }, replies:[]},
        {id:105, authorId:5, title:"105",description:"他人の投稿",image:"/default.png" , liked:true, noteStyle:{
            color:"#f8c4dd",
            shape:"circle",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"crayon"
        },replies:[
            {id:204, authorId:2, title:"204",description:"他人からの返信",image:"/default.png" , liked:true, noteStyle:{
                color:"#f7edc7",
                shape:"circle",
                strokeColor:"#f44336",
                strokeWidth:3,
                pentype:"pen"
            }, replies:[
                {id:301, authorId:1, title:"301",description:"自分からの返信",image:"/default.png" , liked:false, noteStyle:{
                    color:"#e3d4ff",
                    shape:"square",
                    strokeColor:"#2196f3",
                    strokeWidth:1,
                    pentype:"pencil"
                }}
            ]}
        ]}
    ];
export default posts;