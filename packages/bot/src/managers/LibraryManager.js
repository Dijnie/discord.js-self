'use strict';

const { Base } = require('../structures/Base.js');

/**
 * Manages the game library for a selfbot user.
 *
 * @extends {Base}
 */
class LibraryManager extends Base {
  constructor(client) {
    super(client);
  }

  /**
   * Fetches the library entries for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetch() {
    return this.client.rest.get('/users/@me/library');
  }

  /**
   * Adds an entry to the library.
   *
   * @param {string} skuId The SKU id to add
   * @param {string} branchId The branch id
   * @returns {Promise<unknown>}
   */
  async add(skuId, branchId) {
    return this.client.rest.post('/users/@me/library', { body: { sku_id: skuId, branch_id: branchId } });
  }

  /**
   * Removes an entry from the library.
   *
   * @param {string} skuId The SKU id to remove
   * @returns {Promise<unknown>}
   */
  async remove(skuId) {
    return this.client.rest.delete(`/users/@me/library/${skuId}`);
  }
}

exports.LibraryManager = LibraryManager;
