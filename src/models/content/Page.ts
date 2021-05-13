import { prop, getModelForClass } from '@typegoose/typegoose'
import ComponentType from './ComponentType'

interface IPage {
  slug?: string,
  menuLabel?: string,
  backgroundColor?: string,
  componentType?: ComponentType,
  componentData?: any,
}

class Page implements IPage {

  @prop({ unique: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ })
  public slug: string;

  @prop()
  public menuLabel?: string;

  @prop()
  public backgroundColor?: string;

  @prop({ enum: ComponentType })
  public componentType: ComponentType;

  @prop({ select: false })
  public componentData?: any;
}

const PageModel = getModelForClass(Page);

export { PageModel, Page, IPage }