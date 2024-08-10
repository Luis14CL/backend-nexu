import { Document, Schema, model } from 'mongoose';
import * as connections from '../../config/connection/connection';
/**
 * @export
 * @interface IBrandModel
 * @extends {Document}
 */

/**
 * @export
 * @interface IModel
 * @extends {Document}
 */
export interface IModel extends Document {
    name: string,
    average_price: number
}

export interface IBrandModel extends Document {
    name: string,
    average_price: number,
    models: IModel[]
}

const ModelSchema: Schema = new Schema({
    name: String,
    average_price: Number,
})

export const Model  = model('Model', ModelSchema);

const BrandSchema: Schema = new Schema({
    name: String,
    average_price: {
        type: Number,
        default: 0
    },
    models: [{ type: ModelSchema, ref: Model }]
}, {
    collection: 'brands',
    versionKey: false,
});

export default connections.db.model< IBrandModel >('BrandModel', BrandSchema);