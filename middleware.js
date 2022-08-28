import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req){
    let verify = req.cookies.get("loggedin");
    let url = req.url;

    if(!verify && url.includes("/Members")){
        return NextResponse.redirect("https://paymentsyst-git-main-papayawasiamah.vercel.app/")
    }

    if(verify && url === "https://paymentsyst-git-main-papayawasiamah.vercel.app/"){
        return NextResponse.redirect("https://paymentsyst-git-main-papayawasiamah.vercel.app/Members")
    }
}