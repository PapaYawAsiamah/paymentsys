import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req){
    let verify = req.cookies.get("loggedin");
    let url = req.url;

    if(!verify && url.includes("/Members")){
        return NextResponse.redirect("http://localhost:3000/")
    }

    if(verify && url === "http://localhost:3000/"){
        return NextResponse.redirect("http://localhost:3000/Members")
    }
}