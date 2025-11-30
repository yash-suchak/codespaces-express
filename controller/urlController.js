import URL from "../model/url.js"
import shortid from "shortid";

export async function handleRedirect(req,res){
    const shortId = req.params.shortId;
    try{
        const reqURL = await URL.findOneAndUpdate({shortId},{ 
            $push: {
                visitHistory:{
                    timeStamp : Date.now()
                }
            }
        })
        console.log(reqURL.visitHistory)
        res.status(300).redirect(reqURL.redirectURL);
    }catch(err){
        res.status(500).json({
            message: "Error while looking up the url",
            err_message: err.message
        })
    }

}
export async function handleNewURL(req, res){
    const redirectURL = req.body.redirectURL;
    const shortId = shortid(8);
    if(!redirectURL)
        return res.status(400).json({message: "Redirect URL required"})
    try{
        const newURL = await URL.create({shortId, redirectURL});
    
        // res.status(201).json({
        //     message: "Shortened URL created successfully",
        //     url: newURL.shortId
        // })

        return res.redirect(`/homepage?id=${newURL.shortId}`);
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message: "This is unexpected, we're looking into it",
            err_message: err.message
        })
    }
}
export async function handleAnalytics(req, res){
    const shortId = req.params.shortId
    try{
        const result = await URL.findOne({shortId})
        res.status(200).json({
            total_clicks : result.visitHistory.length,
            analytics: result.visitHistory
        }) 
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something went wrong",
            err_message: err.message
        })
    }
}