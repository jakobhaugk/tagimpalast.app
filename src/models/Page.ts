import { prop, getModelForClass } from '@typegoose/typegoose'
import ComponentType from './ComponentType'

class Page {

  @prop({ unique: true })
  public slug: string;

  @prop()
  public menuLabel: string;

  @prop()
  public backgroundColor: string;

  @prop({ enum: ComponentType })
  public componentType: ComponentType;

  @prop({ select: false })
  public componentData: any;
}

const PageModel = getModelForClass(Page);

export { PageModel, Page }