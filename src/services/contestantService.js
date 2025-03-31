const {
  Contestant,
  Group,
  Score_log,
  Answer,
  Match,
  User,
  MatchContestant,
} = require("../models");
const xlsx = require("xlsx");
const { Op, where, Sequelize } = require("sequelize");
const group = require("../models/group");

class ContestantService {
  // Kiểm tra quyền chia nhóm
  static async checkRegroupPermission(match_id) {
    const match = await Match.findByPk(match_id, {
      attributes: ["status", "round_name"],
    });
    if (!match) throw new Error("Trận đấu không tồn tại");
    if (!["Tứ Kết", "Bán Kết", "Chung Kết"].includes(match.round_name)) {
      throw new Error("Vòng đấu không hợp lệ");
    }
    return match;
  }

  // Lấy danh sách thí sinh (có hỗ trợ lọc và phân trang)
  static async getContestants(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      include: [
        {
          model: Group,
          as: "group",
        },
      ],
      order: [["id", "ASC"]],
      offset: (page - 1) * limit,
      limit,
    };

    // Xử lý các bộ lọc
    if (filters.status) options.where.status = filters.status;
    if (filters.group_id) options.where.group_id = filters.group_id;
    if (filters.search) {
      options.where[Op.or] = [
        { fullname: { [Op.like]: `%${filters.search}%` } },
        { email: { [Op.like]: `%${filters.search}%` } },
        { class: { [Op.like]: `%${filters.search}%` } },
      ];
    }

