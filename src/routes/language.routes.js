import {Router} from 'express'
import {methods as languageController} from './../controllers/language.controller.js';
import verifyToken from './../middleware/validate-token.js'

const router = Router();

router.get( '/', verifyToken, languageController.getLanguages);
router.get( '/:id', languageController.getLanguage);
router.post( '/', languageController.addLanguages);
router.put( '/:id', languageController.updateLanguage);
router.delete( '/:id', languageController.deleteLanguage);

export default router;
