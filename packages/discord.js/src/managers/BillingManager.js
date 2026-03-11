'use strict';

const { Base } = require('../structures/Base.js');

/**
 * Manages billing information for a selfbot user.
 *
 * @extends {Base}
 */
class BillingManager extends Base {
  constructor(client) {
    super(client);
  }

  /**
   * Fetches the payment sources for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetchPaymentSources() {
    return this.client.rest.get('/users/@me/billing/payment-sources');
  }

  /**
   * Fetches the subscriptions for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetchSubscriptions() {
    return this.client.rest.get('/users/@me/billing/subscriptions');
  }

  /**
   * Fetches the country code for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetchCountryCode() {
    return this.client.rest.get('/users/@me/billing/country-code');
  }
}

exports.BillingManager = BillingManager;
