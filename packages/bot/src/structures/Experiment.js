'use strict';

const { Base } = require('./Base.js');

/**
 * Represents a Discord experiment assignment for the current user.
 * Experiments arrive as arrays: [hash, revision, bucket, override, population, hash_result, aa_mode, trigger_debugging]
 *
 * @extends {Base}
 */
class Experiment extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    // Experiments come as arrays: [hash, revision, bucket, override, population, hash_result, aa_mode, trigger_debugging]
    if (Array.isArray(data)) {
      this.hash = data[0];
      this.revision = data[1];
      this.bucket = data[2];
      this.override = data[3];
      this.population = data[4];
      this.hashResult = data[5] ?? null;
    } else {
      this.hash = data.hash;
      this.revision = data.revision;
      this.bucket = data.bucket;
      this.override = data.override ?? 0;
      this.population = data.population ?? 0;
      this.hashResult = data.hash_result ?? null;
    }
    return this;
  }
}

exports.Experiment = Experiment;