    const { count, rows } = await Contestant.findAndCountAll(options);

    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      contestants: rows,
    };
  }

  // Lấy thông tin chi tiết của một thí sinh
  static async getContestantById(id) {
    const contestant = await Contestant.findByPk(id, {
      include: [
        { model: Group, as: "group" },
        { model: Answer, as: "answers" },
      ],
    });

    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    return contestant;
  }

  // Tạo thí sinh mới
  static async createContestant(contestantData) {
    // Kiểm tra email đã tồn tại chưa
    const existingContestant = await Contestant.findOne({
      where: { email: contestantData.email },
    });

    if (existingContestant) {
      throw new Error("Email đã được sử dụng");
    }

    return await Contestant.create(contestantData);
  }

  // // Cập nhật thông tin thí sinh
  // static async updateContestant(id, contestantData) {
  //   const contestant = await Contestant.findByPk(id);

  //   if (!contestant) {
  //     throw new Error("Thí sinh không tồn tại");
  //   }

  //   await contestant.update(contestantData);
  //   return contestant;
  // }

  // Xóa thí sinh
  static async deleteContestant(id) {
    const contestant = await Contestant.findByPk(id);

    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    await contestant.destroy();
    return { message: "Đã xóa thí sinh thành công" };
  }

  // lấy ds lớp thí sinh
  static async getListClass() {
    return Contestant.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("class")), "class"], // Lấy giá trị duy nhất
      ],
      raw: true,
    });
  }

  // lấy danh sách thí sinh dựa vào judge_id, match_id (kết bảng với groups, contestants, matches)
  static async getContestantByJudgeAndMatch(judge_id, match_id) {
    const contestants = await Group.findAll({
      attributes: ["group_name"],
      where: { judge_id: judge_id },
      include: [
        {
          model: Contestant,
          as: "contestants",
          required: true, // Chỉ lấy nhóm có thí sinh
          include: [
            {
              model: MatchContestant,
              as: "matchContestants",
              attributes: ["registration_number", "status"],
              // where: {
              //   status: { [Op.in]: ["Đang thi", "Xác nhận 1", "Xác nhận 2"] },
              // },
              required: true, // Chỉ lấy khi có dữ liệu matchContestants
            },
          ],
        },
        {
          model: Match,
          as: "match",
          attributes: ["match_name"],
          where: { id: match_id },
          required: true, // Chỉ lấy nếu có trận đấu
        },
      ],
      order: [
        [
          Sequelize.col("contestants->matchContestants.registration_number"),
          "ASC",
        ],
      ],
      raw: false,
      nest: true,
    });

    console.log(JSON.stringify(contestants, null, 2)); // In toàn bộ dữ liệu Sequelize trả về

    return contestants.flatMap((item) =>
      item.contestants.map((contestant) => ({
        match_name: item.match.match_name,
        group_name: item.group_name,
        registration_number:
          contestant.matchContestants?.[0]?.registration_number || "N/A",
        status: contestant.matchContestants?.[0]?.status || "N/A",
      }))
    );
  }

  // lấy group_id, group_name, match_id, match_name, judge_id, username dựa vào judge_id, match_id (GROUPS)
  static async getGroupAndMatch(judge_id, match_id) {
    const groupAndMatch = await Group.findOne({
      where: { judge_id, match_id },
      attributes: ["id", "group_name", "judge_id"],
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name"],
        },
        {
          model: User,
          as: "judge",
          attributes: ["username"],
        },
      ],
    });

    return groupAndMatch;
  }

  // Phương thức updateContestantGroup đã sửa
  static async updateContestantGroup(data) {
    // Kiểm tra dữ liệu đầu vào
    if (!data.match_id) {
      throw new Error("match_id là bắt buộc");
    }
    if (!data.className || !Array.isArray(data.className)) {
      throw new Error("className phải là một mảng các lớp hợp lệ");
    }

    // Lấy danh sách nhóm theo trận đấu
    const listgroup = await Group.findAll({
      attributes: ["id"],
      where: { match_id: data.match_id },
      raw: true,
    });

    if (listgroup.length <= 0) {
      return { message: "Trận đấu hiện tại chưa có nhóm" };
    }

    // Lấy thông tin vòng đấu
    const match = await Match.findByPk(data.match_id, {
      attributes: ["round_name", "class_names"],
    });
    if (!match) {
      throw new Error("Trận đấu không tồn tại");
    }

    // Kiểm tra số lượng nhóm theo vòng đấu
    const roundName = match.round_name;
    const classYear =
      match.class_names && match.class_names.length > 0
        ? match.class_names[0].year
        : null;
    let expectedGroupCount = 2; // Mặc định 2 nhóm cho Tứ Kết và Bán Kết
    let maxContestantsPerGroup = 20; // Mặc định 20 thí sinh mỗi nhóm
    let totalContestants = 40; // Tổng số thí sinh mặc định

    if (roundName === "Bán Kết" && classYear === 2022) {
      expectedGroupCount = 3; // Bán Kết khóa 2022 có 3 nhóm
      totalContestants = 60; // 60 thí sinh
    }

    if (listgroup.length !== expectedGroupCount) {
      throw new Error(
        `Trận đấu cần có đúng ${expectedGroupCount} nhóm cho vòng ${roundName}`
      );
    }

    // Lấy danh sách thí sinh từ các lớp
    const listContestants = await ContestantService.getListContestantsByClass(
      data.className
    );
    if (listContestants.length <= 0) {
      return { message: "Không có thí sinh để chia" };
    }

    // Giới hạn số lượng thí sinh theo vòng đấu
    const contestants = listContestants.slice(0, totalContestants);

    // Xóa các nhóm cũ
    await MatchContestant.destroy({ where: { match_id: data.match_id } });
    await Contestant.update(
      { group_id: null },
      { where: { group_id: listgroup.map((g) => g.id) } }
    );

    // Chia nhóm mới
    const k = Math.floor(contestants.length / listgroup.length);
    const r = contestants.length % listgroup.length;
    let index = 0;

    for (let i = 0; i < contestants.length; i++) {
      // Kiểm tra số lượng thí sinh mỗi nhóm
      const currentGroupContestants = await Contestant.count({
        where: { group_id: listgroup[index].id },
      });
      if (currentGroupContestants >= maxContestantsPerGroup) {
        index++;
        if (index >= listgroup.length) break; // Ngừng nếu không còn nhóm để gán
      }

      await Contestant.update(
        { group_id: listgroup[index].id },
        { where: { id: contestants[i].id } }
      );
      await MatchContestant.create({
        registration_number: i + 1,
        status: "Đang thi",
        match_id: data.match_id,
        contestant_id: contestants[i].id,
      });
      let maxgroup = k + (index < r ? 1 : 0);
      if ((i + 1) % maxgroup === 0) {
        index++;
      }
    }

    return {
      message: `Thêm ${contestants.length} thí sinh vào nhóm thành công`,
    };
  }

  // Upload danh sách thí sinh excel
  static async uploadExcel(data) {
    // Lọc danh sách duy nhất theo email và MSSV
    const uniqueContestants = Array.from(
      new Map(data.map((c) => [`${c.email}-${c.mssv}`, c])).values()
    );

    // Lấy danh sách email và MSSV đã tồn tại trong database
    const existingContestants = await Contestant.findAll({
      attributes: ["email", "mssv"],
      where: {
        [Op.or]: [
          { email: uniqueContestants.map((c) => c.email) },
          { mssv: uniqueContestants.map((c) => c.mssv) },
        ],
      },
      raw: true,
    });

    // Chuyển danh sách thí sinh đã có thành Set để kiểm tra nhanh
    const existingSet = new Set(
      existingContestants.map((e) => `${e.email}-${e.mssv}`)
    );

    // Lọc ra những thí sinh chưa có trong database
    const newContestants = uniqueContestants.filter(
      (c) => !existingSet.has(`${c.email}-${c.mssv}`)
    );

    if (newContestants.length === 0) {
      return {
        msg: "Không có thí sinh mới để thêm",
      };
    } else {
      await Contestant.bulkCreate(newContestants, { ignoreDuplicates: true });
      return {
        msg: `Thêm thành công ${newContestants.length} thí sinh`,
      };
    }
  }

  // donwload file theo
  static async downloadExcel(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Thí Sinh");
    const buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });
    return buffer;
  }

  static async getClassByClass_Year(class_year) {
    return Contestant.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("class")), "class"], // Lấy giá trị duy nhất
      ],
      where: { class_year: class_year },
      raw: true,
    });
  }

  // Lấy danh sách thí sinh theo lớp
  static async getListContestantsByClass(classes) {
    const contestants = await Contestant.findAll({
      where: {
        class: { [Op.in]: classes },
        group_id: null,
      },
      order: Sequelize.literal("RAND()"),
      raw: true,
    });
    return contestants;
  }

  static async updateContestantGroupByClass(match_id, classes) {
    // Kiểm tra số nhóm trong trận đấu
    const groups = await Group.findAll({
      attributes: ["id"],
      where: { match_id: match_id },
      raw: true,
    });
    if (groups.length <= 0)
      return { message: "Trận đấu hiện tại chưa có nhóm" };

    // Lấy danh sách thí sinh từ các lớp
    const contestants = await this.getListContestantsByClass(classes);
    if (contestants.length <= 0)
      return { message: "Không có thí sinh để chia" };

    // Xoác các nhóm cũ
    await MatchContestant.destroy({ where: { match_id: match_id } });
    await Contestant.update(
      { group_id: null },
      { where: { group_id: groups.map((g) => g.id) } }
    );

    // Chia nhóm mới
    const k = Math.floor(contestants.length / groups.length);
    const r = contestants.length % groups.length;
    let index = 0;
    for (let i = 0; i < contestants.length; i++) {
      await Contestant.update(
        {
          group_id: groups[index].id,
        },
        { where: { id: contestants[i].id } }
      );
      await MatchContestant.create({
        registration_number: i + 1,
        status: "Đang thi", // sau khi chia nhóm thì cập nhật trạng thái thí sinh trong trận đấu là đang thi
        match_id: match_id,
        contestant_id: contestants[i].id,
      });
      let maxgroup = k + (index < r ? 1 : 0);
      if ((i + 1) % maxgroup === 0) {
        index++;
      }
    }
    return {
      message: `Thêm ${contestants.length} thí sinh vào nhóm thành công `,
    };
  }

  // lấy danh sách khóa sinh viên
  static async getListClass_Year() {
    return Contestant.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("class_year")), "class_year"], // Lấy giá trị duy nhất
      ],
      raw: true,
    });
  }

  // DAT: API lấy thí sinh theo trạng thái
  static async getContestantsWithStatus(data) {
    if (!data || !data.status) {
      throw new Error("Status is required");
    }
    
    const matchContestants = await MatchContestant.findAll({
      where: { 
        status: data.status,
        ...(data.match_id && { match_id: data.match_id })
      },
      include: [{
        model: Contestant,
        as: "contestant"
      }],
      order: [["registration_number", "ASC"]]
    });
    
    const contestants = matchContestants.map(mc => {
      const contestant = mc.contestant.toJSON();
      contestant.registration_number = mc.registration_number;
      contestant.match_status = mc.status;
      contestant.eliminated_at_question_order = mc.eliminated_at_question_order;
      return contestant;
    });
    
    return contestants;
  }

  // lấy mảng thí sinh contestantIds ở trạng thái "Được cứu" trong trận
  static async getContestantsRescue(match_id) {
    // Lấy danh sách các contestant_id có trạng thái "Được cứu" trong trận
    const rescuedContestants = await MatchContestant.findAll({
      attributes: ['contestant_id'],
      where: { 
        match_id: match_id, 
        status: "Được cứu" 
      },
      raw: true
    });
    
    // Trả về mảng các contestant_id
    return rescuedContestants.map(contestant => contestant.contestant_id);
  }

  static async getGroupContestantByMatch(match_id) {
    const list = await Group.findAll({
      attributes: ["id", "group_name"],
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name"],
          where: { id: match_id }, // ✅ Lọc match_id ở đây
        },
        {
          model: Contestant,
          as: "contestants",
          attributes: ["id", "fullname"],
          include: [
            {
              model: MatchContestant,
              as: "matchContestants", // ✅ Đúng alias của hasMany
              attributes: ["registration_number", "status"],
              order: ["registration_number"],
            },
          ],
        },
      ],
      order: [
        [
          { model: Contestant, as: "contestants" },
          { model: MatchContestant, as: "matchContestants" },
          "registration_number",
          "ASC",
        ],
      ],
    });

    return list;
  }

  // DAT: API lấy total thí sinh và thí sinh còn lại trong trận hiện tại
  static async getContestantTotal(matchId) {
    // lấy số thí sinh đang thi trong trận đấu
    const remaining = await MatchContestant.count({
      where: { 
        match_id: matchId, 
        status: { [Op.or]: ["Đang thi", "Được cứu"] }
      },
    });
    //lấy tổng số thí sinh trong trận đấu
    const total = await await MatchContestant.count({
      where: { match_id: matchId },
    });
    return { total, remaining };
  }

  // DAT: API lấy ds thí sinh theo match_id
  static async getContestantsByMatchId(matchId) {
    const matchContestants = await MatchContestant.findAll({
      where: { match_id: matchId },
      include: [
        {
          model: Contestant,
          as: "contestant",
        },
      ],
      order: [["registration_number", "ASC"]],
    });

    // chuyển dữ liệu từ object sang json
    const contestants = matchContestants.map((mc) => {
      const contestant = mc.contestant.toJSON();
      contestant.registration_number = mc.registration_number;
      contestant.match_status = mc.status;
      contestant.eliminated_at_question_order = mc.eliminated_at_question_order;
      return contestant;
    });

    return contestants;
  }

  /**===========================================================
   * DAT: PHẦN CỨU TRỢ THÍ SINH
   * ===========================================================
   */
  // DAT: API lấy thí sinh bị loại theo câu hỏi
  static async getEliminatedContestantsByQuestion(matchId, questionOrder) {
    const eliminatedContestants = await MatchContestant.findAll({
      where: { match_id: matchId, eliminated_at_question_order: questionOrder },
      include: [
        {
          model: Contestant,
          as: "contestant",
        },
      ],
    });

    // chuyển dữ liệu từ object sang json
    const contestants = eliminatedContestants.map((mc) => {
      const contestant = mc.contestant.toJSON();
      contestant.registration_number = mc.registration_number;
      contestant.match_status = mc.status;
      contestant.eliminated_at_question_order = mc.eliminated_at_question_order;
      return contestant;
    });

    return contestants;
  }

  //DAT: API lấy danh sách thí sinh bị loại (status = Xác nhận 2)
  static async getEliminatedContestants(matchId) {
    const contestants = await MatchContestant.findAll({
      where: { match_id: matchId, status: "Bị loại" },
    });
    return contestants;
  }

  // DAT: API lấy tổng số thí sinh theo trạng thái
  static async getContestantTotalByStatus(matchId, status) {
    const total = await MatchContestant.count({
      where: { match_id: matchId, status: status },
    });
    return total;
  }

  // DAT: API lấy danh sách thí sinh "Đang thi"
  static async getCompetingContestants(matchId) {
    const competingContestants = await MatchContestant.findAll({
      where: { match_id: matchId, status: "Đang thi" },
      include: [
        {
          model: Contestant,
          as: "contestant",
        },
      ],
      order: [["registration_number", "ASC"]],
    });

    // chuyển dữ liệu từ object sang json
    const contestants = competingContestants.map((mc) => {
      const contestant = mc.contestant.toJSON();
      contestant.registration_number = mc.registration_number;
      contestant.match_status = mc.status;
      contestant.eliminated_at_question_order = mc.eliminated_at_question_order;
      return contestant;
    });

    return contestants;
  }

  // DAT: API lấy số thí sinh cần cứu với công thức [(điểm nhập vào / 100) * tổng thí sinh bị loại]
  static async getRescueContestantTotal(matchId, rescuePoint) {
    const eliminatedTotal = await this.getContestantTotalByStatus(
      matchId,
      "Bị loại"
    );
    const total = Math.ceil((rescuePoint / 100) * eliminatedTotal);
    return total;
  }

  // Phương thức updateContestant đã sửa
  static async updateContestant(contestantIds, data) {
    // Check if contestantIds is not an array, convert it to an array
    if (!Array.isArray(contestantIds)) {
      contestantIds = [contestantIds];
    }

    // Update all contestants in the array
    const updatedContestants = [];
    for (const contestantId of contestantIds) {
      const matchContestant = await MatchContestant.findOne({
        where: { contestant_id: contestantId },
      });

      if (!matchContestant) {
        throw new Error(
          `Thí sinh với ID ${contestantId} không tồn tại trong bảng MatchContestant`
        );
      }

      // Cập nhật dữ liệu với status từ data
      await matchContestant.update(data);

      // Lấy dữ liệu đầy đủ của thí sinh sau khi cập nhật
      const contestant = await Contestant.findByPk(contestantId);

      // Thêm vào danh sách thí sinh đã cập nhật
      updatedContestants.push({
        ...contestant.toJSON(),
        registration_number: matchContestant.registration_number,
        match_status: matchContestant.status,
        eliminated_at_question_order:
          matchContestant.eliminated_at_question_order,
      });
    }

    return {
      message: "Cập nhật thông tin thí sinh thành công",
      contestants: updatedContestants,
    };
  }

  /**
   * RESULT
   * DAT: lấy danh sách thí sinh được cứu (status = "xác nhận 2")
   */
  static async getRescueContestants(matchId, score, rescueNumber) {
    /**
     * 1. lấy danh sách thí sinh bị loại
     */
    const eliminatedContestants = await this.getEliminatedContestants(matchId);

    /**
     * 2. lấy số lượng thí sinh được cứu
     */
    let rescueContestant = await this.getRescueContestantTotal(matchId, score);

    // Check if this is the second rescue (cứu trợ 2)
    if (rescueNumber === 2) {
      rescueContestant = Math.min(10, rescueContestant);
      console.log(
        `Cứu trợ 2: giới hạn tối đa 10 thí sinh (${rescueContestant} người)`
      );
    }

    // Check if this is the first rescue (cứu trợ 1)
    if (rescueNumber === 1) {
      console.log(
        `Cứu trợ thường: ${rescueContestant} người dựa trên điểm ${score}`
      );
    }

    /**
     * 3. Nhóm thí sinh theo câu hỏi
     */
    const question = [];
    eliminatedContestants.map((contestant) => {
      const questionOrder = contestant.eliminated_at_question_order;
      if (!question[questionOrder]) {
        question[questionOrder] = [];
      }
      question[questionOrder].push(contestant);
    });

    /**
     * 4. sắp xếp câu hỏi theo thứ tự giảm dần
     */
    const questionIndices = Object.keys(question)
      .map(Number)
      .filter((index) => question[index] && question[index].length > 0)
      .sort((a, b) => b - a); // Sort in descending order

    /**
     * 5. chọn thí sinh được cứu
     */
    const selectedContestants = [];
    // duyệt từng thí sinh đã sắp xếp
    for (const i of questionIndices) {
      if (rescueContestant <= 0) {
        break;
      }
      // số lượng thí sinh trong câu hỏi đó
      const available = question[i].length;

      // nếu số thí sinh <= slot còn lại  (chọn hết)
      if (available <= rescueContestant) {
        selectedContestants.push(question[i]);
        rescueContestant -= available;
      }
      // nếu số thí sinh > slot còn lại (chọn ngẫu nhiên)
      else {
        //random thí sinh
        const contestantRandom = question[i].sort(() => Math.random() - 0.5);
        selectedContestants.push(contestantRandom.slice(0, rescueContestant));
        rescueContestant = 0;
      }
    }

    // chuyển mảng 2 chiều thành mảng 1 chiều
    const contestants = selectedContestants.flat();
    return contestants;
  }

  /**
   * Dat: lấy danh sách 20 thí sinh vào vòng trong tương tự như cứu trợ chỉ khác là lấy cố định 20 thí sinh
   * có thêm tham số để loại trừ thí sinh gold (nếu có)
   * 
   * @param {number} matchId - ID của trận đấu
   * @param {number} excludeContestantId - ID của thí sinh cần loại trừ (nếu có)
   *  */
  static async getContestants20WithExclusion(
    matchId,
    excludeContestantId = null
  ) {
    /**
     * 1. lấy danh sách thí sinh bị loại
     */
    const eliminatedContestants = await this.getEliminatedContestants(matchId);

    /**
     * 1.5 Loại bỏ thí sinh Gold nếu có
     */
    let filteredContestants = eliminatedContestants;
    if (excludeContestantId) {
      filteredContestants = eliminatedContestants.filter(
        (contestant) =>
          contestant.contestant_id !== parseInt(excludeContestantId)
      );
    }

    if (filteredContestants.length < 20) {
      throw new Error("Không đủ thí sinh bị loại để chọn 20 người");
    }

    /**
     * 2. Nhóm thí sinh theo câu hỏi
     */
    const question = [];
    filteredContestants.map((contestant) => {
      const questionOrder = contestant.eliminated_at_question_order;
      if (!question[questionOrder]) {
        question[questionOrder] = [];
      }
      question[questionOrder].push(contestant);
    });

    /**
     * 3. sắp xếp câu hỏi theo thứ tự giảm dần
     */
    const questionIndices = Object.keys(question)
      .map(Number)
      .filter((index) => question[index] && question[index].length > 0)
      .sort((a, b) => b - a); // Sort in descending order

    /**
     * 4. chọn chính xác 20 thí sinh
     */
    const selectedContestants = [];
    let remainingSlots = 20;

    // duyệt từng câu hỏi đã sắp xếp
    for (const i of questionIndices) {
      if (remainingSlots <= 0) {
        break;
      }

      // số lượng thí sinh trong câu hỏi đó
      const available = question[i].length;

      // nếu số thí sinh <= slot còn lại (chọn hết)
      if (available <= remainingSlots) {
        selectedContestants.push(question[i]);
        remainingSlots -= available;
      }
      // nếu số thí sinh > slot còn lại (chọn ngẫu nhiên)
      else {
        // random thí sinh
        const contestantRandom = question[i].sort(() => Math.random() - 0.5);
        selectedContestants.push(contestantRandom.slice(0, remainingSlots));
        remainingSlots = 0;
      }
    }

    // chuyển mảng 2 chiều thành mảng 1 chiều
    const contestants = selectedContestants.flat();
    return contestants;
  }

  static async getContestantByGoldMatch(match_id) {
    const contestant = await Contestant.findOne({
      attributes: ["fullname", ["id", "contestant_id"]],
      include: {
        model: Match,
        as: "matches_won",
        attributes: ["match_name"],
        where: { id: match_id },
      },
      raw: true,
      nest: true,
    });
    return contestant
      ? {
          fullname: contestant.fullname,
          match_name: contestant.matches_won.match_name,
        }
      : null;
  }

  static async downloadExcelMatch(match_id) {
    const list = await Group.findAll({
      attributes: ["id", "group_name"],
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name"],
          where: { id: match_id },
        },
        {
          model: Contestant,
          as: "contestants",
          attributes: ["fullname", "email", "class"],
          order: ["class"],
          include: [
            {
              model: MatchContestant,
              as: "matchContestants",
              attributes: ["registration_number", "status"],
              where: { match_id },
            },
          ],
        },
      ],
    });

    const flatList = list.flatMap((group) =>
      group.contestants.map((contestant) => ({
        fullname: contestant.fullname,
        group_name: group.group_name,
        email: contestant.email,
        class: contestant.class,
        match_name: group.match.match_name,
        registration_number:
          contestant.matchContestants?.[0]?.registration_number || null,
      }))
    );
    return flatList;
  }
  // DAT: lấy cột rescue_1, rescue_2, plane: sử dụng ở câu mấy (order question) (-1 là chưa sử dụng) và cột rescued_count_1, rescued_count_2: cứu được bao nhiêu người
  // không cần ghi dựa vào match service lấy toàn bộ tran đấu

  static async updateRescueContestants(matchId, data) {
    const contestants = await MatchContestant.findAll({
      where: { match_id: matchId, status: "Bị loại" },
    });

    for (const contestant of contestants) {
      const rescueData = data.find(
        (d) => d.contestant_id === contestant.contestant_id
      );
      if (rescueData) {
        await contestant.update({
          rescue_1: rescueData.rescue_1,
          rescue_2: rescueData.rescue_2,
          plane: rescueData.plane,
          rescued_count_1: rescueData.rescued_count_1,
          rescued_count_2: rescueData.rescued_count_2,
        });
      }
    }

    return { message: "Cập nhật thành công" };
  }
  //  Long lấy danh sách thí sinh xác nhận 1 theo trọng tài
}

module.exports = ContestantService;
