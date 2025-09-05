import React from "react";
import { useState } from 'react'

export const [posts]=useState([
        {id:101, authorId:1, text:"自分の投稿", liked:false, noteStyle:{
            color:"#ffeb3b",
            shape:"square",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"pencil"
        },replies:[
            {id:201, authorId:2, text:"他人からの返信",liked:true,noteStyle:{
                color:"#ff9800",
                shape:"circle",
                strokeColor:"#f44336",
                strokeWidth:3,
                pentype:"pen"
            }},
            {id:202, authorId:1, text:"自分からの返信", liked:false,noteStyle:{
                color:"#2196f3",
                shape:"square",
                strokeColor:"#2196f3",
                strokeWidth:1,
                pentype:"pencil"
            }}
        ]},
        {id:102, authorId:2, text:"他人の投稿", liked:false, noteStyle:{
            color:"#8bc34a",
            shape:"circle",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"crayon"
        }, replies:[
            {id:203, authorId:1, text:"自分からの返信", liked:false,noteStyle:{
                color:"#2196f3",
                shape:"square",
                strokeColor:"#2196f3",
                strokeWidth:1,
                pentype:"pen"
            }}
        ]},
        {id:103, authorId:3, text:"他人の投稿", liked:true, noteStyle:{
            color:"#e91e63",
            shape:"star",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"pen"
        }, replies:[]},
        {id:104, authorId:4, text:"他人の投稿", liked:false, noteStyle:{
            color:"#9c27b0",
            shape:"heart",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"pencil"
        }, replies:[]},
        {id:105, authorId:5, text:"他人の投稿", liked:true, noteStyle:{
            color:"#ff9800",
            shape:"circle",
            strokeColor: "#000",
            strokeWidth: 2,
            pentype:"crayon"
        },replies:[
            {id:204, authorId:2, text:"他人からの返信", liked:true, noteStyle:{
                color:"#ff9800",
                shape:"circle",
                strokeColor:"#f44336",
                strokeWidth:3,
                pentype:"pen"
            }, replies:[
                {id:301, authorId:1, text:"自分からの返信", liked:false, noteStyle:{
                    color:"#2196f3",
                    shape:"square",
                    strokeColor:"#2196f3",
                    strokeWidth:1,
                    pentype:"pencil"
                }}
            ]}
        ]}
    ]);