import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import BrandRouter from './BrandRouter'
import ModelRouter from './ModelRouter'

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    
    /**
     * @description
     *  Forwards any requests to the /brands URI to our BrandRouter
     * @constructs
     */
    app.use('/brands', BrandRouter);

    /**
     * @description
     *  Forwards any requests to the /models URI to our ModelRouter
     * @constructs
     */
        app.use('/models', ModelRouter);

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
