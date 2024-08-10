import * as Joi from 'joi';
import Validation from '../validation';
import { IBrandModel, IModel } from './model';

/**
 * @export
 * @class BrandValidation
 * @extends Validation
 */
class BrandValidation extends Validation {
    /**
     * Creates an instance of BrandValidation.
     * @memberof BrandValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IBrandModel} params
     * @returns {Joi.ValidationResult}
     * @memberof BrandValidation
     */
    createBrand(
        params: IBrandModel,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required()
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof BrandValidation
     */
        getModels(
            body: {
                id: string
            },
        ): Joi.ValidationResult {
            const schema: Joi.Schema = Joi.object().keys({
                id: this.customJoi.objectId().required(),
            });
    
            return schema.validate(body);
        }

    /**
     * @param {IModel} params
     * @returns {Joi.ValidationResult}
     * @memberof BrandValidation
     */
    createModel(
        params: IModel,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            average_price: Joi.number().required()
        });

        return schema.validate(params);
    }
}

export default new BrandValidation();
