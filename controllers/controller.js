const db = require("../config/db");
const logger = require("../utils/logger");
const bcrypt = require('bcryptjs');

// #1
exports.getAllMember = async (req, res) => {
  try {
    logger.info("fetching all member from database")
    const [rows] = await db.execute("SELECT * FROM Member");
    logger.info("all member fetched successfully")
    res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching All Member: ${error.message}`);
    res.status(500).json({ message: "Error fetching All Member", error });
  }
};
// #2
exports.createMember = async (req, res) => {
  const { m_email, m_password , m_name} = req.body;
  try {
    const hashPassword = await bcrypt.hash(m_password,10)
    logger.info("creating new member in database")
    const [result] = await db.execute(
      "INSERT INTO Member (m_email,m_password,m_name) VALUES (?,?,?)",[m_email,hashPassword,m_name]
    )
    logger.info("new member created successfully");
    res.status(201).json({
      Created: result.insertId,
    });
  } catch (error) {
    logger.error(`Error creating Member: ${error.message}`);
    res.status(500).json({ message: "Error creating Member", error });
  }
};
// #3
exports.getMember = async (req,res) => {
  const { m_id } = req.params
  try {
    logger.info("fetching member from database")
    const [rows] = await db.execute("SELECT * FROM Member WHERE m_id = ?",[m_id])
    if (rows.length === 0) {
      logger.info("member fetched Not found")
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("member fetched successfully")
    res.status(200).json(rows[0]);
  } catch (error) {
    logger.info(`Error fetching All Member: ${error.message}`)
    res.status(500).json({ message: "Error fetching All member", error });
  }
}
// #4
exports.updateMember = async (req,res) => {
  const { m_email,m_password,m_name } = req.body
  const { m_id } = req.params
  try {
    logger.info("updating member in database")
    const [result] = await db.execute("UPDATE Member SET m_email = ?,m_password = ?,m_name = ? WHERE m_id = ?",[m_email,m_password,m_name,m_id])
    if (result.affectedRows === 0) {
      logger.info("member updated Not found")
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("member updated successfully")
    res.status(200).json({message:"Ok"});
  } catch (error) {
    logger.error(`Error updating Member: ${error.message}`);
    res.status(500).json({ message: "Error updating Member", error });
    
  }
}
// #5
exports.deleteMember = async (req,res) => {
  const { m_id } = req.params
  try {
    logger.info("deleting member from database")
    const [result] = await db.execute("DELETE FROM Member WHERE m_id = ?",[m_id])
    if (result.affectedRows === 0) {
      logger.info("member deleted Not found")
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("member deleted successfully")
    res.status(200).json({message:"Ok"});
  } catch (error) {
    logger.error(`Error deleting Member: ${error.message}`);
    res.status(500).json({ message: "Error deleting Member", error });
  }
}
// #6
exports.getALLCourses = async (req,res) => {
  try {
    logger.info("fetching all courses from database")
    const [rows] = await db.execute("SELECT * FROM Course");
    logger.info("all courses fetched successfully")
    res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching All Courses: ${error.message}`);
    res.status(500).json({ message: "Error fetching All Courses", error });
  }
}
// #7
exports.createCourse = async (req, res) => {
  const { c_name, c_description, c_price } = req.body;
  try {
    logger.info("creating new course in database");
    const [result] = await db.execute(
      "INSERT INTO Course (c_name, c_description, c_price) VALUES (?, ?, ?)",
      [c_name, c_description, c_price]
    );
    logger.info("new course created successfully");
    res.status(201).json({
      Created: result.insertId,
    });
  } catch (error) {
    logger.error(`Error creating Course: ${error.message}`);
    res.status(500).json({ message: "Error creating Course", error });
  }
};
// #8
exports.getCourse = async (req, res) => {
  const { c_id } = req.params;
  try {
    logger.info("fetching course from database");
    const [rows] = await db.execute("SELECT * FROM Course WHERE c_id = ?", [c_id]);
    if (rows.length === 0) {
      logger.info("course fetched Not found");
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("course fetched successfully");
    res.status(200).json(rows[0]);
  } catch (error) {
    logger.info(`Error fetching Course: ${error.message}`);
    res.status(500).json({ message: "Error fetching Course", error });
  }
};
// #9
exports.updateCourse = async (req, res) => {
  const { c_name, c_description, c_price } = req.body;
  const { c_id } = req.params;
  try {
    logger.info("updating course in database");
    const [result] = await db.execute(
      "UPDATE Course SET c_name = ?, c_description = ?, c_price = ? WHERE c_id = ?",
      [c_name, c_description, c_price, c_id]
    );
    if (result.affectedRows === 0) {
      logger.info("course updated Not found");
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("course updated successfully");
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    logger.error(`Error updating Course: ${error.message}`);
    res.status(500).json({ message: "Error updating Course", error });
  }
};
// #10
exports.deleteCourse = async (req, res) => {
  const { c_id } = req.params;
  try {
    logger.info("deleting course from database");
    const [result] = await db.execute("DELETE FROM Course WHERE c_id = ?", [c_id]);
    if (result.affectedRows === 0) {
      logger.info("course deleted Not found");
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("course deleted successfully");
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    logger.error(`Error deleting Course: ${error.message}`);
    res.status(500).json({ message: "Error deleting Course", error });
  }
};
// #11
exports.getAllEnroll = async (req,res) => {
  try {
    logger.info("fetching all enrolls from database")
    const [rows] = await db.execute("SELECT * FROM Enroll");
    logger.info("all enrolls fetched successfully")
    res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching All Enrolls: ${error.message}`);
    res.status(500).json({ message: "Error fetching All Enrolls", error });
  }
}
// #12
exports.createEnroll = async (req, res) => {
  const { m_id, c_id , cer_start, cer_expire} = req.body;
  try {
    logger.info("creating new enroll in database");
    const [result] = await db.execute(
      "INSERT INTO Enroll (m_id, c_id , cer_start, cer_expire) VALUES (?, ?, ?, ?)",
      [m_id, c_id, cer_start, cer_expire]
    );
    logger.info("new enroll created successfully");
    res.status(201).json({
      Created: result.insertId,
    });
  } catch (error) {
    logger.error(`Error creating Enroll: ${error.message}`);
    res.status(500).json({ message: "Error creating Enroll", error });
  }
};
// #13
exports.getEnroll = async (req, res) => {
  const { cer_id } = req.params;
  try {
    logger.info("fetching enroll from database");
    const [rows] = await db.execute("SELECT * FROM Enroll WHERE cer_id = ?", [cer_id]);
    if (rows.length === 0) {
      logger.info("enroll fetched Not found");
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("enroll fetched successfully");
    res.status(200).json(rows[0]);
  } catch (error) {
    logger.info(`Error fetching Enroll: ${error.message}`);
    res.status(500).json({ message: "Error fetching Enroll", error });
  }
};
// #14
exports.updateEnroll = async (req, res) => {
  const { m_id, c_id, cer_start, cer_expire } = req.body;
  const { cer_id } = req.params;
  try {
    logger.info("updating enroll in database");
    const [result] = await db.execute(
      "UPDATE Enroll SET m_id = ?, c_id = ?, cer_start = ?, cer_expire = ? WHERE cer_id = ?",
      [m_id, c_id, cer_start, cer_expire, cer_id]
    );
    if (result.affectedRows === 0) {
      logger.info("enroll updated Not found");
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("enroll updated successfully");
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    logger.error(`Error updating Enroll: ${error.message}`);
    res.status(500).json({ message: "Error updating Enroll", error });
  }
};
// #15
exports.deleteEnroll = async (req, res) => {
  const { cer_id } = req.params;
  try {
    logger.info("deleting enroll from database");
    const [result] = await db.execute("DELETE FROM Enroll WHERE cer_id = ?", [cer_id]);
    if (result.affectedRows === 0) {
      logger.info("enroll deleted Not found");
      return res.status(404).json({ message: "Not found" });
    }
    logger.info("enroll deleted successfully");
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    logger.error(`Error deleting Enroll: ${error.message}`);
    res.status(500).json({ message: "Error deleting Enroll", error });
  }
};
// #16
exports.getAllEnrollMember = async (req,res) => {
  const { m_id } = req.params
  try {
    logger.info("fetching all enrolls member from database")
    const [rows] = await db.execute("SELECT * FROM Enroll WHERE m_id = ?",[m_id]);
    logger.info("all enrolls member fetched successfully")
    if(rows[0] == null) return res.status(404).json({message:"Not found"})
    res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching All Enrolls Member: ${error.message}`);
    res.status(500).json({ message: "Error fetching All Enrolls Member", error });
  }
}
// #17
exports.getAllEnrollCourse = async (req,res) => {
  const { c_id } = req.params
  try {
    logger.info("fetching all enrolls course from database")
    const [rows] = await db.execute("SELECT * FROM Enroll WHERE c_id = ?",[c_id]);
    if(rows[0] == null) return res.status(404).json({message:"Not found"})
    logger.info("all enrolls course fetched successfully")
    res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching All Enrolls Course: ${error.message}`);
    res.status(500).json({ message: "Error fetching All Enrolls Course", error });
  }
}
