import * as Joi from 'joi';
import { Types } from 'mongoose';
import BrandModel, { IModel } from '../Brands/model';
import ModelValidation from './validation';
import { IModelService } from './interface';

/**
 * @export
 * 
 * @implements {IModelService}
 */
const ModelService: IModelService = {
    /**
     * @param {number} greater
     * @param {number} lower
     * @returns {Promise < IModel[] >}
     * @memberof ModelService
     */
    async findAll(greater: number, lower: number): Promise < IModel[] > {
        try {
            const lte: string = JSON.stringify(lower)
            let results:any = []

            const query = `[
                { "$unwind": "$models" }, 
                {
                    "$match":{
                        ${greater !== undefined && lower !== undefined ? `"models.average_price" : {"$gte": ${greater}, "$lte":${lower}}` : ""}
                        ${greater === undefined && lower !== undefined ? `"models.average_price" : {"$lte":${lower}}` : ""}
                        ${greater !== undefined && lower === undefined ? `"models.average_price" : {"$gte": ${greater}}` : ""}
                    }
                },
                { "$replaceRoot": { "newRoot": "$models" } } 

            ]`;


            await BrandModel.aggregate(JSON.parse(query)).then(docs => {
                results = docs
              })
              .catch(err => {
                console.error('Error al realizar la consulta:', err);
              });;

              return results
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @param {number} average_price
     * @returns {Promise < IModel >}
     * @memberof ModelService
     */
    async update(id:string, body:IModel): Promise < IModel > {
        try {
            
            const validate: Joi.ValidationResult = ModelValidation.update({id, average_price: body.average_price});

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const result: any = await BrandModel.updateOne({
                'models._id': new Types.ObjectId(id)
            },{ $set: { 'models.$.average_price': body.average_price } })

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ModelService;
