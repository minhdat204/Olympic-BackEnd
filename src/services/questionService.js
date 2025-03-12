const { Questions } = require("../models");
module.exports = {
  async createQueston(data) {
    return Questions.create(data);
  },

  async getQuestons() {
    return Questions.findAll();
  },

  async getQuestionById(id) {
    return Questions.findByPk(id);
  },
  async updateQuestions(id, data) {
    return Questions.update(data, { where: { id } });
  },
};
