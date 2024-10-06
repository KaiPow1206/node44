import express from 'express';
import { getListVideo, getTyppeDetails, getTyppeVideo, getVideoPage } from '../controllers/video.controller.js';
import { middlewareToken, middlewareTokenAsyncKey } from '../config/jwt.js';

const videoRoutes =express.Router();
videoRoutes.get("/get-videos",getListVideo);
videoRoutes.get("/get-types",middlewareTokenAsyncKey,getTyppeVideo);
videoRoutes.get("/get-typpes-details/:typeID",getTyppeDetails);
videoRoutes.get("/get-video-page/:page/:size",getVideoPage);

export default videoRoutes;