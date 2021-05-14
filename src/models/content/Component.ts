import { prop } from "@typegoose/typegoose";

enum ComponentType {
  Article = 'article',
  IndexPage = 'index'
}

interface IComponent {
  type: ComponentType,
  data?: any,
}


class Component implements IComponent {
  
  @prop({ required: true })
  type: ComponentType;

  @prop()
  data: any;
}


export { Component, ComponentType };