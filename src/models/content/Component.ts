import { prop } from "@typegoose/typegoose";

enum ComponentType {
  Article = 'article',
  IndexPage = 'index'
}

interface IComponent {
  type: ComponentType,
  public?: boolean,
  data?: any,
}


class Component implements IComponent {
  
  @prop({ required: true })
  type: ComponentType;

  @prop({ default: true })
  public: boolean;

  @prop()
  data: any;
}


export { Component, ComponentType };