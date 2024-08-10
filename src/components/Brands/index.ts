import { NextFunction, Request, Response } from 'express';
import BrandService from './service';
import { HttpError } from '../../config/error';
import { IBrandModel, IModel } from './model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const brands: IBrandModel[] = await BrandService.findAll();

        res.status(200).json(brands);
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
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const brand: IBrandModel = await BrandService.insert(req.body);
        if(brand){
            res.status(201).json("brand created");
        }
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
export async function createModel(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const model: IModel = await BrandService.createModel(req.params.id, req.body);
        if(model){
            res.status(200).json("model created");
        }
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
export async function getModels(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const models: IModel[] = await BrandService.getModels(req.params.id);

        res.status(200).json(models);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
