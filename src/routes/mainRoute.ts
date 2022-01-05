// require the express module
import e from "express";
import express from "express";
import Shop from "../models/Shop";
 
// create a new Router object
const routes = express.Router();

const shops: Shop[] = [
    { id: 111, name: "Pepper's Pizza", rating: 4.5 },
    { id: 222, name: "Clive's Chives", rating: 3.4 },
    { id: 333, name: "Bretty's Brews", rating: 4.3 },
    { id: 444, name: "Sylvester's Shoes", rating: 3.8 },
    { id: 555, name: "Teddy's Tunes", rating: 4.7 }
];

 routes.get("/", function(req,res){
      res.render("homepage")
  })

routes.get("/shop-list", function(req,res){
    let shopList = shops;
    let minRatingParam: string = req.query.minRatingParam as string;
    if(minRatingParam){
        let minRating: number = Number.parseFloat(minRatingParam);
        console.log(minRating)
        shopList = shops.filter(shop=>shop.rating >=minRating);
        //res.json(filteredShops); //test to see if filter works and it does
        res.render("readallshops",{shopList})
    } else{
        res.render("readallshops", {shopList})
    }
 })
 let message: string = "Shop Not Found"
 let error: string = "No shop exists with ID "

 routes.get("/shop-details/:id", function(req,res){
     let checker:boolean = true;

    for(let i=0; i<shops.length; i++){
        let inputId: number = Number.parseInt(req.params.id);
        //find shop by id property
        if(checker){
            if(shops[i].id === inputId) {
                res.render("displayshop", shops[i]);
                checker = false;
                break; 
            }
       
            //return the json response with the shop object
        }else{
              res.status(404)
              res.render("error")
             //how do I load another page with error?
          }
    }
})

routes.get("/shop-search-form", function(req,res){
    res.render("shop-search-form")
})




 
export default routes;