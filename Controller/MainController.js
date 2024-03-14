const ProjectManager = require("../Models/ProjectManager");

exports.CreateProjectManager = async (req, res) => {
  try {
    const { projectManagers } = req.body;

    if (projectManagers.length == 0) {
      return res
        .status(200)
        .json({ code: "e404", message: "Empty Payload", status: false });
    }

    if (projectManagers.length > 1000) {
      return res
        .status(200)
        .json({
          code: "e405",
          message: "You can only upload maximum of 1000 file",
          status: false,
        });
    }

    const badData = { incomplete: [], existing: [] };
    const goodData = [];
    for (let i = 0; i < projectManagers.length; i++) {
      const pm = projectManagers[i];

      if (
        !pm.reg_num ||
        !pm.surname ||
        !pm.name ||
        !pm.middlename ||
        !pm.utme_aggregate ||
        !pm.sex ||
        !pm.lga ||
        !pm.state ||
        !pm.department ||
        !pm.faculty ||
        !pm.subject_1 ||
        !pm.subject_1_score ||
        !pm.subject_2 ||
        !pm.subject_2_score ||
        !pm.subject_3 ||
        !pm.subject_3_score ||
        !pm.english_score ||
        !pm.qualified ||
        !pm.recommendation ||
        !pm.utme_aggregate ||
        !pm.student_type
      ) {
        badData.incomplete.push(pm);
      } else {
        const pjmanager = await ProjectManager.findOne({
          j_reg: pm.reg_num,
          surname: pm.surname,
          name: pm.name,
          middlename: pm.middlename,
        });
  
        if (pjmanager) {
          badData.existing.push(pm);
        } else {
          pm["session"] = "2022";
          await ProjectManager.create({
            j_reg: pm.reg_num,
            surname: pm.surname,
            name: pm.name,
            othernames: pm.middlename,
            lga: pm.lga,
            qualified: pm.qualified,
            recommendation: pm.recommendation,
            state: pm.state,
            department: pm.department,
            total: pm.utme_aggregate,
            faculty: pm.faculty,
            subject1: pm.subject_1,
            subject1score: pm.subject_1_score,
            subject2: pm.subject_2,
            subject2score: pm.subject_2_score,
            subject3: pm.subject_3,
            subject3score: pm.subject_3_score,
            english: pm.english_score,
            type: pm.student_type ? pm.student_type : '',
            linkStatus: "0",
          });
          goodData.push(pm);
        }
      }

    }

    return res
      .status(200)
      .json({ code: "s200", message: { analysis: `Total processed ${goodData.length}. Total number of failed ${badData.existing.length + badData.incomplete.length}`, badData }, status: true });
  } catch (error) {
    console.log(error);
  }
};
