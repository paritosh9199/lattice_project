import express from "express"
// import path from "path"
// import _ from "lodash"

// let reactController = require("../controllers/reactController")
// let { registerController, loginController, logoutController } = require("../controllers/authUserController")
// let { auth, auth_semi } = require("../middlewares/auth")
import community_api_controller from "../../services/controllers/community_api_controller"
import { auth_middleware_wrapper_IS_LOGGED_IN } from "../middleware/auth_middleware"
import community from "src/database/models/communities"

const communityApiService = (app: express.Application) => {
    const router = express.Router()

    router.get("/community-service,", (req, res) => {
        res.send({ status: 200, success: true })
    })

    // router.get("/api/:version/")
    router.post("/api/:version/createCommunity", community_api_controller.createCommunity)
    router.delete("/api/:version/deleteCommunity", auth_middleware_wrapper_IS_LOGGED_IN, community_api_controller.deleteCommunity)
    router.post("/api/:version/addUserToCommunity", auth_middleware_wrapper_IS_LOGGED_IN, community_api_controller.addUserToCommunity)
    router.get("/api/:version/removeUserFromCommunity")

    router.post("/api/:version/modifyCommunityDetails")
    router.post("/api/:version/setCommunityRules", auth_middleware_wrapper_IS_LOGGED_IN, community_api_controller.setCommunityRules)
    router.post("/api/:version/setCommunityAbout", auth_middleware_wrapper_IS_LOGGED_IN, community_api_controller.setCommunityAbout)
    router.post("/api/:version/setCommunitySettings")
    router.post("/api/:version/setCommunityTheme")


    // router.get("/api/:version/")
    // router.get("/api/:version/")
    // router.get("/api/:version/")

    app.use(router)
}

export default communityApiService
