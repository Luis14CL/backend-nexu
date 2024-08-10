import { IModel } from '../Brands/model';

/**
 * @export
 * @interface IModelService
 */
export interface IModelService {

    /**
     * @param {number} greater
     * @param {number} lower
     * @returns {Promise<IModel[]>}
     * @memberof IModelService
     */
    findAll(greater: number, lower: number): Promise<IModel[]>;

    /**
     * @param {string} id
     * @param {IModel} body
     * @returns {Promise<IModel>}
     * @memberof IModelService
     */
    update(id: string, body: IModel): Promise<IModel>;
}
