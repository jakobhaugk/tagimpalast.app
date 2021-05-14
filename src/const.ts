import * as path from 'path'

const globals: any = {}

globals.staticPath = path.resolve(__dirname, '..', 'static');
globals.imagePath = path.join(globals.staticPath, 'images');
globals.landingPagePath = path.join(globals.staticPath, 'landingpage');
globals.adminPagePath = path.join(globals.staticPath, 'admin');

export default globals;