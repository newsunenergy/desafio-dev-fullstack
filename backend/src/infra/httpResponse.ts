import { Response } from "express";

function sendResponse(res: Response, statusCode: number, body: any) {
  res.status(statusCode).json(body);
}

export function ok(res: Response, body?: any) {
  sendResponse(res, 200, { success: true, ...body });
}

export function created(res: Response, body?: any) {
  sendResponse(res, 201, { success: true, ...body });
}

export function clientError(res: Response, body?: any) {
  sendResponse(res, 400, { success: false, ...body });
}

export function unauthorized(res: Response, body?: any) {
  sendResponse(res, 401, { success: false, ...body });
}

export function forbidden(res: Response, body?: any) {
  sendResponse(res, 403, { success: false, ...body });
}

export function notFound(res: Response, body?: any) {
  sendResponse(res, 404, { success: false, ...body });
}

export function conflict(res: Response, body?: any) {
  sendResponse(res, 409, { success: false, ...body });
}

export function tooMany(res: Response, body?: any) {
  sendResponse(res, 429, { success: false, ...body });
}

export function fail(res: Response, body?: any) {
  sendResponse(res, 500, { success: false, ...body });
}
