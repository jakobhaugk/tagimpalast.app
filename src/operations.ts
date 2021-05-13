import { Page, PageModel, IPage } from './models/Page'


const getPages = async function(filter: any = {}) {
  return await PageModel.find(filter);
}

const getPageDetails = async function(slug: string): Promise<Page> {
  const page = await PageModel.findOne({ slug }, '+componentData').exec();
  return page
}

const createPage = async function(input: IPage): Promise<Page> {
  const page = await PageModel.create(input as Page);
  return page;
}

const updatePage = async function(slug: string, update: IPage): Promise<Page> {
  const updatedPage = await PageModel.findOneAndUpdate({ slug }, update, { new: true });
  return updatedPage;
}

const deletePage = async function(slug: string): Promise<boolean> {
  await PageModel.findOneAndDelete({ slug });
  return true;
}


export { getPages, createPage, getPageDetails, updatePage, deletePage }