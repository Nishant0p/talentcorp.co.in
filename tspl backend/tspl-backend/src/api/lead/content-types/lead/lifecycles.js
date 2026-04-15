'use strict';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.service('api::rcs.rcs').send({
        mobile: result.phone,
        templateCode: process.env.CONTACT_TEMPLATE_CODE || 'tspl_contact_thanks',
        userName: result.name,
      });
    } catch (err) {
      strapi.log.error('Contact Auto-Responder Failed', err);
    }
  },
};
