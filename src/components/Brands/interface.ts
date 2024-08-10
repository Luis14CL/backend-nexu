import { IBrandModel, IModel } from './model';

/**
 * @export
 * @interface IBrandService
 */
export interface IBrandService {

    /**
     * @returns {Promise<IBrandModel[]>}
     * @memberof IBrandService
     */
    findAll(): Promise<IBrandModel[]>;

    /**
     * @param {IBrandModel} brandModel
     * @returns {Promise<IBrandModel>}
     * @memberof IBrandService
     */
    insert(brandModel: IBrandModel): Promise<IBrandModel>;

    /**
     * @param {string} id
     * @param {Imodel} model
     * @returns {Promise<IModel>}
     * @memberof IBrandService
     */
    createModel(id: string, model:IModel): Promise<IModel>;

    /**
     * @param {string} id
     * @returns {Promise<IModel>}
     * @memberof IBrandService
     */
    getModels(id: string): Promise<IModel[]>;
}
