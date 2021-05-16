import { prop, getModelForClass } from '@typegoose/typegoose'
import { Component } from './Component'

interface IPage {
  slug?: string,
  menuLabel?: string,
  backgroundColor?: string,
  components?: Component[],
  public?: boolean,
}

class Page implements IPage {

  @prop({ unique: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ })
  public slug: string;

  @prop()
  public menuLabel?: string;

  @prop()
  public backgroundColor?: string;

  @prop({ type: Component, default: [], select: false })
  public components?: Component[];

  @prop({ default: false })
  public public: boolean;

}

const PageModel = getModelForClass(Page);

export { PageModel, Page, IPage }