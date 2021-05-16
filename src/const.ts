import * as path from 'path'

const globals: any = {}

globals.staticPath = path.resolve(__dirname, '..', 'static');
globals.imagePath = path.join(globals.staticPath, 'images');
globals.adminPagePath = path.join(globals.staticPath, 'admin');
globals.landingPagePath = path.join(globals.staticPath, 'landingpage');
globals.previewPagePath = path.join(globals.staticPath, 'landingpage-preview');

export default globals;