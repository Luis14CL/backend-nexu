import * as Joi from 'joi';
import { Types } from 'mongoose';
import BrandModel, { IBrandModel, IModel, Model } from './model';
import BrandValidation from './validation';
import { IBrandService } from './interface';

/**
 * @export
 * @implements {IBrandModelService}
 */
const BrandService: IBrandService = {
    /**
     * @returns {Promise < IBrandModel[] >}
     * @memberof BrandService
     */
    async findAll(): Promise < IBrandModel[] > {
        try {

            const results = await BrandModel.aggregate([
                {
                  $project: {
                    name: 1,
                    average_price: {
                      $avg: "$models.average_price" 
                    }
                  }
                }
              ]);

            return results;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IBrandModel} brand
     * @returns {Promise < IBrandModel >}
     * @memberof BrandService
     */
    async insert(body: IBrandModel): Promise < IBrandModel > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.createBrand(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const brand: IBrandModel = await BrandModel.findOne({
                name: body.name
            });

            if(brand){
                throw new Error("Brand already exists.");
            }

            const brands: IBrandModel = await BrandModel.create(body);

            return brands;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @param {IModel} model
     * @returns {Promise < IModel >}
     * @memberof BrandService
     */
    async createModel(id: string, model: IModel): Promise < IModel > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.createModel(model);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const modelCreated = new Model(model)

            const brand: IBrandModel = await BrandModel.findOne({
                _id: new Types.ObjectId(id),
            });

            const modelExist = brand.models.filter(e=> e.name === model.name)

            if(modelExist.length){
                console.log(modelExist)
                throw new Error("Model aready exists");

            }

            brand.models.push(modelCreated)
            await brand.save(); 

            return modelCreated;
        } catch (error) {
            throw new Error(error.message);
        }
    },

        /**
     * @param {IModel} model
     * @returns {Promise < IModel[] >}
     * @memberof BrandService
     */
        async getModels(id: string): Promise < IModel[] > {
            try {
                const validate: Joi.ValidationResult = BrandValidation.getModels({id});
    
                if (validate.error) {
                    throw new Error(validate.error.message);
                }

                const brand: IBrandModel = await BrandModel.findOne({
                    _id: new Types.ObjectId(id),
                });

    
                return brand.models;
            } catch (error) {
                throw new Error(error.message);
            }
        },
};

export default BrandService;
