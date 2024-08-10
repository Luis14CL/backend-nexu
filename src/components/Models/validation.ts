import * as Joi from 'joi';
import Validation from '../validation';
import { IModel } from '../Brands/model';

/**
 * @export
 * @class ModelValidation
 * @extends Validation
 */
class ModelValidation extends Validation {
    /**
     * Creates an instance of ModelValidation.
     * @memberof ModelValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {{ id:string, average_price: number }} body
     * @returns {Joi.ValidationResult<{ id:string, average_price: number}>}
     * @memberof ModelValidation
     */
    update(
        body: {
            id: string,
            average_price: number
        },
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
            average_price: Joi.number().required()
        });

        return schema.validate(body);
    }
}

export default new ModelValidation();
