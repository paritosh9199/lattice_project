import _ from "lodash"
// import User from "../../database/models/user"
// import Followers from "../../database/models/follower"
// import jwt from "jsonwebtoken"
//import "../../database/models/article"
import "../../database/models/communities"
import "../../database/models/user"
import express from "express"

// eslint-disable-next-line no-unused-vars
import { Request, Response } from "express"
import logger, { Level } from "../../lib/logger"
import { responseMessageCreator } from "../../lib/response_message_creator"
import Article from "../../database/models/article"
import { decodeBase64 } from "bcryptjs"
import { Mongoose, Query, Types} from "mongoose"
import Community from "../../database/models/communities"
import User from "../../database/models/user"
export const createCommunity = (req : Request, res: Response) => {
    let version = req.params.version
    if(version == "v1")
    {
          if(!req.body.hasOwnProperty("rules"))
          {
             res.send(responseMessageCreator({message : "Please enter the rules for your community!!"},0))
          }
          if(!req.body.hasOwnProperty("name"))
          {
             res.send(responseMessageCreator({message : "Please enter the name of your community!!"},0))
          }
          if(!req.body.hasOwnProperty("about"))
          {
             res.send(responseMessageCreator({message : "Please enter the description for your community!!"},0))
          }
          if(req.body.name > 150)
          {
              res.send(responseMessageCreator({message : "The name is too long!!!"},0))
          }
          let CommunityNew = {
            "name"  : req.body.name,
            "rules"  :req.body.rules,
            "about" : req.body.about,
            
        }
        let NewCommunityInstance = new Community(CommunityNew)
        console.log(NewCommunityInstance)
        NewCommunityInstance.save(function(err,doc){
            if(err) console.log(err)
            console.log("Community saved in database successfully")

        })
        res.send(responseMessageCreator({message: "Hey, your community is created!!!!!"},1))
    }
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }

}

export const deleteCommunity = (req : Request, res: Response) => {
    let version = req.params.version
    if(version == "v1"){
        if (!Object.prototype.hasOwnProperty.call(req.body, "id")){
            res.status(400).send(responseMessageCreator({message:"Please provide the id of the community to be deleted"}, 0))
            return
        }                  
        let id = req.body.id
        if (!Types.ObjectId.isValid(id)){
            res.status(400).send(responseMessageCreator("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters", 0))
            return
        }
        Community.exists({_id:id}).then((result) => {
            if (result) {
                Community.deleteMany({_id:id}, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send(responseMessageCreator("Internal Server Error!", 0))                      
                    }
                    else {
                        res.status(200).send(responseMessageCreator("Community deleted Sucessfully!", 1))
                    }            
                })
            }
            else {
                res.status(404).send(responseMessageCreator("No Such Community!", 0))
            }
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(responseMessageCreator("Internal Server Error!", 0))
        })
    }
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }

}

export const modifyCommunityDetails = (req: Request, res: Response) => {
    let version = req.params.version
    if (version == "v1"){

    }   
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }
}

export const setCommunityRules = (req: Request, res: Response) => {
    let version = req.params.version
    if (version == "v1"){
        let body = _.pick(req.body, ["rules", "community_id"])
        if (body.rules == null || body.rules.length <= 4) {
            res.status(400).send(responseMessageCreator("Invalid Rules!", 0))
        }
        else if (body.community_id == null || !Types.ObjectId.isValid(body.community_id)) {
            res.status(400).send(responseMessageCreator("Invalid Community Id", 0))
        }
        else {
            Community.exists({_id:body.community_id}).then((doc: any)=>{
                if (doc){
                    Community.findOneAndUpdate({
                        _id: body.community_id},{rules: body.rules
                    }).then((result: any) => {
                        if (result){
                            res.status(200).send(responseMessageCreator({data:result}))
                        }
                        else {
                            res.status(400).send(responseMessageCreator("No Community Found!", 0))
                        }
                    }).catch((err)=>{
                        res.status(400).send(responseMessageCreator(err, 0))
                        console.log(err)
                    })
                }
                else{
                    res.status(404).send(responseMessageCreator("No Such Community!", 0))
                }
            }).catch((err)=>{
                res.status(400).send(responseMessageCreator(err, 0))
                console.log(err)
            })
        }
    }   
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }
}
export const setCommunityAbout = (req: Request, res: Response) => {
    let version = req.params.version
    if (version == "v1"){
        let body = _.pick(req.body, ["about", "community_id"])
        if (body.about == null || body.about.length <= 4) {
            res.status(400).send(responseMessageCreator("Invalid About!", 0))
        }
        else if (body.community_id == null || !Types.ObjectId.isValid(body.community_id)) {
            res.status(400).send(responseMessageCreator("Invalid Community Id", 0))
        }
        else {
            Community.exists({_id:body.community_id}).then((doc: any)=>{
                if (doc){
                    Community.findOneAndUpdate({
                        _id: body.community_id},{about: body.about
                    }).then((result: any) => {
                        if (result){
                            res.status(200).send(responseMessageCreator({data:result}))
                        }
                        else {
                            res.status(400).send(responseMessageCreator("No Community Found!", 0))
                        }
                    }).catch((err)=>{
                        res.status(400).send(responseMessageCreator(err, 0))
                        console.log(err)
                    })
                }
                else{
                    res.status(404).send(responseMessageCreator("No Such Community!", 0))
                }
            }).catch((err)=>{
                res.status(400).send(responseMessageCreator(err, 0))
                console.log(err)
            })
        }
    }   
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }
}
export const setCommunitySettings = (req: Request, res: Response) => {
    let version = req.params.version
    if (version == "v1"){
        
    }   
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }
}

export const addUserToCommunity = (req: Request, res: Response) => {
    let version = req.params.version
    if (version == "v1"){
        let body = _.pick(req.body, ["community_id"])
        let user_id = req.user.user_id
        if (body.community_id == null || !Types.ObjectId.isValid(body.community_id)) {
            res.status(400).send(responseMessageCreator("Invalid Community id", 0))
        }
        else{
            Community.findById(body.community_id).then((doc: any)=>{
                if (doc) {
                    doc.findOne({"followers_list.user_id":user_id, "_id":body.community_id}).then((result: any)=>{
                        if(result) {
                            res.status(400).send(responseMessageCreator("Already a follower to this community!", 0))
                        }
                        else {
                            doc.followers_list.push({user_id:user_id, followed_on:Date.now()})
                            doc.save().then((result: any)=>{
                                res.status(200).send(responseMessageCreator("User Added Successfully", 1))
                            }).catch((err: any)=>{
                                res.status(500).send(responseMessageCreator(err, 0))
                                console.log(err)
                            })    
                        }
                    })
                }
                else {
                    res.status(400).send(responseMessageCreator("Invalid Community id", 0))
                }
            })
        }
    }
    else{
        res.status(400).send(responseMessageCreator("Invalid API version provided!", 0))
    }
}



export default{
    createCommunity,
    deleteCommunity,
    setCommunityRules,
    setCommunityAbout,
    addUserToCommunity
}