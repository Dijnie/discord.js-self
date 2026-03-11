'use strict';

const { Base } = require('../structures/Base.js');

/**
 * Manages authorized OAuth2 applications for a selfbot user.
 *
 * @extends {Base}
 */
class OAuth2Manager extends Base {
  constructor(client) {
    super(client);
  }

  /**
   * Fetches the authorized OAuth2 applications for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetchAuthorizedApps() {
    return this.client.rest.get('/oauth2/tokens');
  }

  /**
   * Revokes an authorized OAuth2 application token.
   *
   * @param {string} tokenId The token id to revoke
   * @returns {Promise<unknown>}
   */
  async revokeApp(tokenId) {
    return this.client.rest.delete(`/oauth2/tokens/${tokenId}`);
  }
}

exports.OAuth2Manager = OAuth2Manager;
