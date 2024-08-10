import { NextFunction, Request, Response } from 'express';
import ModelService from './service';
import { HttpError } from '../../config/error';
import { IModel } from '../Brands/model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const { greater, lower }: any = req.query
        const models  = await ModelService.findAll(greater, lower);

        res.status(200).json(models);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const model: IModel = await ModelService.update(req.params.id, req.body);
        if(model){
            res.status(201).json("Model updated");
        }
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

