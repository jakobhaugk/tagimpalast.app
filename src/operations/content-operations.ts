import { Component } from '../models/content/Component';
import { Page, PageModel, IPage } from '../models/content/Page'
const slugify = require('slugify')

interface IGetContentOptions {
  includePrivate: boolean,
}

const getPages = async function(options?: IGetContentOptions): Promise<Page[]> {

  const filter = options.includePrivate ? {} : { public: true }
  return await PageModel.find(filter);
}

const getPageDetails = async function(slug: string, options?: IGetContentOptions): Promise<Page> {
  
  const page = await PageModel.findOne({ slug }, '+components').exec();

  if (!options.includePrivate)
    page.components = page.components.filter((c: Component) => c.public)
    
  return page
}

const createPage = async function(input: IPage): Promise<Page> {
  input.slug = slugify(input.menuLabel.toLowerCase())
  const page = await PageModel.create(input as Page);
  return page;
}

const updatePage = async function(slug: string, update: IPage): Promise<Page> {
  
  const updatedPage = await PageModel.findOneAndUpdate({ slug }, { $set: update }, { new: true, upsert: false });

  return updatedPage;
}

const deletePage = async function(slug: string): Promise<boolean> {
  await PageModel.findOneAndDelete({ slug });
  return true;
}







export { getPages, updatePage, createPage, deletePage, getPageDetails }