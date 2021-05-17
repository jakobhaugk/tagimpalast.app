import { Page } from '../models/content/Page';
import * as op  from '../operations/content-operations'
import { handleRequestJSON } from '../util/handlers'


const getPages = async function (req, res) {

  const includePrivate = req.headers.preview === '1';
  const fn = async () => await op.getPages({ includePrivate });

  handleRequestJSON(req, res, fn);

}

const getPage = async function (req, res) {

  const fn = async (req) => {

    const { slug } = req.params;
    if ( !slug ) throw new Error('missing slug');

    if (slug === 'new') return Page.empty();

    const includePrivate = req.headers.preview === '1';
    const page = await op.getPageDetails(slug, { includePrivate });
    if (!page) throw new Error('not found');

    return page;
  }

  handleRequestJSON(req, res, fn);
}



const createPage = async function (req, res) {

  const fn = async (req) => {
    const { page } = req.body;
    if (!page) throw new Error('missing page in body');

    await op.createPage(page);
    return null;
  }

  handleRequestJSON(req, res, fn);
}

const updatePage = async function (req, res) {

  const fn = async (req) => {
    const { slug } = req.params;
    if (!slug) throw new Error('missing slug');

    const { page } = req.body;
    if (!page) throw new Error('missing page in body');

    await op.updatePage(slug, page);
    return null;
  }

  handleRequestJSON(req, res, fn);
}

const deletePage = async function (req, res) {

  const fn = async () => {
    const { slug } = req.params;
    if (!slug) throw new Error('missing slug');

    await op.deletePage(slug);
    return null;
  }

  handleRequestJSON(req, res, fn);
}


export { getPages, getPage, createPage, updatePage, deletePage }