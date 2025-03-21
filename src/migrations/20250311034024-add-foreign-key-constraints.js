"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ràng buộc bảng answers
    await queryInterface.addConstraint("answers", {
      fields: ["question_id"],
      type: "foreign key",
      name: "fk_answers_question_id",
      references: {
        table: "questions",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("answers", {
      fields: ["contestant_id"],
      type: "foreign key",
      name: "fk_answers_contestant_id",
      references: {
        table: "contestants",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("answers", {
      fields: ["match_id"],
      type: "foreign key",
      name: "fk_answers_match_id",
      references: {
        table: "matches",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Ràng buộc bảng contestants
    await queryInterface.addConstraint("contestants", {
      fields: ["group_id"],
      type: "foreign key",
      name: "fk_contestants_group_id",
      references: {
        table: "groups",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Ràng buộc bảng groups
    await queryInterface.addConstraint("groups", {
      fields: ["match_id"],
      type: "foreign key",
      name: "fk_groups_match_id",
      references: {
        table: "matches",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("groups", {
      fields: ["judge_id"],
      type: "foreign key",
      name: "fk_groups_judge_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Ràng buộc bảng matches
    await queryInterface.addConstraint("matches", {
      fields: ["current_question_id"],
      type: "foreign key",
      name: "fk_matches_current_question_id",
      references: {
        table: "questions",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("matches", {
      fields: ["gold_winner_id"],
      type: "foreign key",
      name: "fk_matches_gold_winner_id",
      references: {
        table: "contestants",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Ràng buộc bảng questions
    await queryInterface.addConstraint("questions", {
      fields: ["match_id"],
      type: "foreign key",
      name: "fk_questions_match_id",
      references: {
        table: "matches",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Ràng buộc bảng awards
    await queryInterface.addConstraint("awards", {
      fields: ["contestant_id"],
      type: "foreign key",
      name: "fk_awards_contestant_id",
      references: {
        table: "contestants",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("awards", {
      fields: ["video_submission_id"],
      type: "foreign key",
      name: "fk_awards_video_submission_id",
      references: {
        table: "video_submissions",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    try {
      // Xóa ràng buộc UNIQUE
      await queryInterface.removeConstraint("users", "users_username_unique");
      await queryInterface.removeConstraint("users", "users_email_unique");
      await queryInterface.removeConstraint(
        "contestants",
        "contestants_email_unique"
      );

      // Xóa các ràng buộc khóa ngoại từng dòng
      await queryInterface.removeConstraint(
        "answers",
        "fk_answers_question_id"
      );
      await queryInterface.removeConstraint(
        "answers",
        "fk_answers_contestant_id"
      );
      await queryInterface.removeConstraint("answers", "fk_answers_match_id");
      await queryInterface.removeConstraint(
        "contestants",
        "fk_contestants_group_id"
      );
      await queryInterface.removeConstraint("groups", "fk_groups_match_id");
      await queryInterface.removeConstraint("groups", "fk_groups_judge_id");
      await queryInterface.removeConstraint(
        "matches",
        "fk_matches_current_question_id"
      );
      await queryInterface.removeConstraint(
        "matches",
        "fk_matches_gold_winner_id"
      );

      await queryInterface.removeConstraint(
        "questions",
        "fk_questions_match_id"
      );
      await queryInterface.removeConstraint(
        "awards",
        "fk_awards_contestant_id"
      );
      await queryInterface.removeConstraint(
        "awards",
        "fk_awards_video_submission_id"
      );
    } catch (error) {
      console.error("Lỗi khi xóa ràng buộc:", error.message);
    }
  },
};
